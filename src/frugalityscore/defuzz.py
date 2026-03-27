import numpy as np

def mom(universe:list, output:list):
    res = []
    max_mx = output[0]
    for i, mx in enumerate(output):
        if mx > max_mx:
            max_mx = mx
            res = [universe[i]]
        elif mx == max_mx:
            res.append(universe[i])
    return sum(res)/len(res)

def lom(universe:list, output:list):
    max_mx = output[0]
    for i, mx in enumerate(output):
        if mx >= max_mx:
            max_mx = mx
            res=universe[i]
    return res

def som(universe:list, output:list):
    max_mx = output[0]
    for i, mx in enumerate(output):
        if mx > max_mx:
            max_mx = mx
            res=universe[i]
    return res

def centroid(universe:list, output:list):
    sum_xmx = 0
    sum_mx = 0
    for i, mx in enumerate(output):
        x=universe[i]
        sum_xmx += x*mx
        sum_mx += mx
    return sum_xmx/sum_mx

def bisector(universe:list, output:list):
    sum_area = 0
    area_acc = [0]
    for i in range(1,len(output)):
        x1, x2 = universe[i-1], universe[i]
        mx1, mx2 = output[i-1], output[i]
        if mx1 == mx2:
            area = mx1*(x2 - x1)
        else:
            area = (mx1 + mx2)*(x2 - x1)/2
        sum_area += area
        area_acc.append(sum_area)

    i = 0
    while area_acc[i] < sum_area/2:
        i+=1
    x1, x2 = universe[i-1], universe[i]
    mx1, mx2 = output[i-1], output[i]
    subarea = (sum_area/2) - area_acc[i-1]
    if mx1 == mx2:
        return x1 + subarea/mx1
    else:
        area = (mx1 + mx2)*(x2 - x1)/2
        return (x1 - (mx1-np.sqrt(mx1*mx1 + 2.0*area*subarea)) / area)

defuzz_functions = {
    'mom': mom,
    'lom': lom,
    'som': som,
    'centroid': centroid,
    'bisector': bisector
}

def defuzz(mode:str, universe:list, output:list):
    return defuzz_functions[mode](universe,output)

if __name__ == "__main__":
    num_points = 100

