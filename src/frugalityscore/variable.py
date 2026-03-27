import os
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("TkAgg")
from .membership import mf
import json

class FuzzyVariable():
    """
    Implementation of variable fuzzification with input universe and params.
    """
    def __init__(self, min:float, max:float, functions:list, params:list, num_points:int):
        """
        Class initialisation.

        Parameters
        ----------
        min : float
            Minimum value of the variable universe
        max : float
            Maximum value of the variable universe
        functions : list of str
            List with each element being the name of the membership function of a domain, with length num_domains
        params : list of lists
            List with each element being the list of params for the membership function of a domain, with length num_domains
        num_points : int
            Number of points within variable universe.
        """
        self.params = params
        self.functions = functions
        self.num_points = num_points
        self.memberships = None
        self.num_domains = len(params)
        self.universe = np.linspace(min, max, self.num_points)
        self.build()
    
    def check(self):
        """
        Checking parameters are correctly defined
        """
        assert len(self.functions) == self.num_domains
        assert len(self.params) == self.num_domains

    # def interpret(self, input:list, defuzz:str=None, plot:bool=False):

    def build(self):
        """
        Builds the membership functions based on input universe and params.
        """
        self.memberships = []
        for i in range(len(self.params)):
            self.memberships.append(mf(self.functions[i], self.universe, self.params[i]))

    def interpret_memberships(self, scalar):
        """
        Determine fuzzy relation matrix ``R`` using Mamdani implication for the
        fuzzy antecedent ``a`` and consequent ``b`` inputs.

        Parameters
        ----------
        scalar : float
            Scalar value within the universe.

        Returns
        -------
        membership_values : list
            List of membership values associated to the scalar for each membership function in order.

        """
        i = 0
        if self.universe[-1]<scalar:
            i = len(self.universe)-1
        else:
            while self.universe[i]<scalar:
                i+=1
        membership_values = []
        for membership in self.memberships:
            a, f_a = self.universe[i-2], membership[i-2]
            b, f_b = self.universe[i-1], membership[i-1]
            alpha = (f_a - f_b)/(a - b)
            beta = (a*f_b - b*f_a)/(a - b)
            membership_values.append(alpha*scalar+beta)
        return membership_values

class PerformanceVariable(FuzzyVariable):
    """
    Implementation of performance variable fuzzification with input universe and params.
    """
    def __init__(self, name:str, num_points:int, path:str="src/data"):
        """
        Class initialisation.

        Parameters
        ----------
        name : str
            Name of the performance variable from which parameters are fetched.
        num_points : int
            Number of points within variable universe.
        path : str
            Path to reference values for performance membership functions.
        """
        with open(os.path.join(path,"referencePerformance.json")) as f:
            performance_config = json.load(f)
        min_val, max_val = performance_config["performance_minmax"][name]
        list_functions = performance_config["performance_functions"][name]
        list_params = performance_config["performance_params"][name]


        super().__init__(min=min_val, max=max_val, functions=list_functions, params=list_params, num_points=num_points)


class EnergyVariable(FuzzyVariable):
    """
    Implementation of performance variable fuzzification with input universe and params.
    """
    def __init__(self, num_points:int, system:str="DEFAULT", gpu:bool=False, cores:int=1, memory:int=64, path:str="src/data", reference:str="system", scale:str="d"):
        """
        Class initialisation.

        Parameters
        ----------
        num_points : int
            Number of points within variable universe.
        system : str
            Type of GPU if GPU used, or else type of CPU.
        gpu : bool
            True if calculation on GPU, False if on CPU
        cores : int
            If on CPU, number of cores used. If on GPU, number of GPU used.
        memory : int
            Amount of memory allocated to process, in GB.
        path : str
            Path to reference values for system average power.
        reference : str
            What type of reference to use for function definition. "system" for the defined system type, or name of reference appliance.
        scale : str
            What type of runtime scale to use if system. "s" for seconds, "m" for minutes, "h" for hours, "d" for days.
        """
        if system == "DEFAULT":
            system = "NVIDIA A100 40GB PCIe" if gpu else "AMD 7552"
        referenceEnergy = pd.read_csv(os.path.join(path, "referenceEnergy.csv"), sep=",")
        power = 0
        if reference=="system":
            referenceSystem = pd.read_csv(os.path.join(path, "GPUs.csv" if gpu else "CPUs.csv"), sep=",")
            assert system.lower() in referenceSystem["model"].apply(lambda x: x.lower()).to_list()
            system_info = referenceSystem[referenceSystem["model"] == system]
            power += (system_info["TDP_per_core"].values*cores)[0]
            power += (referenceEnergy[referenceEnergy["variable"] == "memoryPower"]["value"]*memory)[0]
            
            factor = {"s":1, "m":60, "h":3600, "d":86400, "w":604800}
            assert scale in factor.keys()
            list_functions = ['trimf','trimf','smf']
            list_params = [[0, 0, 1],[0, 1, 3],[1, 3]]
            list_params = [[x*power*factor[scale]/(3.6*1e3) for x in l] for l in list_params]
            max_val = list_params[-1][-1]
        else:
            assert reference.lower() in referenceEnergy["variable"].apply(lambda x: x.lower()).to_list()
            power = referenceEnergy[referenceEnergy["variable"] == reference]["value"].values[0]
            list_functions = ['trimf','trimf','smf']
            list_params = [[0, 0, 1],[0, 1, 3],[1, 3]]
            list_params = [[x*power for x in l] for l in list_params]
            max_val = list_params[-1][-1]
            
        super().__init__(min=0, max=max_val, functions=list_functions, params=list_params, num_points=num_points)

class ScoreVariable(FuzzyVariable):
    """
    Implementation of frugality score.
    """
    def __init__(self, num_points:int):
        """
        Class initialisation.

        Parameters
        ----------
        num_points : int
            Number of points within variable universe.
        """
        super().__init__(min=0, max=1, functions=['trimf','trimf','trimf','trimf','trimf'], params=[[0,0,0.25],[0,0.25,0.5],[0.25,0.5,0.75],[0.5,0.75,1],[0.75,1,1]], num_points=num_points)


if __name__ == "__main__":
    num_points = 1000
    energy_train = FuzzyVariable(min=0, max=1000, functions=['trimf','trimf','trapmf'], params=[[0,0,25],[0,25,50],[25,50,1000,1000]], num_points=num_points)
    energy_test = FuzzyVariable(min=0, max=10, functions=['trimf','trimf','trapmf'], params=[[0,0,2.5],[0,2.5,5],[2.5,5,10,10]], num_points=num_points)
    performance =  FuzzyVariable(min=0, max=1, functions=['trimf','trimf','trimf'], params=[[0,0,0.5],[0,0.5,1],[0.5,1,1]], num_points=num_points)
    score =  FuzzyVariable(min=0, max=1, functions=['trimf','trimf','trimf','trimf','trimf'], params=[[0,0,0.25],[0,0.25,0.5],[0.25,0.5,0.75],[0.5,0.75,1],[0.75,1,1]], num_points=num_points)

