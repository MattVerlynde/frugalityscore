# frugalityscore : a fuzzy-logic based frugality scoring toolbox for machine learning applications

This repository contains the code for the python package frugalityscore, associated with the article [*A FUZZY LOGIC BASED FRUGALITY EVALUATION SCORE*](paper.pdf) to evaluate the frugality of a machine learning method based on its energy consumption and performance.

> The use of artificial intelligence (AI) has risen exponentially in the last decade, and the popularity of frugal AI followed this trend in the community. Yet, most of this research focuses on efficiency as in decreasing the energy consumption and raising the performance. Frugality is a term that accounts for the objectives of an application, and encapsulates their subjective aspect. Indeed, what is a good performance or a low energy consumption? These terms are difficult to quantify and the question is task-specific. In this work, we propose a new frugality scoring method based upon fuzzy logic to address this issue. The proposed frugality scoring method is applied to a number of common tasks in machine learning, which provides a wide evaluation of the plasticity of the fuzzy based scoring. This score allows for an objective-aware evaluation of the frugality of a method depending on the user specificity.

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
├── classification.py
├── environment.yml
├── experiment.yml
├── paper.pdf
├── performance-tracking
│   ├── ...
│   └── README.md
├── README.md
└── webapp
    ├── frugalityscore.js
    ├── index.html
    └── style.css
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
| [classification.py](classification.py)  | `python classification.py --dataset [DATASET_NAME] --num_epochs [NUMBER_OF_EPOCHS] --batch_size [BATCH_SIZE] --learning_rate [LEARNING_RATE] --data_root [DATASET_PATH] --model [MODEL_NAME] --pretrained [true_IF_PRETRAINED] --device [gpu_OR_cpu] --storage_path [OUTPUT_STORAGE_PATH] --num_workers [NUMBER_OF_WORKERS] --seed [RANDOM_SEED] --prefetch_factor [PREFETCH_NUMBER_OF_BATCHES] --max_stagnation [MAX_NUM8EPOCHS_EARLY_STOPPING]` | Run classification task, on input dataset and model names |
| [classif_scenarii.py](performance-tracking/experiments/frugalscenarii/classif_scenarii.py)  | `python classif_scenarii.py --dataset [DATASET_NAME] --num_epochs [NUMBER_OF_EPOCHS] --batch_size [BATCH_SIZE] --learning_rate [LEARNING_RATE] --data_root [DATASET_PATH] --model [MODEL_NAME] --pretrained [true_IF_PRETRAINED] --device [gpu_OR_cpu] --storage_path [OUTPUT_STORAGE_PATH] --num_workers [NUMBER_OF_WORKERS] --seed [RANDOM_SEED] --prefetch_factor [PREFETCH_NUMBER_OF_BATCHES] --max_stagnation [MAX_NUM8EPOCHS_EARLY_STOPPING]` | Run classification task, on input dataset and model names and track energy consumption using connected plug |

```bash
qanat init .
qanat experiment new -f experiment.yml
qanat experiment run frugalscenarii --param_file src/performance-tracking/experiments/frugalscenarii/param_classif_imagenet.yaml
qanat experiment run frugalscenarii --param_file src/performance-tracking/experiments/frugalscenarii/param_classif_cifar100.yaml
qanat experiment run frugalscenarii --param_file src/performance-tracking/experiments/frugalscenarii/param_classif_mnist.yaml
```