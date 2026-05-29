import numpy as np

def mom(universe:np.ndarray, output:np.ndarray):
    """Mean of Maximum (MOM) defuzzification method."""
    max_value = np.max(output)
    return np.mean(universe[output == max_value])

def lom(universe:np.ndarray, output:np.ndarray):
    """Last of Maximum (LOM) defuzzification method."""
    max_value = np.max(output)
    return universe[np.where(output == max_value)[0][-1]]

def som(universe:np.ndarray, output:np.ndarray):
    """First of Maximum (SOM) defuzzification method."""
    max_value = np.max(output)
    return universe[np.where(output == max_value)[0][0]]

def centroid(universe:np.ndarray, output:np.ndarray):
    """Centroid defuzzification method."""
    sum_mx = np.sum(output)
    if sum_mx == 0:
        return universe[len(universe)//2]
    sum_xmx = np.dot(universe, output)
    return sum_xmx/sum_mx

def bisector(universe:np.ndarray, output:np.ndarray):
    """Bisector defuzzification method."""
    sum_area = 0
    area_acc = [0]
    for i in range(1,len(output)):
        x1, x2 = universe[i-1], universe[i]
        mx1, mx2 = output[i-1], output[i]
        area_acc[i] = area_acc[i-1] + (mx1 + mx2)*(x2 - x1)/2
    half_area = area_acc[-1]/2
    if half_area == 0:
        return universe[len(universe)//2]

    i = 0
    while area_acc[i] < half_area:
        i+=1
    x1, x2 = universe[i-1], universe[i]
    mx1, mx2 = output[i-1], output[i]
    subarea = half_area - area_acc[i-1]
    area = (mx1 + mx2)*(x2 - x1)/2
    return (x1 - (mx1-np.sqrt(mx1*mx1 + 2.0*area*subarea)) / area)

defuzz_functions = {
    'mom': mom,
    'lom': lom,
    'som': som,
    'centroid': centroid,
    'bisector': bisector
}

def defuzz(mode:str, universe:np.ndarray, output:np.ndarray) -> float:
    if mode not in defuzz_functions:
        raise ValueError(f"Defuzzification method '{mode}' is not defined.")
    return defuzz_functions[mode](universe,output)

if __name__ == "__main__":
    num_points = 100

