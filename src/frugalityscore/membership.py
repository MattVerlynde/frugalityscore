from math import exp
import numpy as np

def trimf(universe:list, abc:list):
    a,b,c = abc
    u = np.asarray(universe)
    left = np.where((u >= a) & (u < b), (u-a)/(b-a) if b != a else 1, 0)
    right = np.where((u >= b) & (u < c), (c-u)/(c-b) if c != b else 0, 0)
    return left+right

def trapmf(universe:list, abcd:list):
    a,b,c,d = abcd
    u = np.asarray(universe)
    left = np.where((u >= a) & (u < b), (u-a)/(b-a) if b != a else 1, 0)
    top = np.where((u >= b) & (u < c), 1, 0)
    right = np.where((u >= c) & (u < d), (c-u)/(c-d) if c != d else 0, 0)
    return left+top+right

def smf(universe:list, ab:list):
    a,b = ab
    u = np.asarray(universe)
    slope = np.where((u >= a) & (u < b), (u-a)/(b-a) if b != a else 1, 0)
    top = np.where(u >= b, 1, 0)
    return slope+top

def zmf(universe:list, ab:list):
    a,b = ab
    u = np.asarray(universe)
    slope = np.where((u >= a) & (u < b), (b-u)/(a-b) if b != a else 0, 0)
    top = np.where(u < a, 1, 0)
    return slope+top

def gaussmf(universe:list, sm:list):
    s,m = sm
    u = np.asarray(universe)
    return np.exp((-1*(u-m)**2)/(2*s**2))

def sigmf(universe:list, ac:list):
    a,c = ac
    u = np.asarray(universe)
    return 1/(1+np.exp(-1*a*(u-c)))

membership_functions = {
    'trimf': trimf,
    'trapmf': trapmf,
    'smf': smf,
    'zmf': zmf,
    'gaussmf':gaussmf,
    'sigmf':sigmf
}

def mf(name:str, universe:list, param:list) -> np.ndarray:
    if name not in membership_functions:
        raise ValueError(f"Membership function '{name}' is not defined.")
    return membership_functions[name](universe,param)


if __name__ == "__main__":
    num_points = 100

