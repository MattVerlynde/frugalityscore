# frugalityscore : a fuzzy-logic based frugality scoring toolbox for machine learning applications

This repository contains the code for the python package frugalityscore, associated with the article [*A FUZZY LOGIC BASED FRUGALITY EVALUATION SCORE*](doc/paper.pdf) to evaluate the frugality of a machine learning method based on its energy consumption and performance.

> The popularity of efficiency as an optimization between performance and energy consumption rose within research in machine learning, following concerns in the ecological footprint of artificial intelligence (AI). Frugality emerged as a term that questions the quality of these notions. What is a good performance or a good energy consumption? These questions remain subjective, task-specific, and difficult to quantify. In this work, we propose a new frugality scoring method based upon fuzzy logic, that encapsulate these aspects with applications to common situations in machine learning. This score allows both for an absolute evaluation of the frugality of a method, and a relative analysis for the user’s own case study.

#### Contents

- [Repository structure](#structure)
- [Installation](#install)
  - [Dependencies](#dependencies)
- [Usage](#use)
- [Reproducibility](#reproducibility)
- [References](#references)


## Repository structure <a name="structure"></a>

```bash
.
├── doc
│   ├── classification.py
│   ├── environment.yml
│   ├── experiment.yml
│   ├── paper.pdf
│   ├── performance-tracking
│   │   ├── ...
│   │   └── README.md
│   ├── README.md
│   └── webapp
│       ├── frugalityscore.js
│       ├── index.html
│       └── style.css
├── LICENSE
├── pyproject.toml
├── README.md
├── setup_other.py
├── src
│   ├── data
│   │   ├── CPUs.csv
│   │   ├── GPUs.csv
│   │   ├── referenceEnergy.csv
│   │   └── referencePerformance.json
│   ├── frugalityscore
│   │   ├── defuzz.py
│   │   ├── __init__.py
│   │   ├── membership.py
│   │   ├── system.py
│   │   └── variable.py
│   └── frugalityscore.egg-info
│       ├── dependency_links.txt
│       ├── PKG-INFO
│       ├── SOURCES.txt
│       └── top_level.txt
└── tests
    └── test.ipynb
```

## Installation <a name="install"></a>

### Dependencies <a name="dependencies"></a>

python 3.11.8, codecarbon 2.3.4, numpy 1.26.4, pandas 2.2.1

```bash
pip install frugalityscore
```

## Usage <a name="use"></a>

```python
>>> import frugalityscore as fscore
>>> energy_train, energy_test = 1000, 1
>>> performance = 0.75
>>> score = fscore.system.MLFrugalityScore()
>>> score.interpret(input=[energy_train, energy_test,performance],defuzz="centroid")
0.09696305232614358
```


#### Test with machine learning frugality score system
```python
>>> score = fscore.system.MLFrugalityScore(path="../src/data", 
                                           scale="s", 
                                           scale_inference="s", 
                                           system="DEFAULT")
>>> print("Score :", score.interpret(input=[0.1,0.1,0.3], plot=plot, defuzz=defuzz))
```


#### Test with machine learning frugality score system
```python
>>> score = fscore.system.MLFrugalityScore(path="../src/data", reference="fridge")
>>> print("Score :", score.interpret(input=[10,0.09,0.3], plot=plot, defuzz=defuzz))
```


#### Test with default frugality score system
```python
>>> score = fscore.system.FrugalityScore(trainable=False, 
                                         gpu=False, 
                                         cores=1, 
                                         memory=2, 
                                         system="DEFAULT",
                                         path="../src/data",
                                         reference="system",
                                         scale="d",
                                         metric='accuracy')
>>> print("Score :", score.interpret(input=[90,0.1], plot=plot, defuzz=defuzz))
>>> score = fscore.system.FrugalityScore(trainable=True, 
                                         gpu=False, 
                                         cores=1, 
                                         memory=2, 
                                         system="DEFAULT", 
                                         path="../src/data", 
                                         reference="system", 
                                         scale="d", 
                                         scale_inference="s", 
                                         metric='accuracy')
>>> print("Score :", score.interpret(input=[90,0.1,0.1], plot=plot, defuzz=defuzz))
```



#### Custom system
```python
>>> energy_train = fscore.system.FuzzyVariable(min=0, 
                                               max=1000, 
                                               functions=['trimf','trimf','trapmf'], 
                                               params=[[0,0,25],[0,25,50],[25,50,1000,1000]], 
                                               num_points=num_points)
>>> energy_test = fscore.system.FuzzyVariable(min=0, 
                                              max=10, 
                                              functions=['trimf','trimf','trapmf'], 
                                              params=[[0,0,2.5],[0,2.5,5],[2.5,5,10,10]], 
                                              num_points=num_points)
>>> performance = fscore.system.FuzzyVariable(min=0, 
                                              max=1, 
                                              functions=['trimf','trimf','trimf'], 
                                              params=[[0,0,0.5],[0,0.5,1],[0.5,1,1]], 
                                              num_points=num_points)
>>> frugality_score = fscore.system.FuzzyVariable(min=0, 
                                                  max=1, 
                                                  functions=['trimf','trimf','trimf','trimf','trimf'], 
                                                  params=[[0,0,0.25],[0,0.25,0.5],[0.25,0.5,0.75],[0.5,0.75,1],[0.75,1,1]], 
                                                  num_points=num_points)
>>> rules = np.array([[[2,3,4],
                       [1,2,3],
                       [0,1,2]],
                      [[1,2,3],
                       [0,1,2],
                       [0,0,1]],
                      [[0,1,2],
                       [0,0,1],
                       [0,0,0]]])
>>> score = fscore.system.FuzzySystem(invar=[energy_train,energy_test,performance], 
                                      outvar=frugality_score, 
                                      rules=rules)
```

#### Tracking system
```python
>>> score = fscore.system.TrackingFrugalityScore(path="../src/data", 
                                                 epoch=9, 
                                                 max_epoch=10, 
                                                 reference="smartphone")
>>> print("Score: ", score.interpret(input=[5,0.3], 
                                     plot=plot, 
                                     defuzz=defuzz))
```

## Reproducibility <a name="reproducibility"></a>

The documentation to reproduce the results of the associated paper is available [**HERE**](doc/README.md)