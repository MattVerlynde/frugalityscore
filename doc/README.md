# frugalityscore : a fuzzy-logic based frugality scoring toolbox for machine learning applications

This repository contains the code for the python package frugalityscore, associated with the article [*A FUZZY LOGIC BASED FRUGALITY EVALUATION SCORE*](doc/) to evaluate the frugality of a machine learning method based on its energy consumption and performance.

> The popularity of efficiency as an optimization between performance and energy consumption rose within research in machine learning, following concerns in the ecological footprint of artificial intelligence (AI). Frugality emerged as a term that questions the quality of these notions. What is a good performance or a good energy consumption? These questions remain subjective, task-specific, and difficult to quantify. In this work, we propose a new frugality scoring method based upon fuzzy logic, that encapsulate these aspects with applications to common situations in machine learning. This score allows both for an absolute evaluation of the frugality of a method, and a relative analysis for the user’s own case study.

#### Contents

- [Repository structure](#structure)
- [Installation](#install)
  - [Dependencies](#dependencies)
  - [Data installation](#data)
- [Usage](#use)
- [References](#references)


## Repository structure <a name="structure"></a>

```bash
.
├── frugalityscore
│   ├── data
│   │   ├── CPUs.csv
│   │   ├── GPUs.csv
│   │   ├── referenceEnergy.csv
│   │   └── referencePerformance.json
│   ├── defuzz.py
│   ├── __init__.py
│   ├── membership.py
│   ├── __pycache__
│   │   ├── defuzz.cpython-311.pyc
│   │   ├── __init__.cpython-311.pyc
│   │   ├── membership.cpython-311.pyc
│   │   ├── system.cpython-311.pyc
│   │   └── variable.cpython-311.pyc
│   ├── system.py
│   └── variable.py
├── LICENSE
├── README.md
└── setup.py
```

## Installation <a name="install"></a>

### Dependencies <a name="dependencies"></a>

python 3.11.8, codecarbon 2.3.4, numpy 1.26.4, pandas 2.2.1
```bash
conda env create -f environment.yml
conda activate frugal-env
```

### Data installation <a name="data"></a>



## Usage <a name="use"></a>

| File | Command line | Description |
| ---- | ------------------ | ----------- |
| [classification.py](https://github.com/MattVerlynde/frugalityscore/doc/classification.py)  | `python classification.py --dataset [DATASET_NAME] --num_epochs [NUMBER_OF_EPOCHS] --batch_size [BATCH_SIZE] --learning_rate [LEARNING_RATE] --data_root [DATASET_PATH] --model [MODEL_NAME] --pretrained [true_IF_PRETRAINED] --device [gpu_OR_cpu] --storage_path [OUTPUT_STORAGE_PATH] --num_workers [NUMBER_OF_WORKERS] --seed [RANDOM_SEED] --prefetch_factor [PREFETCH_NUMBER_OF_BATCHES] --max_stagnation [MAX_NUM8EPOCHS_EARLY_STOPPING]` | Run classification task, on input dataset and model names |
| [classif_scenarii.py](https://github.com/MattVerlynde/frugalityscore/doc/performance-tracking/experiments/frugalscenarii/classif_scenarii.py)  | `python classif_scenarii.py --dataset [DATASET_NAME] --num_epochs [NUMBER_OF_EPOCHS] --batch_size [BATCH_SIZE] --learning_rate [LEARNING_RATE] --data_root [DATASET_PATH] --model [MODEL_NAME] --pretrained [true_IF_PRETRAINED] --device [gpu_OR_cpu] --storage_path [OUTPUT_STORAGE_PATH] --num_workers [NUMBER_OF_WORKERS] --seed [RANDOM_SEED] --prefetch_factor [PREFETCH_NUMBER_OF_BATCHES] --max_stagnation [MAX_NUM8EPOCHS_EARLY_STOPPING]` | Run classification task, on input dataset and model names and track energy consumption using connected plug |

```bash
qanat init .
qanat experiment new -f experiment.yml
qanat experiment run frugalscenarii --param_file src/performance-tracking/experiments/frugalscenarii/param_classif_imagenet.yaml
qanat experiment run frugalscenarii --param_file src/performance-tracking/experiments/frugalscenarii/param_classif_cifar100.yaml
qanat experiment run frugalscenarii --param_file src/performance-tracking/experiments/frugalscenarii/param_classif_mnist.yaml
```