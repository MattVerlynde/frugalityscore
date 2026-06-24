import frugalityscore as fscore
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import argparse
import os

# ======================
# Dataset configurations
# ======================

def prepareCIFAR100(df, dataset):
    pretrained = ("pretrained" in dataset)
    return df[df["Pretrained"] == pretrained].drop(columns=['Pretrained'])

def prepareBUTTERE(df, dataset):
    selection = ("selection" in dataset)
    if selection:
        df = df[(df["shape"] == "rectangle") & (df["size"] == 2048) & (df["hardware_type"] == "gpu1")]
        df["Model"] = df["depth"].astype(str)
    else:
        df['Model'] = df[["shape","size","hardware_type","depth"]].agg('-'.join, axis=1)
    return df.drop(columns=["shape","size","hardware_type","depth"])

def no_transform(df, dataset):
    return df

NUM_POINTS = 100000
 
DATASET_CONFIGS = {
    "mnist": {
        "file": "doc/data/mnist.csv",
        "total_power": 275,
        "energy_thresholds": {
            "train": {
                "low": 5,
                "medium": 60,
                "high": 180
            },
            "test": {
                "low": 1,
                "medium": 5,
                "high": 30
            },
        },
        "performance_thresholds": {
            "low": 0.5,
            "medium": 1,
            "high": 1
        },
        "performance_name": "Accuracy",
        "energy_name": {
            "train": "Energy in training (J)",
            "test": "Energy in inference (J)"
        },
        "transform": no_transform,
    },
    "cifar100": {
        "file": "doc/data/cifar100.csv",
        "total_power": 275,
        "energy_thresholds": {
            "train": {
                "low": 300,
                "medium": 3600,
                "high": 18000
            },
            "test": {
                "low": 10,
                "medium": 30,
                "high": 60
            },
        },
        "performance_thresholds": {
            "low": 0.5,
            "medium": 1,
            "high": 1
        },
        "performance_name": "Accuracy",
        "energy_name": {
            "train": "Energy in training (J)",
            "test": "Energy in inference (J)"
        },
        "transform": prepareCIFAR100,
    },
    "cifar100pretrained": {
        "file": "doc/data/cifar100.csv",
        "total_power": 275,
        "energy_thresholds": {
            "train": {
                "low": 300,
                "medium": 3600,
                "high": 18000
            },
            "test": {
                "low": 10,
                "medium": 30,
                "high": 60
            },
        },
        "performance_thresholds": {
            "low": 0.5,
            "medium": 1,
            "high": 1
        },
        "performance_name": "Accuracy",
        "energy_name": {
            "train": "Energy in training (J)",
            "test": "Energy in inference (J)"
        },
        "transform": prepareCIFAR100,
    },
    "imagenet": {
        "file": "doc/data/imagenet.csv",
        "total_power": 275,
        "energy_thresholds": {
            "train": {
                "low": 86400,
                "medium": 259200,
                "high": 1814400
            },
            "test": {
                "low": 10,
                "medium": 30,
                "high": 120
            },
        },
        "performance_thresholds": {
            "low": 0.5,
            "medium": 0.75,
            "high": 1
        },
        "performance_name": "Accuracy",
        "energy_name": {
            "train": "Energy in training (J)",
            "test": "Energy in inference (J)"
        },
        "transform": no_transform,
    },
    "buttere": {
        "file": "doc/data/buttere.csv",
        "total_power": 700,
        "energy_thresholds": {
            "low": 3600,
            "medium": 10800,
            "high": 21600
        },
        "performance_thresholds": {
            "low": 0.5,
            "medium": 1,
            "high": 1
        },
        "performance_name": "Median Accuracy",
        "energy_name": "Energy in training (J)",
        "transform": prepareBUTTERE,
    },
    "buttere-selection": {
        "file": "doc/data/buttere.csv",
        "total_power": 900,
        "energy_thresholds": {
            "low": 3600,
            "medium": 10800,
            "high": 21600
        },
        "performance_thresholds": {
            "low": 0.5,
            "medium": 1,
            "high": 1
        },
        "performance_name": "Median Accuracy",
        "energy_name": "Energy in training (J)",
        "transform": prepareBUTTERE,
    },
}

# ========================
# Data loading and scoring
# ========================

def get_data(dataset, defuzz):
    metadata = DATASET_CONFIGS[dataset]
    isML = "train" in metadata['energy_thresholds'].keys()
    total_power = metadata['total_power']

    score =  fscore.system.FuzzyVariable(min=0, max=100, functions=['trimf','trimf','trimf','trimf','trimf'], params=[[0,0,25],[0,25,50],[25,50,75],[50,75,100],[75,100,100]], num_points=NUM_POINTS)


    pl = metadata['performance_thresholds']['low']
    pm = metadata['performance_thresholds']['medium']
    ph = metadata['performance_thresholds']['high']
    performance =  fscore.system.FuzzyVariable(min=0, max=ph, functions=['trimf','trimf','trapmf'], params=[[0,0,pl],[0,pl,pm],[pl,pm,ph,ph]], num_points=NUM_POINTS)
    if isML:
        eTrl = metadata['energy_thresholds']['train']['low']
        eTrm = metadata['energy_thresholds']['train']['medium']
        eTrh = metadata['energy_thresholds']['train']['high']
        eTel = metadata['energy_thresholds']['test']['low']
        eTem = metadata['energy_thresholds']['test']['medium']
        eTeh = metadata['energy_thresholds']['test']['high']
        energy_train = fscore.system.FuzzyVariable(min=0, max=total_power*eTrh, functions=['trimf','trimf','trapmf'], params=[[0,0,total_power*eTrl],[0,total_power*eTrl,total_power*eTrm],[total_power*eTrl,total_power*eTrm,total_power*eTrh,total_power*eTrh]], num_points=NUM_POINTS)
        energy_test = fscore.system.FuzzyVariable(min=0, max=total_power*eTeh, functions=['trimf','trimf','trapmf'], params=[[0,0,total_power*eTel],[0,total_power*eTel,total_power*eTem],[total_power*eTel,total_power*eTem,total_power*eTeh,total_power*eTeh]], num_points=NUM_POINTS)
        rules = np.array([[[2,3,4],
                        [1,2,3],
                        [0,1,2]],
                        [[1,2,3],
                        [0,1,2],
                        [0,0,1]],
                        [[0,1,2],
                        [0,0,1],
                        [0,0,0]]])
        scoresys = fscore.system.FuzzySystem(invar=[energy_train,energy_test,performance], outvar=score, rules=rules)
    else:
        el = metadata['energy_thresholds']['low']
        em = metadata['energy_thresholds']['medium']
        eh = metadata['energy_thresholds']['high']
        energy = fscore.system.FuzzyVariable(min=0, max=total_power*eh, functions=['trimf','trimf','trapmf'], params=[[0,0,total_power*el],[0,total_power*el,total_power*em],[total_power*el,total_power*em,total_power*eh,total_power*eh]], num_points=NUM_POINTS)
        rules = np.array([[2,3,4],
                        [1,2,3],
                        [0,1,2]])
        scoresys = fscore.system.FuzzySystem(invar=[energy,performance], outvar=score, rules=rules)

    df = pd.read_csv(metadata['file'])
    scores = np.zeros(df.shape[0])
    for i in range(df.shape[0]):
        row = df.iloc[i]
        input_sys = [row['Energy train'], row['Energy test'], row['Accuracy test']] if isML else [row['Energy test'], row['Accuracy test']]
        scores[i] = scoresys.interpret(input=input_sys, defuzz=defuzz, plot=(i==(df.shape[0]-1)))
    df['Frugality Score'] = scores
    df = metadata['transform'](df, dataset)
    df_mean = df.groupby(['Model']).mean().reset_index()
    df_std = df.groupby(['Model']).agg(lambda x: np.percentile(x, 95)).reset_index()
    return df, df_mean, df_std, isML

# ========================
# Plotting
# ========================

def plot_frug(dataset, output_dir, defuzz, df_mean, df_std, isML):
    j = 1 if isML else 0
    fig, axs = plt.subplots(4 if isML else 3, 1, figsize=(5, int((6/4)*(4 if isML else 3))))
    for ax in axs:
        ax.label_outer()
    cm = plt.get_cmap('viridis')
    axs[0].bar(df_mean["Model"], df_mean["Accuracy test"], yerr=abs(df_std["Accuracy test"] - df_mean["Accuracy test"]), capsize=5, alpha=0.7, edgecolor="black")
    axs[0].set_ylabel(DATASET_CONFIGS[dataset]["performance_name"])
    axs[0].set_ylim(0, 1)
    for i, v in enumerate(df_mean["Accuracy test"]):
        if v < 1*0.5:
            axs[0].text(i, v + max(df_mean["Accuracy test"])*0.1, f"{v:.2f}", ha='center', fontsize=8)
        else:
            axs[0].text(i, v - max(df_mean["Accuracy test"])*0.2, f"{v:.2f}", ha='center', fontsize=8)
    if isML:
        axs[1].bar(df_mean["Model"], df_mean["Energy train"], yerr=abs(df_std["Energy train"] - df_mean["Energy train"]), capsize=5, alpha=0.7, edgecolor="black")
        axs[1].set_ylabel(DATASET_CONFIGS[dataset]["energy_name"]["train"])
        for i, v in enumerate(df_mean["Energy train"]):
            if v < max(df_mean["Energy train"])*0.5:
                axs[1].text(i, v + max(df_mean["Energy train"])*0.1, f"{v:.1e}", ha='center', fontsize=8)
            else:
                axs[1].text(i, v - max(df_mean["Energy train"])*0.3, f"{v:.1e}", ha='center', fontsize=8)
        axs[2].bar(df_mean["Model"], df_mean["Energy test"], yerr=abs(df_std["Energy test"] - df_mean["Energy test"]), capsize=5, alpha=0.7, edgecolor="black")
        axs[2].set_ylabel(DATASET_CONFIGS[dataset]["energy_name"]["test"])
        for i, v in enumerate(df_mean["Energy test"]):
            if v < max(df_mean["Energy test"])*0.5:
                axs[2].text(i, v + max(df_mean["Energy test"])*0.1, f"{v:.0f}", ha='center', fontsize=8)
            else:
                axs[2].text(i, v - max(df_mean["Energy test"])*0.3, f"{v:.0f}", ha='center', fontsize=8)
    else:
        axs[1].bar(df_mean["Model"], df_mean["Energy test"], yerr=abs(df_std["Energy test"] - df_mean["Energy test"]), capsize=5, alpha=0.7, edgecolor="black")
        axs[1].set_ylabel(DATASET_CONFIGS[dataset]["energy_name"])
        for i, v in enumerate(df_mean["Energy test"]):
            if v < max(df_mean["Energy test"])*0.5:
                axs[1].text(i, v + max(df_mean["Energy test"])*0.1, f"{v:.1e}", ha='center', fontsize=8)
            else:
                axs[1].text(i, v - max(df_mean["Energy test"])*0.3, f"{v:.1e}", ha='center', fontsize=8)
    axs[2+j].bar(df_mean["Model"], df_mean["Frugality Score"], yerr=abs(df_std["Frugality Score"] - df_mean["Frugality Score"]), capsize=5, alpha=0.7, edgecolor="black", color=cm(df_mean["Frugality Score"]/100))
    axs[2+j].set_ylabel(f'Frugality Score\n(mode {defuzz.lower()})')
    axs[2+j].set_xlabel('Classifier')
    for i, v in enumerate(df_mean["Frugality Score"]):
        if v < max(df_mean["Frugality Score"])*0.5:
            axs[2+j].text(i, v + max(df_mean["Frugality Score"])*0.1, f"{v:.2f}", ha='center', fontsize=8)
        else:
            axs[2+j].text(i, v - max(df_mean["Frugality Score"])*0.2, f"{v:.2f}", ha='center', fontsize=8)
    plt.xticks(rotation=30, ha='right')
    plt.tight_layout()
    fig.align_ylabels(axs)
    plt.savefig(f"{output_dir}/{dataset}/frugality_scores_{defuzz}.pdf", dpi=300, format='pdf')
    plt.show()                                                                              
   

def plot_efficient(dataset, output_dir, df, isML):
    df["Energy total"] = df["Energy train"] + df["Energy test"] if isML else df["Energy test"]
    df["Energy total norm"] = df["Energy total"] / df["Energy total"].max()

    # ======================
    # Score WS
    # ======================
    frug_ws = []
    frug_ws_yerr = []
    for epsilon in [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]:
        df["Score WS"] = epsilon*(1 - df["Energy total norm"]) + (1-epsilon)*df["Accuracy test"]
        df_mean = df[["Model", "Accuracy test", "Energy total norm", "Score WS"]].groupby(["Model"]).mean().unstack()
        frug_ws.append(df_mean['Score WS'].values.reshape(-1))
        frug_ws_yerr.append(df[["Model", "Accuracy test", "Energy total norm", "Score WS"]].groupby(["Model"]).std().unstack()['Score WS'].values.reshape(-1))

    # ======================
    # Score HM
    # ======================
    frug_hm = []
    frug_hm_yerr = []
    for kappa in [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2]:
        df["Score HM"] = ((1 + kappa**2)*(1- df["Energy total norm"])*df["Accuracy test"]/((1- df["Energy total norm"]) + (kappa**2)*df["Accuracy test"]))
        df_mean = df[["Model", "Accuracy test", "Energy total norm", "Score HM"]].groupby(["Model"]).mean().unstack()
        frug_hm.append(df_mean['Score HM'].values.reshape(-1))
        frug_hm_yerr.append(df[["Model", "Accuracy test", "Energy total norm", "Score HM"]].groupby(["Model"]).std().unstack()['Score HM'].values.reshape(-1))

    # ======================
    # Score Evchenko
    # ======================
    frug_evchenko = []
    frug_evchenko_yerr = []
    for w in [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2]:
        df["Score Evchenko"] = (df["Accuracy test"] - w/(1+1/(df["Energy total"]/3.6e3)))
        df_mean = df[["Model", "Accuracy test", "Energy total norm", "Score Evchenko"]].groupby(["Model"]).mean().unstack()
        frug_evchenko.append(df_mean['Score Evchenko'].values.reshape(-1))
        frug_evchenko_yerr.append(df[["Model", "Accuracy test", "Energy total norm", "Score Evchenko"]].groupby(["Model"]).std().unstack()['Score Evchenko'].values.reshape(-1))

    frug_ws = np.array(frug_ws)
    frug_ws_yerr = np.array(frug_ws_yerr)
    frug_hm = np.array(frug_hm)
    frug_hm_yerr = np.array(frug_hm_yerr)
    frug_evchenko = np.array(frug_evchenko)
    frug_evchenko_yerr = np.array(frug_evchenko_yerr)

    legend = [df_mean.index[i][1] for i in range(len(df_mean))]

    fig, axs = plt.subplots(1, 3, figsize=(10, 2))
    axs[0].plot(frug_ws)
    for i in range(frug_ws.shape[1]):
        axs[0].fill_between(np.arange(0, 11, 1), frug_ws[:,i] - 1.96*frug_ws_yerr[:,i], frug_ws[:,i] + 1.96*frug_ws_yerr[:,i], alpha=0.3)
    axs[0].set_xticks(np.arange(0, 11, 1)[::2], np.arange(0, 11, 1)[::2]/10)
    axs[0].set_ylabel('Efficiency Score')
    axs[0].set_ylim(0, 1)
    axs[0].set_xlabel('ε')
    axs[0].set_title('Weighted Sum')

    axs[1].plot(frug_hm)
    for i in range(frug_hm.shape[1]):
        axs[1].fill_between(np.arange(0, 11, 1), frug_hm[:,i] - 1.96*frug_hm_yerr[:,i], frug_hm[:,i] + 1.96*frug_hm_yerr[:,i], alpha=0.3)
    axs[1].set_xticks(np.arange(0, 11, 1)[::2], np.arange(0, 22, 2)[::2]/10)
    axs[1].set_ylim(0, 1)
    axs[1].set_xlabel('κ')
    axs[1].set_title('Harmonic Mean')
    
    for i in range(frug_evchenko.shape[1]):
        axs[2].plot(frug_evchenko[:,i], label=legend[i])
        axs[2].fill_between(np.arange(0, 11, 1), frug_evchenko[:,i] - 1.96*frug_evchenko_yerr[:,i], frug_evchenko[:,i] + 1.96*frug_evchenko_yerr[:,i], alpha=0.3)
    ci = axs[2].fill_between(np.arange(0, 11, 1),
                            frug_evchenko[:, 0] - 1.96 * frug_evchenko_yerr[:, 0],
                            frug_evchenko[:, 0] + 1.96 * frug_evchenko_yerr[:, 0],
                            color='gray', alpha=0.3,label='95% CI'
    )
    ci.set_visible(False)
    axs[2].set_xticks(np.arange(0, 11, 1)[::2], np.arange(0, 22, 2)[::2]/10)
    axs[2].set_xlabel('w')
    axs[2].set_title('Evchenko Score')
    axs[2].legend(loc='upper left', bbox_to_anchor=(1.02, 1), frameon=False)
    fig.subplots_adjust(right=0.78)
    plt.savefig(f'{output_dir}/{dataset}/efficiency_scores.pdf', dpi=300, format='pdf')
    plt.show()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Frugality scoring framework applied to classical machine learning scenarios.')
    parser.add_argument('--dataset', type=str, default='mnist', choices=list(DATASET_CONFIGS.keys()), help='Dataset to use (e.g., ImageNet, CIFAR100, MNIST)')
    parser.add_argument('--defuzz', type=str, default='centroid', help='Defuzzification function to use')
    parser.add_argument('--output_dir', type=str, default='output', help='Output directory for plots.')
    args = parser.parse_args()

    if not os.path.isdir(os.path.join(args.output_dir,args.dataset)):
        os.makedirs(os.path.join(args.output_dir,args.dataset))

    df, df_mean, df_std, isML = get_data(dataset=args.dataset, defuzz=args.defuzz)
    plot_frug(dataset=args.dataset, output_dir=args.output_dir, defuzz=args.defuzz, df_mean=df_mean, df_std=df_std, isML=isML)
    plot_efficient(dataset=args.dataset, output_dir=args.output_dir, df=df, isML=isML)
