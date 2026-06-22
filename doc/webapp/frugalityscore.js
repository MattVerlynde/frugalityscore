/* ════════════════════════════════════════════════
   THEME
════════════════════════════════════════════════ */
let dark = false;
function toggleTheme() {
  dark = !dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  document.querySelector('.theme-toggle').textContent = dark ? '☀ Light' : '☽ Dark';
  refreshPlotlyTheme();
}

/* ════════════════════════════════════════════════
   DATA AVAILABLE
════════════════════════════════════════════════ */


const textCPU = `model,TDP,n_cores,TDP_per_core,Release_year,source
A8-7680,45,4,11.3,,https://www.techpowerup.com/cpu-specs/
A9-9425 SoC,15,2,7.5,,https://www.techpowerup.com/cpu-specs/
AMD 7552,200,48,4.2,,https://www.amd.com/system/files/documents/AMD-EPYC-7002-Series-Datasheet.pdf
AMD EPYC 7251,120,8,15.0,,https://www.amd.com/en/products/cpu/amd-epyc-7251
AMD EPYC 7343,190,16,11.9,,https://www.amd.com/en/products/cpu/amd-epyc-7343
AMD EPYC 7513,200,32,6.3,,https://www.amd.com/en/products/cpu/amd-epyc-7513
AMD EPYC 7642,225,48,4.7,,https://www.techpowerup.com/cpu-specs/epyc-7642.c2247
AMD EPYC 7763,280,64,4.4,,https://www.amd.com/en/products/cpu/amd-epyc-7763 
AMD EPYC 7773X,280,64,4.4,,https://www.amd.com/en/products/cpu/amd-epyc-7773x 
AMD EPYC 7H12,280,64,4.4,,https://www.amd.com/en/product/9131 
AMD EPYC 7V73X,280,64,4.4,,https://wccftech.com/amd-epyc-7v73x-cpu-with-3d-v-cache-tested-milan-x-offers-impressive-cache-latency-better-boost-clocks-versus-standard-milan/
Any,,,12.0,,
Athlon 3000G,35,2,17.5,,https://www.techpowerup.com/cpu-specs/
Core 2 Quad Q6600,95,4,23.8,,https://www.techpowerup.com/cpu-specs/
Core i3-10100,65,4,16.3,,https://www.techpowerup.com/cpu-specs/
Core i3-10300,62,4,15.5,,https://www.techpowerup.com/cpu-specs/
Core i3-10320,91,4,22.8,,https://www.techpowerup.com/cpu-specs/
Core i3-10350K,91,4,22.8,,https://www.techpowerup.com/cpu-specs/
Core i3-9100,65,4,16.3,,https://www.techpowerup.com/cpu-specs/
Core i3-9100F,65,4,16.3,,https://www.techpowerup.com/cpu-specs/
Core i5-10400,65,6,10.8,,https://www.techpowerup.com/cpu-specs/
Core i5-10400F,65,6,10.8,,https://www.techpowerup.com/cpu-specs/
Core i5-10500,65,6,10.8,,https://www.techpowerup.com/cpu-specs/
Core i5-10600,65,6,10.8,,https://www.techpowerup.com/cpu-specs/
Core i5-10600K,95,6,15.8,,https://www.techpowerup.com/cpu-specs/
Core i5-1145G7,28,4,7.0,,https://www.intel.co.uk/content/www/uk/en/products/sku/208660/intel-core-i51145g7-processor-8m-cache-up-to-4-40-ghz-with-ipu/specifications.html
Core i5-3570K,77,4,19.3,,https://www.techpowerup.com/cpu-specs/
Core i5-12600,65,6,10.8,,https://www.techpowerup.com/cpu-specs/
Core i5-4460,84,4,21.0,,https://ark.intel.com/content/www/us/en/ark/products/80817/intel-core-i5-4460-processor-6m-cache-up-to-3-40-ghz.html
Core i5-9400,65,6,10.8,,https://www.techpowerup.com/cpu-specs/
Core i5-9400F,65,6,10.8,,https://www.techpowerup.com/cpu-specs/
Core i5-9600KF,95,6,15.8,,https://www.techpowerup.com/cpu-specs/
Core i7-10700,65,8,8.1,,https://www.techpowerup.com/cpu-specs/
Core i7-10700K,125,8,15.6,,https://www.techpowerup.com/cpu-specs/
Core i7-4790,84,4,21.0,,https://www.intel.co.uk/content/www/uk/en/products/sku/80806/intel-core-i74790-processor-8m-cache-up-to-4-00-ghz/specifications.html
Core i7-4930K,130,6,21.7,,https://www.techpowerup.com/cpu-specs/
Core i7-6700K,95,4,23.8,,https://www.techpowerup.com/cpu-specs/
Core i7-8700K,95,6,15.8,,https://www.techpowerup.com/cpu-specs/
Core i7-9700F,65,8,8.1,,https://www.techpowerup.com/cpu-specs/
Core i7-9700K,95,8,11.9,,https://www.techpowerup.com/cpu-specs/
Core i9-10900K,125,10,12.5,,https://www.techpowerup.com/cpu-specs/
Core i9-10900KF,105,10,10.5,,https://www.techpowerup.com/cpu-specs/
Core i9-10900XE,165,10,16.5,,https://www.techpowerup.com/cpu-specs/
Core i9-10920XE,165,12,13.8,,https://www.techpowerup.com/cpu-specs/
Core i9-12900K,125,16,7.8,,https://ark.intel.com/content/www/us/en/ark/products/134599/intel-core-i912900k-processor-30m-cache-up-to-5-20-ghz.html
Core i9-9900K,95,8,11.9,,https://www.techpowerup.com/cpu-specs/
FX-6300,95,6,15.8,,https://www.techpowerup.com/cpu-specs/
FX-8350,125,8,15.6,,https://www.techpowerup.com/cpu-specs/
Rasberry Pi 4,6.4,4,1.6,,https://raspberrypi.stackexchange.com/questions/114239/pi-4-maximum-power-consumption 
Ryzen 3 2200G,65,4,16.3,,https://www.techpowerup.com/cpu-specs/
Ryzen 3 3200G,65,4,16.3,,https://www.techpowerup.com/cpu-specs/
Ryzen 3 3200U,15,2,7.5,,https://www.techpowerup.com/cpu-specs/
Ryzen 5 1600,65,6,10.8,,https://www.techpowerup.com/cpu-specs/
Ryzen 5 2600,65,6,10.8,,https://www.techpowerup.com/cpu-specs/
Ryzen 5 3400G,65,4,16.3,,https://www.techpowerup.com/cpu-specs/
Ryzen 5 3500U,15,4,3.8,,https://www.techpowerup.com/cpu-specs/
Ryzen 5 3600,65,6,10.8,,https://www.techpowerup.com/cpu-specs/
Ryzen 5 3600X,95,6,15.8,,https://www.techpowerup.com/cpu-specs/
Ryzen 7 2700X,105,8,13.1,,https://www.techpowerup.com/cpu-specs/
Ryzen 7 3700X,65,8,8.1,,https://www.techpowerup.com/cpu-specs/
Ryzen 7 3800X,105,8,13.1,,https://www.techpowerup.com/cpu-specs/
Ryzen 9 3900X,125,12,10.4,,https://www.techpowerup.com/cpu-specs/
Ryzen 9 3950X,105,16,6.6,,https://www.techpowerup.com/cpu-specs/
Ryzen Threadripper 2990WX,250,32,7.8,,https://www.techpowerup.com/cpu-specs/
Ryzen Threadripper 3990X,280,64,4.4,,https://www.techpowerup.com/cpu-specs/
Xeon E5-2650 v2,95,8,11.9,,https://www.techpowerup.com/cpu-specs/xeon-e5-2650-v2.c1661
Xeon E5-2660 v3,105,10,10.5,,https://ark.intel.com/content/www/us/en/ark/products/81706/intel-xeon-processor-e5-2660-v3-25m-cache-2-60-ghz.html
Xeon E5-2665,115,8,14.4,,https://ark.intel.com/content/www/us/en/ark/products/64597/intel-xeon-processor-e5-2665-20m-cache-2-40-ghz-8-00-gt-s-intel-qpi.html
Xeon E5-2670,115,8,14.4,,https://ark.intel.com/content/www/us/en/ark/products/64595/intel-xeon-processor-e5-2670-20m-cache-2-60-ghz-8-00-gt-s-intel-qpi.html
Xeon E5-2670 v2,115,10,11.5,,https://ark.intel.com/content/www/us/en/ark/products/75275/intel-xeon-processor-e5-2670-v2-25m-cache-2-50-ghz.html
Xeon E5-2680 v3,120,12,10.0,,https://www.intel.co.uk/content/www/uk/en/products/processors/xeon/e5-processors/e5-2680-v3.html
Xeon E5-2683 v4,120,16,7.5,,https://www.intel.co.uk/content/www/uk/en/products/processors/xeon/e5-processors/e5-2683-v4.html
Xeon E5-2690 v2,130,10,13.0,,https://ark.intel.com/content/www/us/en/ark/products/75279/intel-xeon-processor-e5-2690-v2-25m-cache-3-00-ghz.html
Xeon E5-2690 v3,135,12,11.3,,https://ark.intel.com/content/www/us/en/ark/products/81713/intel-xeon-processor-e5-2690-v3-30m-cache-2-60-ghz.html
Xeon E5-2695 v3,120,14,8.6,,https://www.techpowerup.com/cpu-specs/xeon-e5-2695-v3.c2894
Xeon E5-2695 v4,120,18,6.7,,https://ark.intel.com/content/www/us/en/ark/products/91316/intel-xeon-processor-e5-2695-v4-45m-cache-2-10-ghz.html
Xeon E5-2697 v4,145,18,8.1,,https://ark.intel.com/content/www/us/en/ark/products/91755/intel-xeon-processor-e5-2697-v4-45m-cache-2-30-ghz.html
Xeon E5-2699 v3,145,18,8.1,,https://ark.intel.com/content/www/us/en/ark/products/81061/intel-xeon-processor-e5-2699-v3-45m-cache-2-30-ghz.html
Xeon E5-2699 v4,145,22,6.6,,https://ark.intel.com/content/www/us/en/ark/products/91317/intel-xeon-processor-e5-2699-v4-55m-cache-2-20-ghz.html
Xeon E5-4610 v4,105,10,10.5,,https://ark.intel.com/content/www/us/en/ark/products/93812/intel-xeon-processor-e5-4610-v4-25m-cache-1-80-ghz.html
Xeon E5-4620,95,8,11.9,,https://ark.intel.com/content/www/us/en/ark/products/64607/intel-xeon-processor-e5-4620-16m-cache-2-20-ghz-7-20-gt-s-intel-qpi.html
Xeon E5-4650L,115,8,14.4,,https://ark.intel.com/content/www/us/en/ark/products/64606/intel-xeon-processor-e5-4650l-20m-cache-2-60-ghz-8-00-gt-s-intel-qpi.html
Xeon E7-4850 v2,105,12,8.8,,https://ark.intel.com/content/www/us/en/ark/products/75248/intel-xeon-processor-e7-4850-v2-24m-cache-2-30-ghz.html
Xeon E7-8867 v3,165,16,10.3,,https://ark.intel.com/content/www/us/en/ark/products/84681/intel-xeon-processor-e7-8867-v3-45m-cache-2-50-ghz.html
Xeon E7-8880 v4,150,22,6.8,,https://www.intel.co.uk/content/www/uk/en/products/processors/xeon/e7-processors/e7-8880-v4.html
Xeon Gold 6142,150,16,9.4,,https://ark.intel.com/content/www/us/en/ark/products/120487/intel-xeon-gold-6142-processor-22m-cache-2-60-ghz.html
Xeon Gold 6148,150,20,7.5,,https://ark.intel.com/content/www/us/en/ark/products/120489/intel-xeon-gold-6148-processor-27-5m-cache-2-40-ghz.html
Xeon Gold 6154,200,18,11.1,,https://www.intel.fr/content/www/fr/fr/products/sku/120495/intel-xeon-gold-6154-processor-24-75m-cache-3-00-ghz/specifications.html
Xeon Gold 6248,150,20,7.5,,https://ark.intel.com/content/www/us/en/ark/products/192446/intel-xeon-gold-6248-processor-27-5m-cache-2-50-ghz.html
Xeon Gold 6252,150,24,6.3,,https://ark.intel.com/content/www/us/en/ark/products/192447/intel-xeon-gold-6252-processor-35-75m-cache-2-10-ghz.html
Xeon L5640 ,60,6,10.0,,https://ark.intel.com/content/www/us/en/ark/products/47926/intel-xeon-processor-l5640-12m-cache-2-26-ghz-5-86-gt-s-intel-qpi.html
Xeon Phi 5110P,225,60,3.8,,https://ark.intel.com/content/www/us/en/ark/products/71992/intel-xeon-phi-coprocessor-5110p-8gb-1-053-ghz-60-core.html
Xeon Platinum 8260,165,24,6.9,,https://www.intel.com/content/www/us/en/products/sku/192474/intel-xeon-platinum-8260-processor-35-75m-cache-2-40-ghz/specifications.html
Xeon Platinum 8268,205,24,8.5,,https://www.intel.com/content/www/us/en/products/sku/192481/intel-xeon-platinum-8268-processor-35-75m-cache-2-90-ghz/specifications.html
Xeon Platinum 9282,400,56,7.1,,https://www.techpowerup.com/cpu-specs/
Xeon X3430,95,4,23.8,,https://ark.intel.com/content/www/us/en/ark/products/42927/intel-xeon-processor-x3430-8m-cache-2-40-ghz.html
Xeon X5660,95,6,15.8,,https://ark.intel.com/content/www/us/en/ark/products/47921/intel-xeon-processor-x5660-12m-cache-2-80-ghz-6-40-gt-s-intel-qpi.html`;

const textGPU = `model,TDP,n_cores,TDP_per_core,Release_year,source
AMD RX480,150,,150,,techpowerup.com
Any,200,1,200,,
NVIDIA A100 40GB PCIe,250,,250,,https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/a100/pdf/a100-80gb-datasheet-update-nvidia-us-1521051-r2-web.pdf
NVIDIA A100 80GB PCIe,300,,300,,https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/a100/pdf/PB-10577-001_v02.pdf 
NVIDIA GTX 1080,180,,180,,techpowerup.com
NVIDIA GTX 1080 Ti,250,,250,,techpowerup.com
NVIDIA GTX TITAN X,250,,250,,techpowerup.com
NVIDIA Jetson AGX Xavier,30,,30,,https://www.techpowerup.com/gpu-specs/jetson-agx-xavier.c3232
NVIDIA RTX 2080,215,,215,,techpowerup.com
NVIDIA RTX 2080 Ti,250,,250,,techpowerup.com
NVIDIA RTX 4500 Ada Generation,210,,210,,techpowerup.com
NVIDIA Tesla K80,300,,300,,https://www.techpowerup.com/gpu-specs/tesla-k80.c2616
NVIDIA Tesla P100,250,,250,,https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/tesla-p100/pdf/nvidia-tesla-p100-PCIe-datasheet.pdf
NVIDIA Tesla P100 PCIe,250,,250,,techpowerup.com
NVIDIA Tesla P4,75,,75,,https://www.techpowerup.com/gpu-specs/tesla-p4.c2879
NVIDIA Tesla T4,70,,70,,https://www.techpowerup.com/gpu-specs/tesla-t4.c3316
NVIDIA Tesla V100,300,,300,,techpowerup.com
NVIDIA Tesla V100S,250,,250,,https://technical.city/en/video/Tesla-V100S-PCIe-32-GB
NVIDIA Titan V,250,,250,,techpowerup.com
NVIDIA TITAN X Pascal,250,,250,,techpowerup.com
TPU v2,280,,280,,http://arxiv.org/abs/2104.10350 
TPU v3,220,,220,,https://cloud.google.com/tpu/docs/v3
TPU v4,170,,170,,https://cloud.google.com/tpu/docs/system-architecture-tpu-vm`;

const performanceData = {
  "performance_functions": {
    "accuracy": ["trimf", "trimf", "trimf"],
    "precision": ["trimf", "trimf", "trimf"],
    "recall": ["trimf", "trimf", "trimf"],
    "f1": ["trimf", "trimf", "trimf"],
    "auc": ["trapmf", "trimf", "trimf"],
    "rand": ["trimf", "trimf", "trimf"],
    "adjusted_rand": ["trimf", "trimf", "trimf"],
    "silhouette": ["trapmf", "trimf", "trimf"],
    "calinski_harabasz": ["trapmf", "trimf", "trapmf"],
    "davies_bouldin": ["trapmf", "trimf", "trapmf"]
  },
  "performance_names": {
    "accuracy": "Accuracy",
    "precision": "Precision",
    "recall": "Recall",
    "f1": "F1-Score",
    "auc": "AUC",
    "rand": "Rand Index",
    "adjusted_rand": "Adjusted Rand Index",
    "silhouette": "Silhouette Score",
    "calinski_harabasz": "Calinski-Harabasz Index",
    "davies_bouldin": "Davies-Bouldin Index"
  },
  "performance_params": {
    "accuracy": [[0, 0, 0.5], [0, 0.5, 1], [0.5, 1, 1]],
    "precision": [[0, 0, 0.5], [0, 0.5, 1], [0.5, 1, 1]],
    "recall": [[0, 0, 0.5], [0, 0.5, 1], [0.5, 1, 1]],
    "f1": [[0, 0, 0.5], [0, 0.5, 1], [0.5, 1, 1]],
    "auc": [[0, 0, 0.5, 0.75], [0.5, 0.75, 1], [0.75, 1, 1]],
    "rand": [[0, 0, 0.5], [0, 0.5, 1], [0.5, 1, 1]],
    "adjusted_rand": [[0, 0, 0.5], [0, 0.5, 1], [0.5, 1, 1]],
    "silhouette": [[-1, -1, 0, 0.5], [0, 0.5, 1], [0.5, 1, 1]],
    "calinski_harabasz": [[0, 0, 1, 5], [1, 5, 10], [5, 10, 100, 100]],
    "davies_bouldin": [[5, 10, 100, 100], [1, 5, 10], [0, 0, 1, 5]]
  },
  "performance_minmax": {
    "accuracy": [0, 1],
    "precision": [0, 1],
    "recall": [0, 1],
    "f1": [0, 1],
    "auc": [0, 1],
    "rand": [0, 1],
    "adjusted_rand": [0, 1],
    "silhouette": [-1, 1],
    "calinski_harabasz": [0, 100],
    "davies_bouldin": [0, 100]
  }
};

const DataCIFARfalse = `energyTrain,energyTest,perf,group
1849382.0078703242,4389.49398322476,0.5158,VGG16 BatchNorm
1060968.230470261,3686.29431713568,0.3201,VGG16
1804428.8759520764,4360.00594214556,0.4976,VGG16 BatchNorm
1100233.9075990154,3714.18366493656,0.3161,VGG16
1702790.0457739448,4377.05614161396,0.4667,VGG16 BatchNorm
1060695.4949691624,3723.4671943276803,0.3177,VGG16
1100357.285936012,3683.7213468678,0.3055,VGG16
1753663.0799506796,4352.58917687016,0.4945,VGG16 BatchNorm
1099288.3071147224,3709.99750132764,0.3047,VGG16
1852884.7241063481,4373.74524544596,0.4828,VGG16 BatchNorm
1100335.9629514515,3702.2274705186,0.3114,VGG16
1754335.833847925,4366.44794387376,0.5008,VGG16 BatchNorm
1061498.13999274,3707.5834748095203,0.3191,VGG16
1804522.759721254,4370.38637633784,0.5037,VGG16 BatchNorm
1101718.8109125586,3673.60464975048,0.3351,VGG16
1703295.445902354,4353.05716052112,0.4717,VGG16 BatchNorm
1058170.5356629745,3715.1961424556403,0.3186,VGG16
1603035.6563977585,4377.87009476568,0.5051,VGG16 BatchNorm
247830.58626888276,783.28030048164,0.3492,ResNet18
493853.1476878152,1070.2992421548001,0.3395,MobileNet V2
264574.9501309285,770.7231225532801,0.2941,ResNet18
494041.4691266293,1079.3983825512,0.3353,MobileNet V2
582843.5727558808,1319.70626664624,0.366,EfficientNet B0
133326.6155790757,357.17262963484825,0.2649,ShuffleNet V2
888352.2545443376,994.7371629056399,0.4216,SqueezeNet V1
565613.7671147789,1321.9020921168,0.3839,EfficientNet B0
239224.1800992588,802.82001812148,0.3115,ResNet18
493947.61695152323,1082.119089825,0.3349,MobileNet V2
582388.78318696,1317.97979226036,0.3773,EfficientNet B0
126861.56263674685,364.95602787384,0.2671,ShuffleNet V2
826641.3197379848,998.3369022548399,0.4024,SqueezeNet V1
140281.143761862,347.91789022851873,0.265,ShuffleNet V2
272527.09959788894,792.66448624284,0.4097,ResNet18
506319.32374703314,1062.63675787176,0.3299,MobileNet V2
565286.3794218748,1306.62067840308,0.3719,EfficientNet B0
140925.36130927777,335.33153952150275,0.27,ShuffleNet V2
764241.7144818135,1000.58011742304,0.4087,SqueezeNet V1
845784.3869854783,1004.1950633655599,0.4114,SqueezeNet V1
255586.56733289768,783.63565518348,0.4008,ResNet18
480552.13998468214,1054.45287916956,0.3333,MobileNet V2
599244.7792428154,1315.07624615688,0.3719,EfficientNet B0
143560.70732386512,337.7107665940398,0.269,ShuffleNet V2
737348.6584105052,990.0168832263599,0.4082,SqueezeNet V1
238981.58187873085,785.12807684196,0.4045,ResNet18
505854.10978719336,1065.01880099808,0.3296,MobileNet V2
565162.4335154382,1294.79131739412,0.3573,EfficientNet B0
135415.8466037147,342.0652826958728,0.2593,ShuffleNet V2
239256.58095428074,792.75928695408,0.4045,ResNet18
506339.0649966729,1065.9466251144,0.3296,MobileNet V2
240039.11355065028,798.74970620724,0.3764,ResNet18
456399.53368688014,1073.94918517152,0.3229,MobileNet V2
565435.147359092,1301.19412612464,0.3695,EfficientNet B0
130712.27631255864,351.5010269943134,0.2558,ShuffleNet V2
844719.3612333777,1010.18143681812,0.4052,SqueezeNet V1
566694.1134053741,1303.26298356708,0.3573,EfficientNet B0
248378.50482612013,783.31114940328,0.379,ResNet18
493803.95901230234,1065.2529946985999,0.3598,MobileNet V2
565886.3664299947,1325.08641982572,0.3662,EfficientNet B0
142845.2743720284,351.3320025613858,0.2665,ShuffleNet V2
793350.6569563198,997.90324585524,0.4079,SqueezeNet V1
135850.25418741468,350.9277189316723,0.2593,ShuffleNet V2
248310.66250739197,785.9275653265199,0.3889,ResNet18
494055.82140711654,1063.70454854376,0.3325,MobileNet V2
582970.1352996432,1311.70499559504,0.386,EfficientNet B0
140450.43914923753,357.49800992059386,0.2614,ShuffleNet V2
896985.1936350116,997.03837135332,0.3946,SqueezeNet V1
810763.1617894132,1010.8430439267601,0.4159,SqueezeNet V1`;

const MetadataCIFARfalse = {
  "data": DataCIFARfalse,
  "mode": "ML",
  "groupname": "Classifier",
  "cpu": "Core i5-12600",
  "cpupower": 10.8333333333333,
  "ncpu": 6,
  "gpu": "NVIDIA RTX 4500 Ada Generation",
  "gpupower": 210,
  "ngpu": 1,
  "metric": "accuracy",
  "energy_low_train": 0,
  "energy_medium_train": 300,
  "energy_high_train": 3600,
  "energy_low_test": 0,
  "energy_medium_test": 30,
  "energy_high_test": 60,
};

const DataCIFARtrue = `energyTrain,energyTest,perf,group
3683090.8602425996,4355.55619187256,0.4812,VGG16 BatchNorm
2835079.200368016,3705.5923559056796,0.6147,VGG16
3934330.550387462,4370.25595571892,0.4754,VGG16 BatchNorm
2797042.2768304036,3703.1498837287204,0.6142000000000001,VGG16
4387598.617037909,4351.3072852176,0.4801,VGG16 BatchNorm
3096123.5307828803,3699.4757903982004,0.6199,VGG16
4272296.069246343,4347.21600660672,0.4751,VGG16 BatchNorm
2464782.1314870436,3711.13470347364,0.6189,VGG16
3027960.7975972835,4377.83132345976,0.4745,VGG16 BatchNorm
2579453.4682978354,3695.9449434649205,0.6158,VGG16
3119406.9348748513,4350.30129691812,0.4805,VGG16 BatchNorm
2501659.0269615003,3723.6111732216,0.6193000000000001,VGG16
2282324.823434445,3730.4996344070396,0.614,VGG16
4887670.140769832,4383.40759659576,0.4812,VGG16 BatchNorm
2634102.9999908735,3730.7575547733604,0.6145,VGG16
3542766.096773361,4349.06829649476,0.4789,VGG16 BatchNorm
2814231.5276132533,3740.76962873676,0.6151,VGG16
4000158.752876093,4365.184089551761,0.4761,VGG16 BatchNorm
222776.8640859654,779.29788231972,0.6900000000000001,ResNet18
355933.42018678045,1083.82717004796,0.6509,MobileNet V2
239687.74999866422,776.15773776,0.6733,ResNet18
343204.16314308083,1057.3007815749602,0.6604,MobileNet V2
466512.98567615816,1316.61112991472,0.7922,EfficientNet B0
118160.11178530345,361.96831311264003,0.5664,ShuffleNet V2
334146.48632490746,998.61823159704,0.6016,SqueezeNet V1
231465.3886968433,778.14166236984,0.6732,ResNet18
356287.42259861255,1065.67970622228,0.6643,MobileNet V2
451017.4914853488,1314.4091382511199,0.7917000000000001,EfficientNet B0
120868.50587589649,358.7501779084823,0.5731,ShuffleNet V2
334751.28872126184,1008.1431010814399,0.6035,SqueezeNet V1
449937.07280557347,1308.27363565536,0.7923,EfficientNet B0
112158.26670589487,369.08071948476,0.5680000000000001,ShuffleNet V2
342772.73126272514,995.8495180478401,0.6042000000000001,SqueezeNet V1
231652.67579152776,781.83884863908,0.6764,ResNet18
356332.55819842184,1090.55274070896,0.6463,MobileNet V2
450275.76983724016,1299.36367934028,0.7938000000000001,EfficientNet B0
118738.87661067552,363.39949143792,0.5711,ShuffleNet V2
324967.3914060396,1013.1125761375199,0.6,SqueezeNet V1
248282.42779235268,780.90599724516,0.6799000000000001,ResNet18
356302.5118110083,1073.80879537932,0.6478,MobileNet V2
467521.33257752936,1310.03136132156,0.7927000000000001,EfficientNet B0
119969.53535807245,348.3402886237329,0.5713,ShuffleNet V2
325452.34524329746,991.1894309031601,0.5962000000000001,SqueezeNet V1
256384.9434724902,779.3525725383599,0.6871,ResNet18
344335.35277907713,1062.60441432156,0.6497,MobileNet V2
450230.5783669474,1326.3821254299598,0.7946000000000001,EfficientNet B0
120074.69558994733,352.2939052291619,0.5582,ShuffleNet V2
315914.7830046426,989.47959451308,0.6079,SqueezeNet V1
239821.61841344516,783.91126647936,0.6627000000000001,ResNet18
356394.3425367134,1080.9075200454001,0.65,MobileNet V2
450055.4550354198,1303.61380791732,0.7971,EfficientNet B0
115266.16791639107,351.0033879535409,0.5713,ShuffleNet V2
351539.1296669034,1010.38811314752,0.5870000000000001,SqueezeNet V1
231715.80778439736,785.89816779672,0.599,ResNet18
343460.0067068779,1078.40984514444,0.6573,MobileNet V2
449687.61188917165,1307.49097269816,0.7935,EfficientNet B0
112722.4485423162,364.16387480004,0.5750000000000001,ShuffleNet V2
351076.19880082604,996.9407719117199,0.5985,SqueezeNet V1`;

const MetadataCIFARtrue = {
  "data": DataCIFARtrue,
  "mode": "ML",
  "groupname": "Classifier",
  "cpu": "Core i5-12600",
  "cpupower": 10.8333333333333,
  "ncpu": 6,
  "gpu": "NVIDIA RTX 4500 Ada Generation",
  "gpupower": 210,
  "ngpu": 1,
  "metric": "accuracy",
  "energy_low_train": 0,
  "energy_medium_train": 300,
  "energy_high_train": 3600,
  "energy_low_test": 0,
  "energy_medium_test": 30,
  "energy_high_test": 60,
};

const DataMNIST = `energyTrain,energyTest,perf,group
697.4842106364379,6.984688008788069,0.6747,Decision Tree
697.861115285235,6.645939613201962,0.6747,Decision Tree
703.6783253210028,6.356525343290191,0.6747,Decision Tree
727.1223153935366,7.9549372795238416,0.6747,Decision Tree
746.537568613691,6.481071079663701,0.6747,Decision Tree
690.0223871350203,6.032816731236511,0.6747,Decision Tree
696.13906484046,6.1926570806939925,0.6747,Decision Tree
700.7098121415303,6.208689459947872,0.6747,Decision Tree
686.8568770703622,6.077310120611015,0.6747,Decision Tree
685.93953611753,6.064114330530908,0.6747,Decision Tree
692.0929457276019,6.015102921475162,0.6747,Decision Tree
693.0528205071632,6.007662198078024,0.6747,Decision Tree
697.8788034882105,9.957522727856814,0.6747,Decision Tree
682.1572887857432,6.123408225913137,0.6747,Decision Tree
711.9935060002908,10.143132181879484,0.6747,Decision Tree
692.8036177459895,8.889644744937776,0.6747,Decision Tree
706.4827233900648,7.174499053139767,0.6747,Decision Tree
698.6405720926633,10.44156610596184,0.6747,Decision Tree
687.5533210444247,7.472185242827872,0.6747,Decision Tree
706.4568324123468,10.25110913710966,0.6747,Decision Tree
717.6116441419487,10.663518100864572,0.6747,Decision Tree
699.9894651435777,9.205867863251184,0.6747,Decision Tree
678.2608767987962,9.518632727072973,0.6747,Decision Tree
682.2264842278421,7.324674210873034,0.6747,Decision Tree
718.4644348757029,10.27881579236208,0.6747,Decision Tree
706.3010036404341,10.496470396162618,0.6747,Decision Tree
722.7345526013024,8.714693389688536,0.6747,Decision Tree
711.4585065351987,7.162934440564684,0.6747,Decision Tree
706.5847652512841,6.572131424476048,0.6747,Decision Tree
675.1252074929708,6.714947228079349,0.6747,Decision Tree
99.48797006914094,11.693053241371048,0.6233,Random Forest
101.39284042624652,9.53178489745812,0.6233,Random Forest
106.3921889179629,11.322013712507168,0.6233,Random Forest
102.79997715256444,9.218999669597142,0.6233,Random Forest
101.90360740245478,11.652904729662678,0.6233,Random Forest
100.92229286618722,10.41234138823635,0.6233,Random Forest
114.84370875328334,10.562279261372296,0.6233,Random Forest
104.43817012730524,8.943851985304743,0.6233,Random Forest
104.6873994263806,12.977733607185742,0.6233,Random Forest
116.3157389475204,10.179120802687793,0.6233,Random Forest
101.00268604257442,8.166243131708196,0.6233,Random Forest
102.82598825027802,7.92537560272149,0.6233,Random Forest
99.3161723263054,12.136881508790214,0.6233,Random Forest
109.18648437374884,8.363399034760512,0.6233,Random Forest
123.8362068796528,8.484424795019455,0.6233,Random Forest
105.07991734470258,8.13184019596963,0.6233,Random Forest
100.65055730709516,11.286720883764202,0.6233,Random Forest
104.10614826811144,10.507072813591655,0.6233,Random Forest
100.80324781463348,11.85852585814073,0.6233,Random Forest
102.34659852119802,10.97187179164082,0.6233,Random Forest
112.43000959488636,10.640904486924274,0.6233,Random Forest
98.67269109957974,10.674359732484294,0.6233,Random Forest
103.18561781769668,7.869481196478382,0.6233,Random Forest
99.97162630249778,8.285305871015838,0.6233,Random Forest
98.20884294178352,8.122264145957802,0.6233,Random Forest
98.33724577666244,8.052545752815949,0.6233,Random Forest
102.0134275380498,8.045014982242074,0.6233,Random Forest
102.19070760439487,10.938897524903444,0.6233,Random Forest
102.81810510610714,11.02031699523811,0.6233,Random Forest
98.48621569718428,10.1492997779597,0.6233,Random Forest
7710.658769376966,76.01388674528494,0.5756,AdaBoost
7651.638891012722,74.32532468884087,0.5756,AdaBoost
7584.712480310743,79.37733746814011,0.5756,AdaBoost
7551.567741451628,72.38771488714991,0.5756,AdaBoost
7645.038248582579,74.04785908469596,0.5756,AdaBoost
7650.943072561215,80.48754297702122,0.5756,AdaBoost
7790.95381482238,74.1069729333376,0.5756,AdaBoost
7633.396543740602,75.42516907171549,0.5756,AdaBoost
7621.797245953386,78.89854665787176,0.5756,AdaBoost
7634.950509912041,79.9386345084286,0.5756,AdaBoost
7692.720012762235,92.48984320981134,0.5756,AdaBoost
7749.145102041388,78.1821620267989,0.5756,AdaBoost
7687.353073568383,77.32646522651876,0.5756,AdaBoost
7746.869637369756,72.45846773365525,0.5756,AdaBoost
7723.691144143842,80.1777836293445,0.5756,AdaBoost
7703.831988795122,73.15988146123722,0.5756,AdaBoost
7697.971066892309,87.49337523108332,0.5756,AdaBoost
7773.526110693417,75.65456198790655,0.5756,AdaBoost
7739.047817439527,85.1457942631723,0.5756,AdaBoost
7714.309128255902,81.57762939991868,0.5756,AdaBoost
7787.020837701429,75.70847841067665,0.5756,AdaBoost
7725.027780137423,75.03978570009252,0.5756,AdaBoost
7630.384605467524,72.58804978015011,0.5756,AdaBoost
7743.684754883473,75.63013490442475,0.5756,AdaBoost
7621.000798333429,71.05129342621495,0.5756,AdaBoost
7691.704641825608,73.8178714144842,0.5756,AdaBoost
7702.617764761841,71.22945076328611,0.5756,AdaBoost
7718.376815074318,71.64251264366922,0.5756,AdaBoost
7631.708084789923,73.67188676056085,0.5756,AdaBoost
7658.719884947212,78.90784382996489,0.5756,AdaBoost
145.99760070794235,65.13307597545035,0.524,Naive Bayes
145.41732970420335,67.3680380618252,0.524,Naive Bayes
143.43412790839454,66.6451233641016,0.524,Naive Bayes
145.97660299795382,65.88506633734688,0.524,Naive Bayes
142.1647872572309,64.29680735801712,0.524,Naive Bayes
143.81978316870283,67.26534916455418,0.524,Naive Bayes
188.8873926054842,83.64490274572418,0.524,Naive Bayes
152.04085208595876,63.257789256494206,0.524,Naive Bayes
142.4439763100345,64.69852293412455,0.524,Naive Bayes
144.75784260035144,65.44292996674776,0.524,Naive Bayes
147.7042869930986,67.79608187561647,0.524,Naive Bayes
152.77312910887667,66.05529146461794,0.524,Naive Bayes
142.8792043762361,104.4333131444767,0.524,Naive Bayes
160.51580885028636,68.62046046749937,0.524,Naive Bayes
145.4101340700492,64.07695851482494,0.524,Naive Bayes
143.84380592438453,65.55453463659144,0.524,Naive Bayes
143.23912849445395,66.11385240306954,0.524,Naive Bayes
142.89033314288403,70.3778100143749,0.524,Naive Bayes
142.41428260550074,65.65755993298407,0.524,Naive Bayes
142.32023020418922,68.34018789722678,0.524,Naive Bayes
143.53045358887985,64.3957417876957,0.524,Naive Bayes
144.0744073887557,63.09405076294265,0.524,Naive Bayes
145.8100539786701,63.28225903461869,0.524,Naive Bayes
147.32090065663067,90.01601277621656,0.524,Naive Bayes
149.62383445754395,67.42098573379303,0.524,Naive Bayes
144.0902802051515,67.8063230549251,0.524,Naive Bayes
147.2073027100528,69.81829403098524,0.524,Naive Bayes
149.60515283001578,68.1677086287077,0.524,Naive Bayes
145.62120980454935,65.96212368908108,0.524,Naive Bayes
144.9264880220687,64.57472043734955,0.524,Naive Bayes
6648.966860345978,249.97621339774656,0.5369,QDA
7181.169235510921,237.3561913311102,0.5369,QDA
4982.079383418793,271.4287489129149,0.5369,QDA
5944.997637667007,258.3712015081732,0.5369,QDA
5903.407667894867,260.26581205295616,0.5369,QDA
6956.244568714387,252.24847088723817,0.5369,QDA
6245.635868566393,310.7473537790904,0.5369,QDA
8014.253610488005,282.8881723553831,0.5369,QDA
7522.354955492081,262.5162817313048,0.5369,QDA
7437.237040009794,265.8536830419709,0.5369,QDA
5469.853499277603,256.9446078883972,0.5369,QDA
5883.784363729665,258.67917651369845,0.5369,QDA
5442.891818956335,244.74788955419797,0.5369,QDA
5726.383362627763,239.94648814970716,0.5369,QDA
5392.785987516124,237.54979562318863,0.5369,QDA
6348.741448130544,240.64195227945572,0.5369,QDA
5608.850242871063,249.8064130927515,0.5369,QDA
5981.95874082254,252.68898734104076,0.5369,QDA
5483.723064603242,242.69578563774735,0.5369,QDA
7308.512300028707,249.00380964162295,0.5369,QDA
4913.5868889895655,237.3247806758571,0.5369,QDA
5394.605683424736,296.5363052360895,0.5369,QDA
6344.383627972962,244.63710728378308,0.5369,QDA
7793.402256182743,275.3688372022844,0.5369,QDA
5713.35379358401,245.5959166830193,0.5369,QDA
5696.34342222217,242.75421442144497,0.5369,QDA
5008.987657113878,316.5369621257104,0.5369,QDA
5652.569361421257,276.53304137218754,0.5369,QDA
6679.222307941613,285.6579417226942,0.5369,QDA
6136.406492243705,285.91076284212977,0.5369,QDA
83.13030112462613,889.3228075380712,0.9452,Nearest Neighbors
85.91044825919347,915.7807758407788,0.9452,Nearest Neighbors
86.11003655616618,922.2799627894271,0.9452,Nearest Neighbors
101.56420150459934,917.0110427493976,0.9452,Nearest Neighbors
86.47599375257053,893.3778037575286,0.9452,Nearest Neighbors
78.95084946593883,902.1553434215856,0.9452,Nearest Neighbors
79.70867547657909,888.0861336351386,0.9452,Nearest Neighbors
80.00137614095661,920.6210133801555,0.9452,Nearest Neighbors
84.49761374736403,894.8764871938672,0.9452,Nearest Neighbors
82.08104539023432,912.6288192932416,0.9452,Nearest Neighbors
104.4307141754212,887.4160347030676,0.9452,Nearest Neighbors
83.59629247881712,906.4628485020836,0.9452,Nearest Neighbors
81.26079902314396,892.2588631409152,0.9452,Nearest Neighbors
79.53112626615382,901.7069499547766,0.9452,Nearest Neighbors
80.05753029687006,916.085207898206,0.9452,Nearest Neighbors
78.56048028235247,897.64279070026,0.9452,Nearest Neighbors
78.72121461130068,893.7861702089676,0.9452,Nearest Neighbors
78.9278529305648,902.2557229287734,0.9452,Nearest Neighbors
81.55578494464295,925.4387498847324,0.9452,Nearest Neighbors
85.99288099148013,959.519358540149,0.9452,Nearest Neighbors
78.49802915259065,913.8592499080156,0.9452,Nearest Neighbors
78.83487974273032,925.9361308080984,0.9452,Nearest Neighbors
81.19257095078108,884.0310468739154,0.9452,Nearest Neighbors
84.69449359516985,899.2328028088115,0.9452,Nearest Neighbors
84.33869906433016,925.488002587991,0.9452,Nearest Neighbors
79.2805601657366,877.9691949183997,0.9452,Nearest Neighbors
78.97617612644036,877.5170930066379,0.9452,Nearest Neighbors
78.11561137319232,902.616130444524,0.9452,Nearest Neighbors
78.76374582658131,873.1919424599536,0.9452,Nearest Neighbors
85.89216967178582,907.292797246204,0.9452,Nearest Neighbors
27609.42570349987,6308.627248199561,0.9435,Linear SVM
27704.587008188624,6242.747113614198,0.9435,Linear SVM
27608.611448883905,6323.263304044818,0.9435,Linear SVM
27757.09165833496,6368.718210959985,0.9435,Linear SVM
27610.157313849224,6094.700406245302,0.9435,Linear SVM
27498.239704522715,5942.054076593095,0.9435,Linear SVM
27501.65954871307,6136.272699779149,0.9435,Linear SVM
27539.73757185911,6294.116743337012,0.9435,Linear SVM
27807.95582155696,6106.36734668493,0.9435,Linear SVM
27697.196723202484,6178.098297609984,0.9435,Linear SVM
27531.1094036464,6249.621518163224,0.9435,Linear SVM
27494.898626907165,6251.0363797821565,0.9435,Linear SVM
27543.776589611058,5920.434922586284,0.9435,Linear SVM
28458.74004427326,6489.379234728197,0.9435,Linear SVM
27615.303066242523,6050.489938571463,0.9435,Linear SVM
27786.021529080645,6375.529128630797,0.9435,Linear SVM
27711.47432166363,6164.490994797007,0.9435,Linear SVM
27970.90451612831,6370.421500766197,0.9435,Linear SVM
27498.682307340227,6531.040984312865,0.9435,Linear SVM
27715.55262383085,6480.597471623347,0.9435,Linear SVM
27668.488832475497,6112.725249847266,0.9435,Linear SVM
27581.33568800922,6338.444393310754,0.9435,Linear SVM
29494.075623354165,6244.129576842259,0.9435,Linear SVM
27797.0190721507,6156.789853860591,0.9435,Linear SVM
27780.71548502955,6227.633875182813,0.9435,Linear SVM
27961.57834553936,6299.0962202964665,0.9435,Linear SVM
27518.75745043622,6257.163592874637,0.9435,Linear SVM
27650.805272091475,6049.733863972959,0.9435,Linear SVM
27796.78486807637,6405.943186643457,0.9435,Linear SVM
27559.54291074048,6454.647837822089,0.9435,Linear SVM`;

const MetadataMNIST = {
  "data": DataMNIST,
  "mode": "ML",
  "groupname": "Classifier",
  "cpu": "Core i5-12600",
  "cpupower": 10.8333333333333,
  "ncpu": 6,
  "gpu": "NVIDIA RTX 4500 Ada Generation",
  "gpupower": 210,
  "ngpu": 1,
  "metric": "accuracy",
  "energy_low_train": 0,
  "energy_medium_train": 5,
  "energy_high_train": 60,
  "energy_low_test": 0,
  "energy_medium_test": 5,
  "energy_high_test": 60,
};

const DataImageNet = `energyTrain,energyTest,perf,group
52133711.13480804,7768.767263054915,0.6717000000000001,ResNet18
319042726.2362583,16943.01,0.71164,VGG16
66008751.47348884,7290.184629180399,0.5521600000000001,SqueezeNet V1
29026127.60779571,4860.6855939274765,0.50026,ShuffleNet V2
93482970.5914604,6182.219077331169,0.6632600000000001,MobileNet V2
118497814.20445102,7051.974840372971,0.7076800000000001,EfficientNet B0`;

const MetadataImageNet = {
  "data": DataImageNet,
  "mode": "ML",
  "groupname": "Classifier",
  "cpu": "Core i5-12600",
  "cpupower": 10.8333333333333,
  "ncpu": 6,
  "gpu": "NVIDIA RTX 4500 Ada Generation",
  "gpupower": 210,
  "ngpu": 1,
  "metric": "accuracy",
  "energy_low_train": 0,
  "energy_medium_train": 23760000,
  "energy_high_train": 71280000,
  "energy_low_test": 0,
  "energy_medium_test": 10,
  "energy_high_test": 30,
};

const DataBUTTERE = `energyTrain,perf,group
2008073.25,0.80125,03
2132669.25,0.78114283,04
2149670.5,0.74496424,05
2107848.0,0.63767856,06
2357331.25,0.11117858,14
2541300.0,0.11235714,18
2695465.25,0.1125,20`;

const MetadataBUTTERE = {
  "data": DataBUTTERE,
  "mode": "Non ML",
  "groupname": "Model depth",
  "cpu": "Xeon Gold 6154",
  "cpupower": 11.1,
  "ncpu": 36,
  "gpu": "NVIDIA Tesla P100 PCIe",
  "gpupower": 250,
  "ngpu": 2,
  "metric": "accuracy",
  "energy_low_train": 0,
  "energy_medium_train": 3600,
  "energy_high_train": 10800,
};

/* ════════════════════════════════════════════════
   DATA LOADING
════════════════════════════════════════════════ */
let text = "";
async function loadPerformanceData() {
  const metricSelect = document.getElementById("metric");
  Object.keys(performanceData.performance_minmax).forEach((metric, index) => {
    const option = document.createElement("option");
    option.value = metric; option.textContent = performanceData.performance_names[metric];
    if (index === 0) option.selected = true;
    metricSelect.appendChild(option);
  });
}

async function loadCPUs() {
  text = textCPU;
  const lines = text.split(/\r?\n/).slice(1);
  const sel = document.getElementById("cpu-select");
  const def = document.createElement("option");
  def.value='DEFAULT'; def.textContent='DEFAULT'; def.dataset.TDP_per_core=6; def.selected=true;
  sel.appendChild(def);
  lines.forEach(line => {
    if (!line.trim()) return;
    const cols = line.split(',');
    const opt = document.createElement("option");
    opt.value = cols[0]; opt.textContent = cols[0]; opt.dataset.TDP_per_core = parseFloat(cols[3])||1;
    sel.appendChild(opt);
  });
}

async function loadGPUs() {
  text = textGPU;
  const lines = text.split(/\r?\n/).slice(1);
  const sel = document.getElementById("gpu-select");
  const def = document.createElement("option");
  def.value='DEFAULT'; def.textContent='DEFAULT'; def.dataset.TDP_per_core=6; def.selected=true;
  sel.appendChild(def);
  lines.forEach(line => {
    if (!line.trim()) return;
    const cols = line.split(',');
    const opt = document.createElement("option");
    opt.value = cols[0]; opt.textContent = cols[0]; opt.dataset.TDP_per_core = parseFloat(cols[3])||1;
    sel.appendChild(opt);
  });
}

/* ════════════════════════════════════════════════
   FUZZY MATH (original engine)
════════════════════════════════════════════════ */
function smf(x,[a,b])   { if(a===b&&x===a)return 1; if(x<=a)return 0; if(x>=b)return 1; return (b===a)?1:(x-a)/(b-a); }
function zmf(x,[a,b])   { if(a===b&&x===a)return 1; if(x<=a)return 1; if(x>=b)return 0; return (b===a)?1:1-(x-a)/(b-a); }
function trimf(x,[a,b,c]){ if(a===b&&x===a)return 1; if(b===c&&x===c)return 1; if(x<=a||x>=c)return 0; if(x===b)return 1; if(x<b)return(b===a)?1:(x-a)/(b-a); return(c===b)?1:(c-x)/(c-b); }
function trapmf(x,[a,b,c,d]){ if(b===a&&x===a)return 1; if(c===d&&x===d)return 1; if(x<=a||x>=d)return 0; if(x>=b&&x<=c)return 1; if(x>a&&x<b)return(b===a)?1:(x-a)/(b-a); return(d===c)?1:(d-x)/(d-c); }

function computeMembership(metric, x) {
  const funcs = performanceData.performance_functions[metric];
  const params = performanceData.performance_params[metric];
  return funcs.map((f,i) => f==='trimf' ? trimf(x,params[i]) : trapmf(x,params[i]));
}

function computeEnergyMembership(cpuFactor,cores,gpuFactor,ngpu,tl,tm,th,energy) {
  const power = cpuFactor*cores + gpuFactor*ngpu;
  return [zmf(energy,[power*tl,power*tm]), trimf(energy,[power*tl,power*tm,power*th]), smf(energy,[power*tm,power*th])];
}

function computePerfMembership(metric, perf) { return computeMembership(metric, perf); }

/* ════════════════════════════════════════════════
   RULE MATRIX STATE
════════════════════════════════════════════════ */
const OUTPUT_KEYS   = ['very_low','low','medium','high','very_high'];
const OUTPUT_LABELS_MAP = {very_low:'very low',low:'low',medium:'medium',high:'high',very_high:'very high'};
const LEVEL_CLASS   = {very_low:'lvl-vl',low:'lvl-lo',medium:'lvl-me',high:'lvl-hi',very_high:'lvl-vh'};
const LEVEL_COLORS  = {
  very_low: {bg:'#f2c2fe',text:'#440154'},
  low:      {bg:'#b8c4e0',text:'#3b528b'},
  medium:   {bg:'#a8eae7',text:'#21918c'},
  high:     {bg:'#bbe7bc',text:'#4DC151'},
  very_high:{bg:'#fff7c1',text:'#eeca00'}
};

const PRESETS = {
  normal:        { label:'Normal',          note:'Standard — balances energy and performance symmetrically.',
    m: [['very_low','low','medium'],['low','medium','high'],['medium','high','very_high']] },
  lowcost:       { label:'Low cost',        note:'Energy savings dominate; performance is secondary.',
    m: [['very_low','low','medium'],['medium','high','very_high'],['high','very_high','very_high']] },
  perf:          { label:'Performance-first',note:'High performance always lifts score regardless of energy.',
    m: [['very_low','medium','high'],['low','high','very_high'],['medium','very_high','very_high']] },
  discriminative:{ label:'Discriminative',  note:'Avoids medium scores; promotes extreme frugality outputs.',
    m: [['very_low','very_low','medium'],['very_low','medium','very_high'],['medium','very_high','very_high']] },
  balanced:      { label:'Balanced',        note:'Avoids extremes; promotes medium scores across conditions.',
    m: [['low','medium','medium'],['medium','medium','high'],['medium','high','high']] }
};

const PRESETS_ML = {
  normal:        { label:'Normal',          note:'Standard — balances energy and performance symmetrically.',
    m: [[['very_low','very_low','very_low'],['very_low','very_low','low'],['very_low','low','medium']],[['very_low','very_low','low'],['very_low','low','medium'],['low','medium','high']],[['very_low','low','medium'],['low','medium','high'],['medium','high','very_high']]] },
  lowcost:       { label:'Low cost',        note:'Energy savings dominate; performance is secondary.',
    m: [[['very_low','very_low','very_low'],['very_low','low','medium'],['low','medium','medium']],[['very_low','very_low','low'],['low','medium','high'],['medium','high','high']],[['very_low','low','medium'],['medium','high','very_high'],['high','very_high','very_high']]] },
  perf:          { label:'Performance-first',note:'High performance always lifts score regardless of energy.',
    m: [[['very_low','very_low','low'],['very_low','low','medium'],['very_low','medium','medium']],[['very_low','low','medium'],['very_low','medium','high'],['low','high','high']],[['very_low','medium','high'],['low','high','very_high'],['medium','very_high','very_high']]] },
  discriminative:{ label:'Discriminative',  note:'Avoids medium scores; promotes extreme frugality outputs.',
    m: [[['very_low','very_low','very_low'],['very_low','very_low','medium'],['very_low','medium','medium']],[['very_low','very_low','low'],['very_low','low','high'],['low','high','high']],[['very_low','very_low','medium'],['very_low','medium','very_high'],['medium','very_high','very_high']]] },
  balanced:      { label:'Balanced',        note:'Avoids extremes; promotes medium scores across conditions.',
    m: [[['very_low','very_low','very_low'],['very_low','very_low','low'],['very_low','low','low']],[['very_low','low','low'],['low','low','medium'],['low','medium','medium']],[['low','medium','medium'],['medium','medium','high'],['medium','high','high']]] },
};

let activePreset = 'normal';
let ruleMatrix = JSON.parse(JSON.stringify(PRESETS.normal.m));
let ruleMatrixML = JSON.parse(JSON.stringify(PRESETS_ML.normal.m));

function applyPreset(name) {
  activePreset = name;
  const isML = document.querySelector('input[name="systemType"]:checked')?.value==='ML';

  if (PRESETS[name]) ruleMatrix = JSON.parse(JSON.stringify(PRESETS[name].m));
  if (PRESETS_ML[name]) ruleMatrixML = JSON.parse(JSON.stringify(PRESETS_ML[name].m));
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.toggle('active', b.dataset.preset===name));
  const p = isML ? PRESETS_ML[name] : PRESETS[name];
  document.getElementById('matrix-note').innerHTML = p
    ? `<strong>${p.label}</strong> — ${p.note}`
    : 'Custom rule matrix — edited manually.';
  if (isML) renderMatrixML();
  else renderMatrix();
  updatePlot();
}

function buildPresetButtons() {
  const row = document.getElementById('preset-row');
  [...Object.keys(PRESETS),'custom'].forEach(k => {
    const b = document.createElement('button');
    b.className = 'preset-btn' + (k===activePreset?' active':'');
    b.dataset.preset = k;
    b.textContent = PRESETS[k]?.label || 'Custom';
    if (k !== 'custom') b.onclick = () => applyPreset(k);
    row.appendChild(b);
  });
}

function renderMatrix() {
  const tbody = document.getElementById('matrix-tbody');
  tbody.innerHTML = '';
  const E_LABELS = ['E = high','E = medium','E = low'];
  for (let ei=0; ei<3; ei++) {
    const tr = document.createElement('tr');
    const th = document.createElement('td');
    th.className = 'row-label'; th.textContent = E_LABELS[ei];
    tr.appendChild(th);
    for (let pi=0; pi<3; pi++) {
      const td = document.createElement('td');
      const sel = document.createElement('select');
      sel.className = 'cell-select';
      sel.dataset.ei = ei; sel.dataset.pi = pi;
      OUTPUT_KEYS.forEach(k => {
        const opt = document.createElement('option');
        opt.value = k; opt.textContent = OUTPUT_LABELS_MAP[k];
        sel.appendChild(opt);
      });
      sel.value = ruleMatrix[ei][pi];
      styleCell(sel, ruleMatrix[ei][pi]);
      sel.addEventListener('change', function() {
        ruleMatrix[this.dataset.ei][this.dataset.pi] = this.value;
        styleCell(this, this.value);
        activePreset = 'custom';
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.toggle('active', b.dataset.preset==='custom'));
        document.getElementById('matrix-note').innerHTML = 'Custom rule matrix — edited manually.';
        updatePlot();
      });
      td.appendChild(sel); tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
}

function renderMatrixML() {
  const tbody = document.getElementById('matrix-tbody');
  tbody.innerHTML = '';
  const E_TRAIN_LABELS = ['E (train) = high','E (train) = medium','E (train) = low'];
  const E_TEST_LABELS = ['E (test) = high','E (test) = medium','E (test) = low'];
  for (let etri=0; etri<3; etri++) {
    for (let ei=0; ei<3; ei++) {
      const tr = document.createElement('tr');
      const th = document.createElement('td');
      th.className = 'row-label'; 
      th.textContent = ei===0 ? E_TRAIN_LABELS[etri] + ' / ' + E_TEST_LABELS[ei] : E_TEST_LABELS[ei];
      tr.appendChild(th);
      for (let pi=0; pi<3; pi++) {
        const td = document.createElement('td');
        const sel = document.createElement('select');
        sel.className = 'cell-select';
        sel.dataset.etri = etri; sel.dataset.ei = ei; sel.dataset.pi = pi;
        OUTPUT_KEYS.forEach(k => {
          const opt = document.createElement('option');
          opt.value = k; opt.textContent = OUTPUT_LABELS_MAP[k];
          sel.appendChild(opt);
        });
        sel.value = ruleMatrixML[etri][ei][pi];
        styleCell(sel, ruleMatrixML[etri][ei][pi]);
        sel.addEventListener('change', function() {
          ruleMatrixML[this.dataset.etri][this.dataset.ei][this.dataset.pi] = this.value;
          styleCell(this, this.value);
          activePreset = 'custom';
          document.querySelectorAll('.preset-btn').forEach(b => b.classList.toggle('active', b.dataset.preset==='custom'));
          document.getElementById('matrix-note').innerHTML = 'Custom rule matrix — edited manually.';
          updatePlot();
        });
        td.appendChild(sel); tr.appendChild(td);
      }
      tbody.appendChild(tr);
    } 
  }
}

// function renderMatrixML() {
//   const tbody = document.getElementById('matrix-tbody');
//   tbody.innerHTML = '';
//   const E_TRAIN_LABELS = ['E (train) = high','E (train) = medium','E (train) = low'];
//   const E_TEST_LABELS = ['E (test) = high','E (test) = medium','E (test) = low'];
//   for (let etri=0; etri<3; etri++) {
//     for (let etei=0; etei<3; etei++) {
//         const tr = document.createElement('tr');
//         const th = document.createElement('td');
//         th.className = 'row-label'; th.textContent = E_TEST_LABELS[etei];
//         if (etri === 0) {
//             th.textContent = E_TRAIN_LABELS[etri] + ' / ' + th.textContent;
//             th.rowSpan = 3;
//         }
//         tr.appendChild(th);
//         for (let pi=0; pi<3; pi++) {
//         const td = document.createElement('td');
//         const sel = document.createElement('select');
//         sel.className = 'cell-select';
//         sel.dataset.etei = etei; sel.dataset.etri = etri; sel.dataset.pi = pi;
//         OUTPUT_KEYS.forEach(k => {
//             const opt = document.createElement('option');
//             opt.value = k; opt.textContent = OUTPUT_LABELS_MAP[k];
//             sel.appendChild(opt);
//         });
//         sel.value = ruleMatrixML[etri][etei][pi];
//         styleCell(sel, ruleMatrixML[etri][etei][pi]);
//         sel.addEventListener('change', function() {
//             ruleMatrixML[this.dataset.etri][this.dataset.etei][this.dataset.pi] = this.value;
//             styleCell(this, this.value);
//             activePreset = 'custom';
//             document.querySelectorAll('.preset-btn').forEach(b => b.classList.toggle('active', b.dataset.preset==='custom'));
//             document.getElementById('matrix-note').innerHTML = 'Custom rule matrix — edited manually.';
//             updatePlot();
//         });
//         td.appendChild(sel); tr.appendChild(td);
//         }
//         tbody.appendChild(tr);
//     }
//   }
// }

function styleCell(sel, key) {
  const c = LEVEL_COLORS[key];
  sel.style.background = c.bg; sel.style.color = c.text; sel.style.borderColor = c.text+'55';
}

function getRules() {
  const eKeys = ['high','medium','low'];
  const pKeys = ['low','medium','high'];
  const rules = [];
  for (let ei=0; ei<3; ei++)
    for (let pi=0; pi<3; pi++)
      rules.push({ cond:(e,p)=>Math.min(e[eKeys[ei]],p[pKeys[pi]]), out:ruleMatrix[ei][pi], ant:`E=${eKeys[ei]} ∧ P=${pKeys[pi]}` });
  return rules;
}

function highlightFiringCells(e, p) {
  const eKeys = ['high','medium','low'];
  const pKeys = ['low','medium','high'];
  document.querySelectorAll('.cell-select').forEach(sel => {
    const str = Math.min(e[eKeys[+sel.dataset.ei]], p[pKeys[+sel.dataset.pi]]);
    sel.classList.toggle('firing', str > 0.001);
  });
}

/* ════════════════════════════════════════════════
   SCORE MF & AGGREGATION
════════════════════════════════════════════════ */
function scoreMFAt(x) {
  return [trimf(x,[0,0,25]),trimf(x,[0,25,50]),trimf(x,[25,50,75]),trimf(x,[50,75,100]),trimf(x,[75,100,100])];
}

function aggregateOutput(scoreMem) {
  const xs = Array.from({length:101},(_,i)=>i);
  const ys = xs.map(x => {
    const mf = scoreMFAt(x);
    return Math.max(...mf.map((v,i)=>Math.min(v,scoreMem[i])));
  });
  return { xs, ys };
}

/* ════════════════════════════════════════════════
   DEFUZZIFICATION
════════════════════════════════════════════════ */
function defuzz(xs,ys,method) {
  switch(method) {
    case 'centroid': { let n=0,d=0; xs.forEach((x,i)=>{n+=x*ys[i];d+=ys[i];}); return d?n/d:0; }
    case 'bisector': { const tot=ys.reduce((a,b)=>a+b,0); let acc=0; for(let i=0;i<xs.length;i++){acc+=ys[i];if(acc>=tot/2)return xs[i];} return xs[xs.length-1]; }
    case 'som': { const mx=Math.max(...ys); return xs[ys.indexOf(mx)]; }
    case 'mom': { const mx=Math.max(...ys); const cc=xs.filter((_,i)=>ys[i]===mx); return cc.reduce((a,b)=>a+b,0)/cc.length; }
    case 'lom': { const mx=Math.max(...ys); for(let i=xs.length-1;i>=0;i--)if(ys[i]===mx)return xs[i]; return 0; }
    default: return 0;
  }
}

/* ════════════════════════════════════════════════
   RULE-BASED FIS ENGINE (using matrix)
════════════════════════════════════════════════ */
function runMatrixFIS(perfMem, energyTrainMem) {
  const rules = getRules();
  const eKeys = ['high','medium','low'];
  const pKeys = ['low','medium','high'];
  const eMem  = {high:energyTrainMem[2],medium:energyTrainMem[1],low:energyTrainMem[0]};
  const pMem  = {low:perfMem[0],medium:perfMem[1],high:perfMem[2]};
  const fired = rules.map(r => ({ strength:r.cond(eMem,pMem), out:r.out, ant:r.ant }));

  // aggregate
  const xs = Array.from({length:101},(_,i)=>i);
  const ys = xs.map(x => {
    const mf = scoreMFAt(x);
    return fired.reduce((acc,f)=>{
      const outIdx = OUTPUT_KEYS.indexOf(f.out);
      return Math.max(acc, Math.min(f.strength, mf[outIdx]));
    }, 0);
  });
  return { fired, xs, ys };
}

/* ════════════════════════════════════════════════
   PLOTLY HELPERS
════════════════════════════════════════════════ */
const PLOTLY_COLORS = ['#f10000','#164cff','#00ad1d','#d300fd','#00f3e7'];
const SCORE_COLORS  = ['#440154','#3b528b','#21918c','#4DC151','#eeca00'];

function plotlyLayout(xTitle, yTitle, extra={}) {
  const gridColor = dark ? '#2a2a24' : '#eae9e3';
  const fontColor = dark ? '#9a9890' : '#9a9890';
  return {
    margin:{t:10,r:10,b:40,l:40},
    xaxis:{title:{text:xTitle,font:{size:11,color:fontColor}},gridcolor:gridColor,tickfont:{size:10,color:fontColor},color:fontColor},
    yaxis:{title:{text:yTitle,font:{size:11,color:fontColor}},gridcolor:gridColor,tickfont:{size:10,color:fontColor},range:[0,1.05],color:fontColor},
    paper_bgcolor:'rgba(0,0,0,0)',
    plot_bgcolor:'rgba(0,0,0,0)',
    showlegend:true,
    legend:{font:{size:10,color:fontColor},bgcolor:'rgba(0,0,0,0)'},
    ...extra
  };
}

function refreshPlotlyTheme() { updatePlot(); }

const plotlyConfig = {responsive:true, displayModeBar:false};

function traceLine(x, y, name, color) {
  return {x,y,name,mode:'lines',line:{color,width:1.8},type:'scatter'};
}

/* ════════════════════════════════════════════════
   SCORE COLOR
════════════════════════════════════════════════ */
function getScoreInfo(s) {
  if(s<20) return {label:'very low', cls:'lvl-vl', bar:LEVEL_COLORS.very_low.text};
  if(s<40) return {label:'low',      cls:'lvl-lo', bar:LEVEL_COLORS.low.text};
  if(s<60) return {label:'medium',   cls:'lvl-me', bar:LEVEL_COLORS.medium.text};
  if(s<80) return {label:'high',     cls:'lvl-hi', bar:LEVEL_COLORS.high.text};
  return          {label:'very high',cls:'lvl-vh', bar:LEVEL_COLORS.very_high.text};
}

/* ════════════════════════════════════════════════
   SCORE CALCULATION
════════════════════════════════════════════════ */

function calcScore({ perfMem, energyTrainMem, energyTestMem = null, defuzzMethod }) {
  let fired, xs, ys;

  if (energyTestMem) {
    // ML mode — 3-input rules from ruleMatrixML
    ({ fired, xs, ys } = runMatrixFISML(perfMem, energyTrainMem, energyTestMem));
  } else {
    // Standard mode — 2-input rules from ruleMatrix
    ({ fired, xs, ys } = runMatrixFIS(perfMem, energyTrainMem));
  }

  // Per-output-level membership strengths (for gauges)
  const scoreMem = OUTPUT_KEYS.map(key =>
    fired.reduce((acc, f) => f.out === key ? Math.max(acc, f.strength) : acc, 0)
  );

  const score = defuzz(xs, ys, defuzzMethod);
  return { scoreMem, xs, ys, score, fired };
}

function runMatrixFIS(perfMem, energyTrainMem) {
  const rules = getRules();
  const eMem = { high: energyTrainMem[2], medium: energyTrainMem[1], low: energyTrainMem[0] };
  const pMem = { low: perfMem[0], medium: perfMem[1], high: perfMem[2] };
  const fired = rules.map(r => ({ strength: r.cond(eMem, pMem), out: r.out, ant: r.ant }));

  const xs = Array.from({ length: 101 }, (_, i) => i);
  const ys = xs.map(x => {
    const mf = scoreMFAt(x);
    return fired.reduce((acc, f) => {
      const outIdx = OUTPUT_KEYS.indexOf(f.out);
      return Math.max(acc, Math.min(f.strength, mf[outIdx]));
    }, 0);
  });
  return { fired, xs, ys };
}

function getRulesML() {
  const eKeys = ['high', 'medium', 'low'];
  const pKeys = ['low', 'medium', 'high'];
  const rules = [];
  for (let etri = 0; etri < 3; etri++)
    for (let etei = 0; etei < 3; etei++)
      for (let pi = 0; pi < 3; pi++)
        rules.push({
          cond: (eTr, eTe, p) => Math.min(eTr[eKeys[etri]], eTe[eKeys[etei]], p[pKeys[pi]]),
          out: ruleMatrixML[etri][etei][pi],
          ant: `ETr=${eKeys[etri]} ∧ ETe=${eKeys[etei]} ∧ P=${pKeys[pi]}`
        });
  return rules;
}

function runMatrixFISML(perfMem, energyTrainMem, energyTestMem) {
  const rules = getRulesML();
  const eTrainMem = { high: energyTrainMem[2], medium: energyTrainMem[1], low: energyTrainMem[0] };
  const eTestMem  = { high: energyTestMem[2],  medium: energyTestMem[1],  low: energyTestMem[0]  };
  const pMem      = { low: perfMem[0], medium: perfMem[1], high: perfMem[2] };
  const fired = rules.map(r => ({ strength: r.cond(eTrainMem, eTestMem, pMem), out: r.out, ant: r.ant }));

  const xs = Array.from({ length: 101 }, (_, i) => i);
  const ys = xs.map(x => {
    const mf = scoreMFAt(x);
    return fired.reduce((acc, f) => {
      const outIdx = OUTPUT_KEYS.indexOf(f.out);
      return Math.max(acc, Math.min(f.strength, mf[outIdx]));
    }, 0);
  });
  return { fired, xs, ys };
}

/* ════════════════════════════════════════════════
   MAIN UPDATE
════════════════════════════════════════════════ */
function updatePlot() {
  const systemType = document.querySelector('input[name="systemType"]:checked')?.value;
  const metric     = document.getElementById("metric").value;
  if (!performanceData.performance_minmax || !metric) return;

  const [minVal,maxVal] = performanceData.performance_minmax[metric];
  const cpuFactor = parseFloat(document.getElementById("cpu-power").value)||1;
  const cores     = parseInt(document.getElementById("cores").value)||1;
  const gpuFactor = parseFloat(document.getElementById("gpu-power").value)||1;
  const ngpu      = parseInt(document.getElementById("number-gpu").value)||0;
  const tl        = parseFloat(document.getElementById("energyValueLow").value)||0;
  const tm        = parseFloat(document.getElementById("energyValueMedium").value)||0;
  const th        = parseFloat(document.getElementById("energyValueHigh").value)||0;

  const perf   = parseFloat(document.getElementById("perf").value)||0;
  const safeP  = Math.max(minVal, Math.min(maxVal, perf));
  const energy = parseFloat(document.getElementById("energy").value)||0;
  const safeE  = Math.max(0, energy);

  const perfMem   = computePerfMembership(metric, safeP);
  const energyTrainMem = computeEnergyMembership(cpuFactor,cores,gpuFactor,ngpu,tl,tm,th,safeE);
  // const rules = getRules();

  // // ML mode
  // let scoreMem;
  let safeEt=0, tlt=0, tmt=0, tht=0;
  const isML = systemType==='ML';
  document.getElementById("energy_control_test").style.display = isML?'block':'none';
  document.getElementById("energy_input_test").style.display   = isML?'block':'none';
  document.getElementById("mf-test-card").style.display        = isML?'block':'none';

  const demoMode = document.querySelector('input[name="demoMode"]:checked')?.value;
  const isDemo = demoMode==='yes';
  document.getElementById("demo_control_scenario").style.display = isDemo?'block':'none';


  renderMatrix();
  if (isML) {
    const et = parseFloat(document.getElementById("energy_test")?.value)||0;
    safeEt = Math.max(0, et);
    tlt = parseFloat(document.getElementById("energyValueLow_test")?.value)||0;
    tmt = parseFloat(document.getElementById("energyValueMedium_test")?.value)||0;
    tht = parseFloat(document.getElementById("energyValueHigh_test")?.value)||0;
    renderMatrixML();
  };

  const defuzzMethod = document.getElementById("defuzz-select").value;
  const { scoreMem, xs, ys, score, fired } = calcScore({
    perfMem,
    energyTrainMem,
    energyTestMem: isML
      ? computeEnergyMembership(cpuFactor, cores, gpuFactor, ngpu, tlt, tmt, tht, safeEt)
      : null,
    defuzzMethod
  });

  // Also run matrix FIS for rule activations display
  const matrixResult = isML ? runMatrixFISML(perfMem, energyTrainMem, computeEnergyMembership(cpuFactor, cores, gpuFactor, ngpu, tlt, tmt, tht, safeEt)) : runMatrixFIS(perfMem, energyTrainMem);

  // ── Update score card ──
  const info = getScoreInfo(score);
  document.getElementById("score-val").textContent = score.toFixed(1);
  const badge = document.getElementById("score-badge");
  badge.textContent = info.label;
  badge.className = 'score-badge ' + info.cls;
  document.getElementById("score-val-front").textContent = score.toFixed(1);
  const badgefront = document.getElementById("score-badge-front");
  badgefront.textContent = info.label;
  badgefront.className = 'score-badge ' + info.cls;

  // ── MF cards ──
  // const eLow = zmf(safeE,[tl*( cpuFactor*cores+gpuFactor*ngpu),tm*(cpuFactor*cores+gpuFactor*ngpu)]);
  document.getElementById("e-low").textContent  = (energyTrainMem[0]||0).toFixed(2);
  document.getElementById("e-med").textContent  = (energyTrainMem[1]||0).toFixed(2);
  document.getElementById("e-high").textContent = (energyTrainMem[2]||0).toFixed(2);
  // const pm = perfMem;
  document.getElementById("p-low").textContent  = (perfMem[0]||0).toFixed(2);
  document.getElementById("p-med").textContent  = (perfMem[1]||0).toFixed(2);
  document.getElementById("p-high").textContent = (perfMem[2]||0).toFixed(2);

  document.getElementById("etest-low-card").style.display = isML?'block':'none';
  document.getElementById("etest-med-card").style.display = isML?'block':'none';
  document.getElementById("etest-hig-card").style.display = isML?'block':'none';
  if (isML) {
    document.getElementById("etest-low").textContent  = (computeEnergyMembership(cpuFactor, cores, gpuFactor, ngpu, tlt, tmt, tht, safeEt)[0]||0).toFixed(2);
    document.getElementById("etest-med").textContent  = (computeEnergyMembership(cpuFactor, cores, gpuFactor, ngpu, tlt, tmt, tht, safeEt)[1]||0).toFixed(2);
    document.getElementById("etest-high").textContent = (computeEnergyMembership(cpuFactor, cores, gpuFactor, ngpu, tlt, tmt, tht, safeEt)[2]||0).toFixed(2);
  };

  // ── Gauges ──
  const gaugeWrap = document.getElementById("output-gauges");
  gaugeWrap.innerHTML = '';
  const scoreLabels = ['very low','low','medium','high','very high'];
  scoreMem.forEach((v,i) => {
    const pct = Math.round(v*100);
    const c = LEVEL_COLORS[OUTPUT_KEYS[i]];
    gaugeWrap.innerHTML += `<div class="gauge-card">
      <div class="gauge-label">${scoreLabels[i]}</div>
      <div class="gauge-bar-wrap"><div class="gauge-bar" style="width:${pct}%;background:${c.text}"></div></div>
      <div class="gauge-pct">${pct}%</div>
    </div>`;
  });

  // ── Rule activations ──
  const ruleList = document.getElementById("rule-act-list");
  ruleList.innerHTML = '';
  matrixResult.fired.forEach(f => {
    const pct = Math.round(f.strength*100);
    const c   = LEVEL_COLORS[f.out];
    ruleList.innerHTML += `<div class="rule-row">
      <span class="rule-ant">${f.ant}</span>
      <div class="rule-bar-wrap"><div class="rule-bar-fill" style="width:${pct}%"></div></div>
      <span class="rule-cons" style="color:${c.text}">${pct}%</span>
    </div>`;
  });

  // highlight matrix cells
  const eMem2 = {high:energyTrainMem[2],medium:energyTrainMem[1],low:energyTrainMem[0]};
  const pMem2 = {low:perfMem[0]||0,medium:perfMem[1]||0,high:perfMem[2]||0};
  highlightFiringCells(eMem2, pMem2);

  // ── Aggregated plot ──
  const scoreXs = Array.from({length:101},(_,i)=>i);
  const aggTrace = {
    x:scoreXs, y:ys, name:'Aggregated', mode:'lines',
    fill:'tozeroy', fillcolor: dark?'rgba(82,183,136,0.15)':'rgba(45,106,79,0.1)',
    line:{color:'#2d6a4f',width:1.8}, type:'scatter'
  };
  const defuzzLine = {
    x:[score,score], y:[0,1], name:'Defuzzified',
    mode:'lines', line:{color:'#c44536',width:2,dash:'dot'}, type:'scatter'
  };
  const aggLayout = {
    ...plotlyLayout('Score','μ'),
    yaxis:{...plotlyLayout('','μ').yaxis, range:[0,1.05]},
    annotations:[{x:score,y:1.02,text:score.toFixed(1),showarrow:false,font:{color:'#c44536',size:11},yanchor:'bottom'}]
  };
  Plotly.react('plot_agg', [aggTrace, defuzzLine], aggLayout, plotlyConfig);

  // ── MF Tab: Performance ──
  const step = (maxVal-minVal)/100;
  const perfX = Array.from({length:101},(_,i)=>minVal+i*step);
  const funcs = performanceData.performance_functions[metric];
  const mfColors = PLOTLY_COLORS;
  const perfTraces = funcs.map((f,fi) => {
    const label = funcs.length===3?['low','medium','high'][fi]:funcs.length===2?['low','high'][fi]:`set ${fi+1}`;
    return traceLine(perfX, perfX.map(x=>computeMembership(metric,x)[fi]), label, mfColors[fi]);
  });
  perfTraces.push({x:[safeP,safeP],y:[0,1],mode:'lines',line:{dash:'dash',color:'#c44536',width:1.5},showlegend:false,name:'input',type:'scatter'});
  Plotly.react('plot_membership_perf', perfTraces, plotlyLayout(performanceData.performance_names[metric],'μ'), plotlyConfig);
  document.getElementById('mf-metric-chip').textContent = performanceData.performance_names[metric];

  // ── MF Tab: Energy ──
  const power = cpuFactor*cores + gpuFactor*ngpu;
  const maxE = Math.max(safeE, power*100, power*th*1.1)||100;
  const eStp = maxE/200;
  const energyX = Array.from({length:201},(_,i)=>i*eStp);
  const eTraces = [
    traceLine(energyX, energyX.map(x=>zmf(x,[power*tl,power*tm])), 'low', mfColors[0]),
    traceLine(energyX, energyX.map(x=>trimf(x,[power*tl,power*tm,power*th])), 'medium', mfColors[1]),
    traceLine(energyX, energyX.map(x=>smf(x,[power*tm,power*th])), 'high', mfColors[2]),
  ];
  eTraces.push({x:[safeE,safeE],y:[0,1],mode:'lines',line:{dash:'dash',color:'#c44536',width:1.5},showlegend:false,type:'scatter'});
  Plotly.react('plot_membership_energy', eTraces, plotlyLayout('Energy (J)','μ'), plotlyConfig);

  // ── MF Tab: Energy test ──
  if (isML) {
    const maxEt = Math.max(safeEt, power*100, power*tht*1.1)||100;
    const eStpt = maxEt/200;
    const energyXt = Array.from({length:201},(_,i)=>i*eStpt);
    const eTestTraces = [
      traceLine(energyXt, energyXt.map(x=>zmf(x,[power*tlt,power*tmt])), 'low', mfColors[0]),
      traceLine(energyXt, energyXt.map(x=>trimf(x,[power*tlt,power*tmt,power*tht])), 'medium', mfColors[1]),
      traceLine(energyXt, energyXt.map(x=>smf(x,[power*tmt,power*tht])), 'high', mfColors[2]),
    ];
    eTestTraces.push({x:[safeEt,safeEt],y:[0,1],mode:'lines',line:{dash:'dash',color:'#c44536',width:1.5},showlegend:false,type:'scatter'});
    Plotly.react('plot_membership_energy_test', eTestTraces, plotlyLayout('Energy test (J)','μ'), plotlyConfig);
  }

  // ── MF Tab: Score output ──
  const sLabels=['very low','low','medium','high','very high'];
  const scoreTraces = sLabels.map((lbl,i) => traceLine(scoreXs, scoreXs.map(x=>scoreMFAt(x)[i]), lbl, SCORE_COLORS[i]));
  Plotly.react('plot_membership_score', scoreTraces, plotlyLayout('Score','μ'), plotlyConfig);

  document.getElementById("bar-card").style.display = (isDemo || document.getElementById("input-file").files.length)?'block':'none';
}

/* ════════════════════════════════════════════════
   SLIDER HELPERS
════════════════════════════════════════════════ */
function updateSliderLow(v, suf='') {
  // const el = document.getElementById("energy_low"+suf);
  if (v >= document.getElementById("energy_low"+suf).max) document.getElementById("energy_low"+suf).max = v * 1.2;
  document.getElementById("energy_low"+suf).value = v;
  document.getElementById("energyValueLow"+suf).value = v;
  // if (+v > +document.getElementById("energy_medium"+suf).value) updateSliderMedium(v, suf);
  // if (!document.getElementById("input-file").files.length) updatePlot()
  // else readUploadFile({target:{files:[document.getElementById("input-file").files[0]]}});
}
function updateSliderMedium(v, suf='') {
  // const el = document.getElementById("energy_medium"+suf);
  if (v >= document.getElementById("energy_medium"+suf).max) document.getElementById("energy_medium"+suf).max = v * 1.2;
  document.getElementById("energy_medium"+suf).value = v;
  document.getElementById("energyValueMedium"+suf).value = v;
  // if (+v > +document.getElementById("energy_high"+suf).value) updateSliderHigh(v, suf);
  // if (+v < +document.getElementById("energy_low"+suf).value)  updateSliderLow(v, suf);
  // if (!document.getElementById("input-file").files.length) updatePlot()
  // else readUploadFile({target:{files:[document.getElementById("input-file").files[0]]}});
}
function updateSliderHigh(v, suf='') {
  // const el = document.getElementById("energy_high"+suf);
  if (v >= document.getElementById("energy_high"+suf).max) document.getElementById("energy_high"+suf).max = v * 1.2;
  document.getElementById("energy_high"+suf).value = v;
  document.getElementById("energyValueHigh"+suf).value = v;
  // if (+v < +document.getElementById("energy_medium"+suf).value) updateSliderMedium(v, suf);
  // if (!document.getElementById("input-file").files.length) updatePlot()
  // else readUploadFile({target:{files:[document.getElementById("input-file").files[0]]}});
}

/* ════════════════════════════════════════════════
   CSV UPLOAD
════════════════════════════════════════════════ */

function computeScore(perf, energy) {
  const metric    = document.getElementById("metric").value;
  const cpuFactor = parseFloat(document.getElementById("cpu-power").value) || 1;
  const cores     = parseInt(document.getElementById("cores").value) || 1;
  const gpuFactor = parseFloat(document.getElementById("gpu-power").value) || 1;
  const ngpu      = parseInt(document.getElementById("number-gpu").value) || 0;
  const tl = parseFloat(document.getElementById("energyValueLow").value) || 0;
  const tm = parseFloat(document.getElementById("energyValueMedium").value) || 0;
  const th = parseFloat(document.getElementById("energyValueHigh").value) || 0;

  const perfMem   = computePerfMembership(metric, perf);
  const energyTrainMem = computeEnergyMembership(cpuFactor, cores, gpuFactor, ngpu, tl, tm, th, energy);
  const { score } = calcScore({
    perfMem,
    energyTrainMem,
    defuzzMethod: document.getElementById("defuzz-select").value
  });
  return score;
}

function computeScoreML(perf, energy_train, energy_test) {
  const metric    = document.getElementById("metric").value;
  const cpuFactor = parseFloat(document.getElementById("cpu-power").value) || 1;
  const cores     = parseInt(document.getElementById("cores").value) || 1;
  const gpuFactor = parseFloat(document.getElementById("gpu-power").value) || 1;
  const ngpu      = parseInt(document.getElementById("number-gpu").value) || 0;
  const tl_train = parseFloat(document.getElementById("energyValueLow").value) || 0;
  const tm_train = parseFloat(document.getElementById("energyValueMedium").value) || 0;
  const th_train = parseFloat(document.getElementById("energyValueHigh").value) || 0;
  const tl_test = parseFloat(document.getElementById("energyValueLow_test").value) || 0;
  const tm_test = parseFloat(document.getElementById("energyValueMedium_test").value) || 0;
  const th_test = parseFloat(document.getElementById("energyValueHigh_test").value) || 0;

  const perfMem   = computePerfMembership(metric, perf);
  const energyTrainMem = computeEnergyMembership(cpuFactor, cores, gpuFactor, ngpu, tl_train, tm_train, th_train, energy_train);
  const energyTestMem = computeEnergyMembership(cpuFactor, cores, gpuFactor, ngpu, tl_test, tm_test, th_test, energy_test);
  const { score } = calcScore({
    perfMem,
    energyTrainMem,
    energyTestMem,
    defuzzMethod: document.getElementById("defuzz-select").value
  });
  return score;
}

function readUploadFile(evt) {
  const systemType = document.querySelector('input[name="systemType"]:checked')?.value;
  const isML = systemType==='ML';
  if (isML) readUploadFileML(evt);
  else readUploadFileNML(evt);
}

function readUploadFileNML(evt) {
  const file = evt.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const text = e.target.result.trim();
    const lines = text.split(/\r?\n/);
    if (lines.length < 2) return;
    const headers = lines[0].split(',').map(h=>h.trim());
    const perfIdx  = headers.indexOf("perf");
    const energyIdx= headers.indexOf("energy");
    const groupIdx = headers.indexOf("group");
    if (perfIdx===-1 || energyIdx===-1) return;

    const perfs   = lines.slice(1).map(l=>parseFloat(l.split(',')[perfIdx]));
    const energies= lines.slice(1).map(l=>parseFloat(l.split(',')[energyIdx]));
    const groups  = lines.slice(1).map(l=>l.split(',')[groupIdx]||'default');

    const lastLine = lines[lines.length-1].split(',');
    document.getElementById("perf").value   = parseFloat(lastLine[perfIdx])||0;
    document.getElementById("energy").value = parseFloat(lastLine[energyIdx])||0;
    updatePlot();

    const scores = perfs.map((p,i)=>computeScore(p,energies[i]));
    const grouped = {};
    groups.forEach((g,i)=>{ if(!grouped[g])grouped[g]=[]; grouped[g].push(scores[i]); });
    const means = Object.values(grouped).map(s=>s.reduce((a,b)=>a+b,0)/s.length);
    const stds  = Object.values(grouped).map(s=>{
      const m=s.reduce((a,b)=>a+b,0)/s.length;
      return Math.sqrt(s.map(x=>(x-m)**2).reduce((a,b)=>a+b,0)/s.length);
    });
    const barTrace = {
      x:Object.keys(grouped), y:means, type:'bar', showlegend:false,
      marker:{color:means.map(s=>getScoreInfo(s).bar)},
      error_y:{type:'data',array:stds,visible:true,color:'var(--text3)',thickness:1.5,width:4}
    };
    document.getElementById("bar-card").style.display = 'block';
    Plotly.react('bar_scores_display', [barTrace],
      {...plotlyLayout('Group','Score'),yaxis:{...plotlyLayout('','').yaxis,range:[0,100]}},
      plotlyConfig);
  };
  reader.readAsText(file);
}

function readUploadFileML(evt) {
  const file = evt.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const text = e.target.result.trim();
    const lines = text.split(/\r?\n/);
    if (lines.length < 2) return;
    const headers = lines[0].split(',').map(h=>h.trim());
    const perfIdx  = headers.indexOf("perf");
    const energyTrainIdx= headers.indexOf("energyTrain");
    const energyTestIdx= headers.indexOf("energyTest");
    const groupIdx = headers.indexOf("group");
    if (perfIdx===-1 || energyTrainIdx===-1 || energyTestIdx===-1) return;

    const perfs   = lines.slice(1).map(l=>parseFloat(l.split(',')[perfIdx]));
    const energiesTrain= lines.slice(1).map(l=>parseFloat(l.split(',')[energyTrainIdx]));
    const energiesTest= lines.slice(1).map(l=>parseFloat(l.split(',')[energyTestIdx]));
    const groups  = lines.slice(1).map(l=>l.split(',')[groupIdx]||'default');

    const scores = perfs.map((p,i)=>computeScoreML(p,energiesTrain[i],energiesTest[i]));
    const grouped = {};
    groups.forEach((g,i)=>{ if(!grouped[g])grouped[g]=[]; grouped[g].push(scores[i]); });
    const means = Object.values(grouped).map(s=>s.reduce((a,b)=>a+b,0)/s.length);
    const stds  = Object.values(grouped).map(s=>{
      const m=s.reduce((a,b)=>a+b,0)/s.length;
      return Math.sqrt(s.map(x=>(x-m)**2).reduce((a,b)=>a+b,0)/s.length);
    });
    const barTrace = {
      x:Object.keys(grouped), y:means, type:'bar', showlegend:false,
      marker:{color:means.map(s=>getScoreInfo(s).bar)},
      error_y:{type:'data',array:stds,visible:true,color:'var(--text3)',thickness:1.5,width:4}
    };

    const lastMeans = means[means.length-1]
    document.getElementById("perf").value   = parseFloat(lastMeans[perfIdx])||0;
    document.getElementById("energy").value = parseFloat(lastMeans[energyTrainIdx])||0;
    document.getElementById("energy_test").value = parseFloat(lastMeans[energyTestIdx])||0;
    updatePlot();

    document.getElementById("bar-card").style.display = 'block';
    Plotly.react('bar_scores_display', [barTrace],
      {...plotlyLayout('Group','Score'),yaxis:{...plotlyLayout('','').yaxis,range:[0,100]}},
      plotlyConfig);
  };
  reader.readAsText(file);
};

/* ════════════════════════════════════════════════
   DEMO MODE
════════════════════════════════════════════════ */

function prepareDemo(metadata) {
  updateSliderLow(metadata.energy_low_train)
  updateSliderMedium(metadata.energy_medium_train)
  updateSliderHigh(metadata.energy_high_train)

  // document.getElementById("energy_low").value = metadata.energy_low_train;
  // document.getElementById("energyValueLow").value = metadata.energy_low_train;
  // document.getElementById("energy_medium").value = metadata.energy_medium_train;
  // document.getElementById("energyValueMedium").value = metadata.energy_medium_train;
  // document.getElementById("energy_high").value = metadata.energy_high_train;
  // document.getElementById("energyValueHigh").value = metadata.energy_high_train;
  document.getElementById("metric").value = metadata.metric;
  document.getElementById("cpu-select").value = metadata.cpu;
  document.getElementById("cpu-power").value = metadata.cpupower;
  document.getElementById("cores").value = metadata.ncpu;
  document.getElementById("gpu-select").value = metadata.gpu;
  document.getElementById("gpu-power").value = metadata.gpupower;
  document.getElementById("number-gpu").value = metadata.ngpu;

  // update radio button ML/noML to match with the metadata
  const targetMode = metadata.mode === "ML" ? "ML" : "Non ML";
  const nontargetMode = metadata.mode === "ML" ? "Non ML" : "ML";
  const radioBtn = document.querySelector(`input[name="systemType"][value="${targetMode}"]`);
  if (radioBtn) radioBtn.checked = true;
  const OtherradioBtn = document.querySelector(`input[name="systemType"][value="${nontargetMode}"]`);
  if (OtherradioBtn) OtherradioBtn.checked = false;

  if (metadata.mode === "ML") {
    updateSliderLow(metadata.energy_low_test,'_test')
    updateSliderMedium(metadata.energy_medium_test,'_test')
    updateSliderHigh(metadata.energy_high_test,'_test')

    // document.getElementById("energy_low_test").value = metadata.energy_low_test;
    // document.getElementById("energyValueLow_test").value = metadata.energy_low_test;
    // document.getElementById("energy_medium_test").value = metadata.energy_medium_test;
    // document.getElementById("energyValueMedium_test").value = metadata.energy_medium_test;
    // document.getElementById("energy_high_test").value = metadata.energy_high_test;
    // document.getElementById("energyValueHigh_test").value = metadata.energy_high_test;
    updatePlot();
    return;
  }
  updatePlot();
  return;
}

function readDemo() {
  const demo_scenario = document.querySelector('input[name="demo_scenario"]:checked')?.value;
  let metadata;
  if (demo_scenario==="mnist") metadata=MetadataMNIST;
  if (demo_scenario==="imagenet") metadata=MetadataImageNet;
  if (demo_scenario==="cifar-scratch") metadata=MetadataCIFARfalse;
  if (demo_scenario==="cifar-pretrained") metadata=MetadataCIFARtrue;
  if (demo_scenario==="buttere") metadata=MetadataBUTTERE;

  prepareDemo(metadata);

  const systemType = document.querySelector('input[name="systemType"]:checked')?.value;
  const isML = systemType==='ML';
  const text = metadata.data;
  const lines = text.split(/\r?\n/);
  if (lines.length < 2) return;
  
  const headers = lines[0].split(',').map(h=>h.trim());
  const perfIdx  = headers.indexOf("perf");
  const energyTrainIdx= headers.indexOf("energyTrain");
  const energyTestIdx  = isML ? headers.indexOf("energyTest") : -1;
  const groupIdx = headers.indexOf("group");
  
  if (perfIdx===-1 || energyTrainIdx===-1) return;
  if (isML && energyTestIdx===-1) return;

  const rows = lines.slice(1)
  const perfs   = rows.map(l=>parseFloat(l.split(',')[perfIdx]));
  const energiesTrain= rows.map(l=>parseFloat(l.split(',')[energyTrainIdx]));
  const energiesTest = isML ? rows.map(l => parseFloat(l.split(',')[energyTestIdx])) : [];
  const groups  = rows.map(l=>l.split(',')[groupIdx]||'default');

  const scores = perfs.map((p, i) =>
    isML ? computeScoreML(p, energiesTrain[i], energiesTest[i])
         : computeScore(p, energiesTrain[i])
  );

  const grouped = {};
  groups.forEach((g,i)=>{ if(!grouped[g])grouped[g]=[]; grouped[g].push(scores[i]); });
    
  const means = Object.values(grouped).map(s=>s.reduce((a,b)=>a+b,0)/s.length);
  const stds  = Object.values(grouped).map(s=>{
    const m=s.reduce((a,b)=>a+b,0)/s.length;
    return Math.sqrt(s.map(x=>(x-m)**2).reduce((a,b)=>a+b,0)/s.length);
  });
  const lastRow = rows[rows.length - 1].split(',');
  document.getElementById("perf").value   = parseFloat(lastRow[perfIdx])||0;
  document.getElementById("energy").value = parseFloat(lastRow[energyTrainIdx])||0;
  if (isML) {
    document.getElementById("energy_test").value = parseFloat(lastRow[energyTestIdx])||0;
  }
  updatePlot();

  const barTrace = {
    x:Object.keys(grouped), y:means, type:'bar', showlegend:false,
    marker:{color:means.map(s=>getScoreInfo(s).bar)},
    error_y:{type:'data',array:stds,visible:true,color:'var(--text3)',thickness:1.5,width:4}
  };
document.getElementById("bar-card").style.display = 'block';
Plotly.react('bar_scores_display', [barTrace],
  {...plotlyLayout(metadata.groupname,'Score'),yaxis:{...plotlyLayout('','').yaxis,range:[0,100]}},
  plotlyConfig);
}


/* ════════════════════════════════════════════════
   TAB SWITCHING
════════════════════════════════════════════════ */
function switchTab(name) {
//   ['result','mf','rules','params'].forEach(t=>{
  ['info','result','mf','rules'].forEach(t=>{
    document.getElementById('panel-'+t).classList.toggle('active', t===name);
    document.getElementById('tab-'+t).classList.toggle('active',   t===name);
  });
}

/* ════════════════════════════════════════════════
   EVENT WIRING
════════════════════════════════════════════════ */
document.getElementById('input-file').addEventListener('change', readUploadFile);
document.getElementById('demo_control_scenario').addEventListener('change', readDemo);

['energy_low','energy_medium','energy_high'].forEach(id=>{
  const suf = '';
  document.getElementById(id).addEventListener('input', function(){
    if(id==='energy_low')    updateSliderLow(this.value, suf);
    if(id==='energy_medium') updateSliderMedium(this.value, suf);
    if(id==='energy_high')   updateSliderHigh(this.value, suf);
  });
});
['energyValueLow','energyValueMedium','energyValueHigh'].forEach(id=>{
  document.getElementById(id).addEventListener('input', function(){
    if(id.includes('Low'))    updateSliderLow(this.value);
    if(id.includes('Medium')) updateSliderMedium(this.value);
    if(id.includes('High'))   updateSliderHigh(this.value);
  });
});
['energy_low_test','energy_medium_test','energy_high_test'].forEach(id=>{
  document.getElementById(id).addEventListener('input', function(){
    if(id.includes('low'))    updateSliderLow(this.value,'_test');
    if(id.includes('medium')) updateSliderMedium(this.value,'_test');
    if(id.includes('high'))   updateSliderHigh(this.value,'_test');
  });
});
['energyValueLow_test','energyValueMedium_test','energyValueHigh_test'].forEach(id=>{
  document.getElementById(id).addEventListener('input', function(){
    if(id.includes('Low'))    updateSliderLow(this.value,'_test');
    if(id.includes('Medium')) updateSliderMedium(this.value,'_test');
    if(id.includes('High'))   updateSliderHigh(this.value,'_test');
  });
});

document.querySelectorAll('input[name=systemType]').forEach(r=>r.addEventListener('change',updatePlot));
document.querySelectorAll('input[name=demoMode]').forEach(r=>r.addEventListener('change',updatePlot));
document.getElementById('defuzz-select').addEventListener('change', updatePlot);
document.getElementById('cpu-select').addEventListener('change', ()=>{
  const sel=document.getElementById('cpu-select');
  document.getElementById('cpu-power').value = sel.options[sel.selectedIndex].dataset.TDP_per_core||6;
  updatePlot();
});
document.getElementById('gpu-select').addEventListener('change', ()=>{
  const sel=document.getElementById('gpu-select');
  document.getElementById('gpu-power').value = sel.options[sel.selectedIndex].dataset.TDP_per_core||6;
  updatePlot();
});
['cpu-power','cores','gpu-power','number-gpu','metric','perf','energy','energy_test']
  .forEach(id=>document.getElementById(id).addEventListener('input',updatePlot));

/* ════════════════════════════════════════════════
   BOOT
════════════════════════════════════════════════ */
buildPresetButtons();
renderMatrix();
applyPreset('normal');

Promise.all([loadCPUs(), loadGPUs(), loadPerformanceData()])
  .then(()=>updatePlot())
  .then(()=>readDemo())
  .catch(err=>console.error('Init failed:', err));