from math import exp

def trimf(universe:list, abc:list):
    res = []
    a,b,c = abc
    for x in universe:
        if x < a or x >= c:
            res.append(0)
        elif x < b:
            res.append((x-a)/(b-a))
        else:
            res.append((c-x)/(c-b))
    return res

def trapmf(universe:list, abcd:list):
    res = []
    a,b,c,d = abcd
    for x in universe:
        if x < a or x >= d:
            res.append(0)
        elif x < b:
            res.append((x-a)/(b-a))
        elif x < c:
            res.append(1)
        else:
            res.append((d-x)/(d-c))
    return res

def smf(universe:list, ab:list):
    res = []
    a,b = ab
    for x in universe:
        if x < a:
            res.append(0)
        elif x < b:
            res.append((x-a)/(b-a))
        else:
            res.append(1)
    return res

def zmf(universe:list, ab:list):
    res = []
    a,b = ab
    for x in universe:
        if x < a:
            res.append(1)
        elif x < b:
            res.append((b-x)/(b-a))
        else:
            res.append(0)
    return res

def gaussmf(universe:list, sm:list):
    res = []
    s,m = sm
    for x in universe:
        xg = exp((-1*(x-m)**2)/(2*s**2))
        res.append(xg)
    return res

def sigmf(universe:list, ac:list):
    res = []
    a,c = ac
    for x in universe:
        xg = 1/(1+exp(-1*a*(x-c)))
        res.append(xg)
    return res

membership_functions = {
    'trimf': trimf,
    'trapmf': trapmf,
    'smf': smf,
    'zmf': zmf,
    'gaussmf':gaussmf,
    'sigmf':sigmf
}

def mf(name:str, universe:list, param:list):
    return membership_functions[name](universe,param)


if __name__ == "__main__":
    num_points = 100

