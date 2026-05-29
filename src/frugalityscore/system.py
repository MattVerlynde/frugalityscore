import numpy as np
import matplotlib
matplotlib.use("TkAgg")
import matplotlib.pyplot as plt
from .defuzz import defuzz as fdefuzz
from .variable import *

class FuzzySystem():
    """
    Implementation of Mamdani fuzzy inference system.
    """
    def __init__(self, invar:list, outvar:FuzzyVariable, rules:np.array):
        """
        Class initialisation.

        Parameters
        ----------
        invar : list of FuzzyVariable
            Minimum value of the variable universe
        outvar : FuzzyVariable
            Maximum value of the variable universe
        rules : Nd array
            Association rule matrix of shape (invar1.num_domains, invar2.num_domains, ... , invarN.num_domains).
            Values type follow the condition that sorting would follow the same sorting than the outvar domains.
        """
        self.invar = invar
        self.outvar = outvar
        self.rules = rules
        self.out_domains = sorted(np.unique(self.rules))
        self.check()

    def check(self):
        """
        Checking rule definition follow the number of invar and outvar domains
        """
        if len(self.out_domains) != self.outvar.num_domains:
            raise ValueError("Number of output domains in rules does not match number of output variable domains.")
        for i, var in enumerate(self.invar):
            if self.rules.shape[i] != var.num_domains:
                raise ValueError(f"Number of domains for variable {i} in rules does not match number of domains for variable {i}.")

    def interpret(self, input:list, defuzz:str=None, plot:bool=False) -> float | np.ndarray:
        """
        Determine output of fuzzy inference system from sclar valuers within invar universes.

        Parameters
        ----------
        input : list of float
            List of scalar values to put in invar. List length must be the length of invar.
        defuzz : str
            Mode of defuzzification function to use from scikit-fuzzy. 
            If None, output will be pre-defuzzification distribution.
        plot : bool
            If True, plotting pre-defuzzification distribution.

        Returns
        -------
        output : float / 1d array
            Output of fuzzy inference system if defuzz not None, or pre-defuzzification distribution if else.

        """
        memberships_in = []
        for i_var, value_var in enumerate(input):
            var = self.invar[i_var]
            memberships_var = var.interpret_memberships(value_var)
            memberships_in.append(np.array(memberships_var))
        self.memberships_in = np.array(memberships_in)
        
        # print(f"In memberships done.")
        memberships_out = []
        for i_memb_out, out_value in enumerate(self.out_domains):
            memberships_out_i = []
            positions = np.argwhere(self.rules == out_value)
            for position in positions:
                index_pos = tuple([[i for i in range(len(input))], position])
                memberships_out_i.append(np.min(self.memberships_in[index_pos]))
            memberships_out_i = np.max(memberships_out_i, axis=0)
            memberships_out.append(np.minimum(self.outvar.memberships[i_memb_out], memberships_out_i))
            # print(f"Out {i_memb_out} done.")

        output = np.max(memberships_out, axis=0)
        if not defuzz==None:
            output_defuzz = fdefuzz(mode=defuzz,universe=self.outvar.universe,output=output)
            if plot:
                self.plot(input, output, output_defuzz)
            return output_defuzz
        
        if plot:
            self.plot(input, output)
        return output
    
    def plot(self, input:list, output:list, output_defuzz:float=None):
        fig, axs = plt.subplots(1, len(self.invar) + 1, sharey=True, figsize=(5*(len(self.invar) + 1),5))
        for i_var, value_var in enumerate(input):
            var = self.invar[i_var]
            if value_var < var.universe[0] or value_var > var.universe[-1]:
                print(f"Warning : input value {value_var} for variable {i_var} is out of universe bounds [{var.universe[0]},{var.universe[-1]}]. Plotting may be inaccurate.")
                if value_var < var.universe[0]:
                    value_var = var.universe[0]
                else:
                    value_var = var.universe[-1]
            
            for i_memb, membership in enumerate(var.memberships):
                axs[i_var].plot(var.universe, membership, color = 'black')
                axs[i_var].fill_between(var.universe, np.minimum(membership, self.memberships_in[i_var, i_memb]), color = 'blue', alpha = 0.3)
            axs[i_var].axvline(x = value_var, color = 'blue')
            axs[i_var].annotate(value_var,(value_var,1), color = 'blue')
        
        for membership in self.outvar.memberships:
            axs[-1].plot(self.outvar.universe, membership, color = 'black')
        axs[-1].plot(self.outvar.universe, output, color = 'red')
        axs[-1].set_title("Output")
        axs[-1].fill_between(self.outvar.universe, output, color = 'red', alpha = 0.3)
        if output_defuzz != None:
            axs[-1].axvline(x = output_defuzz, color = 'red')
            axs[-1].annotate(output_defuzz,(output_defuzz,1), color = 'red')
        plt.ylim([-0.1,1.1])
        plt.show()

class FrugalityScore(FuzzySystem):
    """
    Implementation of frugality score system.
    """
    RULES_3D = np.array([[[2,3,4],[1,2,3],[0,1,2]],
                         [[1,2,3],[0,1,2],[0,0,1]],
                         [[0,2,3],[0,0,2],[0,0,0]]])
    RULES_2D = np.array([[2,3,4],
                         [1,2,3],
                         [0,1,2]])
    def __init__(self, trainable:bool=False, gpu:bool=False, cores:int=1, memory:int=2, system:str="DEFAULT", path:str="src/data", reference:str="system", scale:str="d", scale_inference:str="s", metric:str='accuracy'):
        """
        Class initialisation.

        Parameters
        ----------
        trainable : bool
            True if there is seperate energy consumptions measured for training and inference, False if only one energy consumption
        gpu : bool
            True if calculation on GPU, False if on CPU
        cores : int
            If on CPU, number of cores used. If on GPU, number of GPU used.
        memory : int
            Amount of memory allocated to process, in GB.
        system : str
            Type of GPU if GPU used, or else type of CPU.
        path : str
            Path to reference values for performance and energy membership functions.
        reference : str
            Name of reference for energy membership functions.
        scale : str
            What type of runtime scale to use if system. "s" for seconds, "m" for minutes, "h" for hours, "d" for days.
        scale_inference : str
            What type of runtime scale to use for inference energy variable if system. "s" for seconds, "m" for minutes, "h" for hours, "d" for days.
        metric : str
            Name of performance metric used.
        """
        num_points=1000
        
        performance =  PerformanceVariable(name=metric, num_points=num_points, path=path)
        score =  ScoreVariable(num_points=num_points)

        energy_kwargs = dict(num_points=num_points, system=system, gpu=gpu, cores=cores, memory=memory, path=path, reference=reference)
        
        if trainable:
            energy_training = EnergyVariable(**energy_kwargs, scale=scale)
            energy_inference = EnergyVariable(**energy_kwargs, scale=scale_inference)
            rules = self.RULES_3D
            super().__init__(invar=[energy_training,energy_inference,performance], outvar=score, rules=rules)
        else:
            energy = EnergyVariable(**energy_kwargs, scale=scale)
            rules = self.RULES_2D
            super().__init__(invar=[energy,performance], outvar=score, rules=rules)

class MLFrugalityScore(FrugalityScore):
    """
    Implementation of frugality score system.
    """
    def __init__(self, gpu:bool=False, cores:int=1, memory:int=2, system:str="DEFAULT", path:str="src/data", reference:str="system",  scale:str="d", scale_inference:str="s", metric:str='accuracy'):
        super().__init__(trainable=True, gpu=gpu, cores=cores, memory=memory, system=system, path=path, reference=reference, scale=scale, scale_inference=scale_inference, metric=metric)

class TrackingFrugalityScore(FuzzySystem):
    """
    Implementation of frugality score system.
    """
    def __init__(self, epoch:int=0, max_epoch:int=100, gpu:bool=False, cores:int=1, memory:int=2, system:str="DEFAULT", path:str="src/data", reference:str="system", scale:str="d", metric:str='accuracy'):
        """
        Class initialisation.

        Parameters
        ----------
        epoch : int
            Current epoch of training.
        max_epoch : int
            Maximum epoch of training.
        gpu : bool
            True if calculation on GPU, False if on CPU
        cores : int
            If on CPU, number of cores used. If on GPU, number of GPU used.
        system : str
            Type of GPU if GPU used, or else type of CPU.
        memory : int
            Amount of memory allocated to process, in GB.
        path : str
            Path to reference values for performance and energy membership functions.
        reference : str
            Name of reference for energy membership functions.
        scale : str
            What type of runtime scale to use if system. "s" for seconds, "m" for minutes, "h" for hours, "d" for days.
        metric : str
            Name of performance metric used.
        """
        num_points=1000
        assert epoch <= max_epoch
        energy = EnergyVariable(num_points=num_points, system=system, gpu=gpu, cores=cores, memory=memory, path=path, reference=reference, scale=scale)
        new_params = [[param * (epoch/max_epoch) for param in params] for params in energy.params]
        # new_params[-1][-1], new_params[-1][-2] = energy.params[-1][-1], energy.params[-1][-2]
        energy.params = new_params
        energy.build()
        performance =  PerformanceVariable(name=metric, num_points=num_points, path=path)
        score =  ScoreVariable(num_points=num_points)
        rules = np.array([[2,3,4],
                          [1,2,3],
                          [0,1,2]])
        super().__init__(invar=[energy,performance], outvar=score, rules=rules)




if __name__ == "__main__":
    num_points = 1000
    energy_train = FuzzyVariable(min=0, max=1000, functions=['trimf','trimf','trapmf'], params=[[0,0,25],[0,25,50],[25,50,1000,1000]], num_points=num_points)
    energy_test = FuzzyVariable(min=0, max=10, functions=['trimf','trimf','trapmf'], params=[[0,0,2.5],[0,2.5,5],[2.5,5,10,10]], num_points=num_points)
    performance =  FuzzyVariable(min=0, max=1, functions=['trimf','trimf','trimf'], params=[[0,0,0.5],[0,0.5,1],[0.5,1,1]], num_points=num_points)
    score =  FuzzyVariable(min=0, max=1, functions=['trimf','trimf','trimf','trimf','trimf'], params=[[0,0,0.25],[0,0.25,0.5],[0.25,0.5,0.75],[0.5,0.75,1],[0.75,1,1]], num_points=num_points)

    rules = np.array([[[2,3,4],
                       [1,2,3],
                       [0,1,2]],
                      [[1,2,3],
                       [0,1,2],
                       [0,0,1]],
                      [[0,2,3],
                       [0,0,2],
                       [0,0,0]]])

    ScoreSys = FuzzySystem(invar=[energy_train,energy_test,performance], outvar=score, rules=rules)

    plot = True
    defuzz = "mom"
    # print(ScoreSys.interpret(input=[90,1,0.1], plot=plot, defuzz=defuzz))
    # print(ScoreSys.interpret(input=[10,3,0.9], plot=plot, defuzz=defuzz))
    # print(ScoreSys.interpret(input=[50,9,0.5], plot=plot, defuzz=defuzz))
    # print(ScoreSys.interpret(input=[15,9,0.3], plot=plot, defuzz=defuzz))

    ScoreSys = MLFrugalityScore()
    print(ScoreSys.interpret(input=[1000,0.09,0.3], plot=plot, defuzz=defuzz))

