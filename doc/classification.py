import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import datasets, models, transforms
import torch
import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from collections import namedtuple
import argparse

from tqdm import trange, tqdm

# ======================
# Dataset configurations
# ======================
 
DATASET_CONFIGS = {
    "mnist": {
        "num_classes": 10,
        "in_channels": 1,
        "val_split": 0.4,          # fraction of train set used for validation
        "val_size": None,  # use ratio-based split
    },
    "cifar100": {
        "num_classes": 100,
        "in_channels": 3,
        "val_split": 0.4,
        "val_size": None,
    },
    "imagenet": {
        "num_classes": 1000,
        "in_channels": 3,
        "val_split": None,
        "val_size": 50000,  # fixed holdout size
    },
}

# ===============================
# Dataloading and transformations
# ===============================

def get_transforms(dataset_name):
    img_size = (256, 256)
    crop_size = (224, 224)
    mean_values = [0.485, 0.456, 0.406]
    std_values = [0.229, 0.224, 0.225]

    if dataset_name == "imagenet":
        transform_train = CustomCompose([
            transforms.Resize(img_size, interpolation=transforms.InterpolationMode.BILINEAR),  # Resize the image to the specified size
            transforms.RandomResizedCrop(crop_size),  # Random crop the image to the specified size
            transforms.RandomHorizontalFlip(),  # Randomly flip the image horizontally
            transforms.ToTensor(),           # Convert the PIL image to a tensor
            transforms.Normalize(
                mean=mean_values, 
                std=std_values)  # Normalize the image
        ])

        transform_test = CustomCompose([
            transforms.Resize(img_size, interpolation=transforms.InterpolationMode.BILINEAR),  # Resize the image to the specified size
            transforms.CenterCrop(crop_size),  # Center crop the image to the specified size
            transforms.ToTensor(),           # Convert the PIL image to a tensor
            transforms.Normalize(
                mean=mean_values, 
                std=std_values)  # Normalize the image
        ])

    else:
        transform_train = CustomCompose([
            transforms.Resize(img_size, interpolation=transforms.InterpolationMode.BILINEAR),  # Resize the image to the specified size
            transforms.CenterCrop(crop_size),  # Center crop the image to the specified size
            transforms.ToTensor(),           # Convert the PIL image to a tensor
            transforms.Normalize(
                mean=mean_values, 
                std=std_values)  # Normalize the image
        ])

        transform_test = transform_train

    return transform_train, transform_test

def get_dataloaders(dataset_name, data_root, transform_train, transform_test, batch_size, num_workers, seed):

    if dataset_name == "imagenet":
        full_train_dataset = datasets.ImageFolder(root=os.path.join(data_root, 'train'), transform=transform_train)
        len_dataset = len(full_train_dataset)
        dataset_train, dataset_val = torch.utils.data.random_split(full_train_dataset, [len_dataset - DATASET_CONFIGS[dataset_name]["val_size"], DATASET_CONFIGS[dataset_name]["val_size"]], generator=torch.Generator().manual_seed(seed))
        dataset_test = datasets.ImageFolder(root=os.path.join(data_root, 'val'), transform=transform_test)

        trainloader = DataLoader(dataset_train, 
                                batch_size=batch_size, 
                                shuffle=True, 
                                num_workers=num_workers, 
                                pin_memory=True, 
                                #  prefetch_factor=prefetch_factor,
                                #  multiprocessing_context='fork'
                                )
        validloader = DataLoader(dataset_val, 
                                batch_size=batch_size, 
                                shuffle=False, 
                                num_workers=num_workers, 
                                pin_memory=True,
                                #  prefetch_factor=prefetch_factor,
                                #  multiprocessing_context='fork'
                                )
        testloader = DataLoader(dataset_test, 
                                batch_size=batch_size, 
                                shuffle=False, 
                                num_workers=num_workers, 
                                pin_memory=True, 
                                #  prefetch_factor=prefetch_factor,
                                #  multiprocessing_context='fork'
                                )
    elif dataset_name == "cifar100":
        full_train_dataset = datasets.CIFAR100(data_root, train=True, download=True, transform=transform_train)
        len_dataset_train = len(full_train_dataset)
        len_train = int((1-DATASET_CONFIGS[dataset_name]["val_split"])*len_dataset_train)
        len_val = len_dataset_train - len_train
        dataset_train, dataset_val = torch.utils.data.random_split(full_train_dataset, [len_train, len_val], generator=torch.Generator().manual_seed(seed))
        dataset_test = datasets.CIFAR100(data_root, train=False, download=True, transform=transform_test)

        trainloader = DataLoader(dataset_train, 
                                batch_size=batch_size, 
                                shuffle=True, 
                                num_workers=num_workers, 
                                pin_memory=True, 
                                )
        validloader = DataLoader(dataset_val, 
                                batch_size=batch_size, 
                                shuffle=False, 
                                num_workers=num_workers, 
                                pin_memory=True,
                                )
        testloader = DataLoader(dataset_test, 
                                batch_size=batch_size, 
                                shuffle=False, 
                                num_workers=num_workers, 
                                pin_memory=True, 
                                )
        
    elif dataset_name == "mnist":
        full_train_dataset = datasets.MNIST(data_root, train=True, download=True, transform=transform_train)
        len_dataset_train = len(full_train_dataset)
        len_train = int((1-DATASET_CONFIGS[dataset_name]["val_split"])*len_dataset_train)
        len_val = len_dataset_train - len_train
        dataset_train, dataset_val = torch.utils.data.random_split(full_train_dataset, [len_train, len_val], generator=torch.Generator().manual_seed(seed))
        dataset_test = datasets.MNIST(data_root, train=False, download=True, transform=transform_test)

        trainloader = DataLoader(dataset_train, 
                                batch_size=batch_size, 
                                shuffle=True, 
                                num_workers=num_workers, 
                                pin_memory=True
                                )
        validloader = DataLoader(dataset_val, 
                                batch_size=batch_size, 
                                shuffle=False, 
                                num_workers=num_workers, 
                                pin_memory=True
                                )
        testloader = DataLoader(dataset_test, 
                                batch_size=batch_size, 
                                shuffle=False, 
                                num_workers=num_workers, 
                                pin_memory=True
                                )
    
    return trainloader, validloader, testloader

# ====================
# Model configurations
# ====================

def freeze_model(model):
    for param in model.parameters():
        param.requires_grad = False
    if hasattr(model, 'classifier'):
        for param in model.classifier.parameters():
            param.requires_grad = True
    elif hasattr(model, 'fc'):
        for param in model.fc.parameters():
            param.requires_grad = True


def create_model(name, num_classes, pretrained=True):
        
    if name == 'resnet18':
        model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT if pretrained else None)
        model.fc = nn.Linear(model.fc.in_features, num_classes)
        model.fc.weight.data.normal_(0, 0.01)  # Initialize weights
        model.fc.bias.data.fill_(0.01)  # Initialize bias
    elif name == 'vgg16':
        model = models.vgg16(weights=models.VGG16_Weights.DEFAULT if pretrained else None)
        num_ftrs = model.classifier[6].in_features
        model.classifier[6] = nn.Linear(num_ftrs, num_classes)
        model.classifier[6].weight.data.normal_(0, 0.01)  # Initialize weights
        model.classifier[6].bias.data.fill_(0.01)  # Initialize bias
    elif name == 'vgg16_bn':
        model = models.vgg16_bn(weights=models.VGG16_BN_Weights.DEFAULT if pretrained else None)
        num_ftrs = model.classifier[6].in_features
        model.classifier[6] = nn.Linear(num_ftrs, num_classes)
        model.classifier[6].weight.data.normal_(0, 0.01)  # Initialize weights
        model.classifier[6].bias.data.fill_(0.01)  # Initialize bias
    elif name == 'mobilenet_v2':
        model = models.mobilenet_v2(weights=models.MobileNet_V2_Weights.DEFAULT if pretrained else None)
        num_ftrs = model.classifier[1].in_features
        model.classifier[1] = nn.Linear(num_ftrs, num_classes)
    elif name == 'efficientnet_b0':
        model = models.efficientnet_b0(weights=models.EfficientNet_B0_Weights.DEFAULT if pretrained else None)
        num_ftrs = model.classifier[1].in_features
        model.classifier[1] = nn.Linear(num_ftrs, num_classes)
    elif name == 'shufflenet_v2_x0_5':
        model = models.shufflenet_v2_x0_5(weights=models.ShuffleNet_V2_X0_5_Weights.DEFAULT if pretrained else None)
        num_ftrs = model.fc.in_features
        model.fc = nn.Linear(num_ftrs, num_classes)
    elif name == 'squeezenet1_0':
        model = models.squeezenet1_0(weights=models.SqueezeNet1_0_Weights.DEFAULT if pretrained else None)
        num_ftrs = model.classifier[1].in_channels
        model.classifier[1] = nn.Conv2d(num_ftrs, num_classes, kernel_size=(1, 1), stride=(1, 1))
        model.num_classes = num_classes
    else:
        raise ValueError("Model not supported")
    if pretrained:
        freeze_model(model)

    # Set device
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    return model.to(device)

# ========
# Training
# ========

def train(trainloader, validloader, model, lr=0.0001, num_epochs=100, testloader=None, max_stagn=5):
    device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=lr, betas=(0.9, 0.999), weight_decay=0.0001)

    results_train = []
    results_val = []
    t = trange(num_epochs, desc="Epoch", position=0, leave=False)
    best_val_loss, best_val_epoch = None, None
    for epoch in t:
        model.train()

        train_loss = 0.0
        train_corrects = 0

        n = 0
        t_trainloader = tqdm(trainloader, desc="Training", position=1, leave=False)
        
        for inputs, labels in t_trainloader:
            inputs = inputs.to(device)
            labels = labels.to(device)

            optimizer.zero_grad()

            with torch.set_grad_enabled(True):
                outputs = model(inputs)
                loss = criterion(outputs, labels)
                _, preds = torch.max(outputs, 1)

                loss.backward()
                optimizer.step()

            train_loss += loss.item() * inputs.size(0)
            train_corrects += torch.sum(preds == labels.data)
            n += 1
        train_loss /= len(trainloader.dataset)
        train_corrects = train_corrects.double() / len(trainloader.dataset)
        results_train.append(EpochProgress(epoch, train_loss, train_corrects.item()))

        results_train_df = pd.DataFrame(results_train, columns=['epoch', 'loss', 'accuracy'])
        results_train_df.to_csv(os.path.join(args.storage_path, f'results_train_{args.model}.csv'), index=True)

        val_loss = 0.0
        val_corrects = 0
        model.eval()
        t_validloader = tqdm(validloader, desc="Validation", position=2, leave=False)
        n = 0
        for inputs, labels in t_validloader:
            inputs = inputs.to(device, non_blocking=True)
            labels = labels.to(device, non_blocking=True)

            with torch.no_grad():
                outputs = model(inputs)
                loss = criterion(outputs, labels)
                _, preds = torch.max(outputs, 1)

            val_loss += loss.item() * inputs.size(0)
            val_corrects += torch.sum(preds == labels.data)
            n += 1

        val_loss /= len(validloader.dataset)
        val_acc = val_corrects.double() / len(validloader.dataset)

        print(f'Epoch {epoch}/{num_epochs} \t\t Training Loss: {train_loss:.5f}, Acc: {train_corrects.item():.5f}, Validation Loss: {val_loss:.5f}, Acc: {val_acc.item():.5f}')
        results_val.append(EpochProgress(epoch, val_loss, val_acc.item()))

        results_val_df = pd.DataFrame(results_val, columns=['epoch', 'loss', 'accuracy'])
        results_val_df.to_csv(os.path.join(args.storage_path, f'results_val_{args.model}.csv'), index=True)

        if best_val_loss is None or best_val_loss > val_loss:
            best_val_loss, best_val_epoch = val_loss, epoch
        if best_val_epoch < epoch - max_stagn:
            # nothing is improving for a while
            break

        if testloader is not None and (epoch == num_epochs - 1):
            results_test = test(testloader=testloader, model=model)
            print(f'Test Loss: {results_test["loss"].values[-1]:.5f}, Acc: {results_test["accuracy"].values[-1]:.5f}')

    return results_train_df, results_val_df

# ==========
# Evaluation
# ==========

def test(testloader, model):
    device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
    criterion = nn.CrossEntropyLoss()
    
    n = 0
    test_loss = 0.0
    test_corrects = 0
    model.eval()
    t_testloader = tqdm(testloader, desc="Test", position=1, leave=False)
    n = 0
    for inputs, labels in t_testloader:
        inputs = inputs.to(device, non_blocking=True)
        labels = labels.to(device, non_blocking=True)

        with torch.no_grad():
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            _, preds = torch.max(outputs, 1)

        test_loss += loss.item() * inputs.size(0)
        test_corrects += torch.sum(preds == labels.data)
        n += 1

    test_loss /= len(testloader.dataset)
    test_acc = test_corrects.double() / len(testloader.dataset)

    print(f'Test Loss: {test_loss:.5f}')

    return pd.DataFrame([[0, test_loss, test_acc.item()]], columns=['epoch', 'loss', 'accuracy'])

# ========
# Plotting
# ========

def plot_results(df, figsize=(10, 5)):
    fig, ax1 = plt.subplots(figsize=figsize)

    ax1.set_xlabel('epoch')
    ax1.set_ylabel('loss', color='tab:red')
    ax1.plot(df['epoch'], df['loss'], color='tab:red')

    ax2 = ax1.twinx()
    ax2.set_ylabel('accuracy', color='tab:blue')
    ax2.plot(df['epoch'], df['accuracy'], color='tab:blue')

    fig.tight_layout()

# =========
# Utilities
# =========

class CustomCompose(transforms.Compose):
        def __call__(self, img):
            for t in self.transforms:
                with torch.profiler.record_function(t.__class__.__name__):
                    img = t(img)
            return img

if __name__ == "__main__":

    parser = argparse.ArgumentParser(description='ImageNet Classification with PyTorch')
    parser.add_argument('--dataset', type=str, default='imagenet', choices=list(DATASET_CONFIGS.keys()), help='Dataset to use (e.g., ImageNet, CIFAR100, MNIST)')
    parser.add_argument('--num_epochs', type=int, default=1, help='Number of epochs to train')
    parser.add_argument('--batch_size', type=int, default=512, help='Batch size for training and validation')
    parser.add_argument('--learning_rate', type=float, default=0.0001, help='Learning rate for training and validation')
    parser.add_argument('--data_root', type=str, required=True, help='Root directory for ImageNet dataset')
    parser.add_argument('--model', type=str, default='resnet18', help='Model architecture to use (e.g., resnet18, resnet50, vgg16, etc.)')
    parser.add_argument('--pretrained', type=str, default='True', help='Use pretrained model weights')
    parser.add_argument('--device', type=str, default='cuda', help='Device to use for training (e.g., cuda, cpu)')
    parser.add_argument('--storage_path', type=str, default='./results', help='Path to store results and logs')
    parser.add_argument('--num_workers', type=int, default=0, help='Number of workers for data loading')
    parser.add_argument('--seed', type=int, default=37, help='Random seed for reproducibility')
    parser.add_argument('--prefetch_factor', type=int, default=2, help='Number of batches to prefetch')
    parser.add_argument('--max_stagnation', type=int, default=20, help='Maximum number of epochs without improvement')
    args = parser.parse_args()

    args.pretrained = args.pretrained.lower() == 'true'  # Convert string to boolean

    np.random.seed(args.seed)
    torch.manual_seed(args.seed)
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False

    if args.device.lower() == 'cuda' and not torch.cuda.is_available():
        raise RuntimeError("CUDA is not available. Please check your PyTorch installation or use CPU instead.")
    device = torch.device(args.device if torch.cuda.is_available() else 'cpu')
    print(f"Using device: {device}")

    EpochProgress = namedtuple('EpochProgress', 'epoch, loss, accuracy')

    num_classes = DATASET_CONFIGS[args.dataset]['num_classes']
    pretrained = True if args.pretrained else False  # Use pretrained weights if specified
    num_epochs = args.num_epochs
    batch_size = args.batch_size
    num_workers = args.num_workers  # For debugging purposes, set to 0 to avoid multiprocessing issues
    prefetch_factor = args.prefetch_factor  # Number of batches to prefetch
    data_root = args.data_root

    transform_train, transform_test = get_transforms(args.dataset)
    trainloader, validloader, testloader = get_dataloaders(args.dataset, data_root, transform_train, transform_test, batch_size, num_workers, args.seed)

    max_stagnation = args.max_stagnation # number of epochs without improvement to tolerate

    model = create_model(args.model, num_classes, pretrained=pretrained)

    from codecarbon import OfflineEmissionsTracker

    DIR_CARBON = os.path.join(args.storage_path,"codecarbon")
    os.makedirs(DIR_CARBON, exist_ok=True)
    tracker = OfflineEmissionsTracker(country_iso_code="FRA", output_dir=DIR_CARBON, output_file="emissions_train.csv", log_level="warning")
    tracker.start()
    results_train, results_val = train(trainloader=trainloader, validloader=validloader, model=model, num_epochs=num_epochs, seed=args.seed, testloader=testloader, lr=args.learning_rate, max_stagn=max_stagnation)
    tracker.stop()

    tracker = OfflineEmissionsTracker(country_iso_code="FRA", output_dir=DIR_CARBON, output_file="emissions_test.csv", log_level="warning")
    tracker.start()
    results_test = test(testloader=testloader, model=model, seed=args.seed)
    tracker.stop()

    # Save model checkpoint
    os.makedirs(os.path.join(args.storage_path, "model_checkpoints"), exist_ok=True)
    torch.save(model.state_dict(), os.path.join(args.storage_path, "model_checkpoints", f"{args.model}_checkpoint.pth"))

    results_train.to_csv(os.path.join(args.storage_path, f'results_train_{args.model}.csv'), index=True)
    results_val.to_csv(os.path.join(args.storage_path, f'results_val_{args.model}.csv'), index=True)
    results_test.to_csv(os.path.join(args.storage_path, f'results_test_{args.model}.csv'), index=True)