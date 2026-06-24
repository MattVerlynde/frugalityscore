# Tracking energy consumption and performance metrics

This repository is used to track the performances of different models in terms of hardware usage and inference time. These comparisons are made using data fetched on InfluxDB, a time-series database, and visualized on Grafana, a data visualization tool.
This repository is made to be used as a submodule to apply on your data after construction of your pipeline. 

## Repository structure

```bash
.
├── experiments
│   ├── conso
│   │   ├── analyse_stats.py
│   │   ├── get_conso.py
│   │   ├── get_stats.py
│   │   ├── query_influx.sh
│   │   ├── simulation_metrics_exec.sh
│   │   ├── stats_summary_blob.py
│   │   ├── stats_summary_deep.py
│   │   └── stats_summary.py
│   └── frugalscenarii
│       ├── classif_scnearii.py
│       ├── get_perf.py
│       ├── get_scores.py
│       ├── param_classif_cifar100.yml
│       ├── param_classif_imagenet.yml
│       ├── param_classif_mnist.yml
│       ├── read_event.py
│       ├── read_events.py
│       └── simulation_metrics_exec.sh
├── plot_usage.py
├── README.md
└── simulation_metrics_exec.sh
```
```
