# ERP: Customizing Recommended Data Visualization Plots

Visualization recommender systems automatically generate chart results which prevent analysts to manually make them but just select the most liked result among the list.  Here, we demonstrate **a deep learning-based visualization recommendation system** that suggests visualization type and design choices learned from a large corpus of datasets and associated visualizations.

<br />



## Team Info

이화여자대학교 엘텍공과대학 소프트웨어학부 컴퓨터공학과 7팀 이화BTS

- 김연수 : Ewha w.univ.
    - [Github](https://github.com/yskim0)
- 나정현 : Ewha w.univ.
    - [Github](https://github.com/leahincom)

<br />



## Demo

Check out our short demo (incomplete version)

[demo video]()

<br />



#### Main Dashboard

![Group 1](https://user-images.githubusercontent.com/49134038/120289713-8989f900-c2fc-11eb-9664-3fef9ebf7788.png)

> 1. 저장된 chart 리스트를 왼쪽에 보여주기
>
> 2. 사용자가 임의로 chart를 drag-n-drop 하여 레이아웃 배치
>
> 3. chart 선택 시 detail 수정할 수 있는 팝업창 띄우기
>
> 4. dataset numerical summary chart
>
>    → 미리 정의한 aggregation function들을 (e.g. max, min, total...) 사용자가 속성으로 추가 및 변경 가능

<br />



#### User-Define Dashboard

![Group 2](https://user-images.githubusercontent.com/49134038/120289674-80009100-c2fc-11eb-983e-5991b506e3a4.png)

> *사용자가...*
>
> 1. 차트 유형 선택
> 2. 파라미터 (행, 열 등) drag-n-drop 으로 설정
> 3. 기타 요소 선택
> 4. 새로운 chart 생성
> 5. chart 저장

<br />



#### Recommendation Dashboard

![Group 3](https://user-images.githubusercontent.com/49134038/120289667-80009100-c2fc-11eb-8152-c4d8187b846f.png)

![Group 4](https://user-images.githubusercontent.com/49134038/120289665-7e36cd80-c2fc-11eb-96f0-e32614408a65.png)

> 1. dataset 넣기(샘플데이터셋/Your Dataset)
> 2. 적절한 chart recommendation Top-k개 리스트업 해서 오른쪽에 띄우기
> 3. 사용자가 chart 선택
> 4. 왼쪽에 chart와 detail 띄우기
> 5. detail 수정하기
> 6. chart 저장

<br />



#### My Page

![Group 6](https://user-images.githubusercontent.com/49134038/120290677-8a6f5a80-c2fd-11eb-9e53-7e0bf21e3b18.png)

<br />



## Requirements

```
astor==0.8.1
certifi==2020.12.5
cffi==1.14.5
click==7.1.2
cryptography==3.4.7
cycler==0.10.0
dnspython==2.1.0
Flask==1.1.2
Flask-Cors==3.0.10
Flask-PyMongo==2.3.0
gast
gunicorn
grpcio==1.14.1
h5py 
importlib-metadata 
itsdangerous==1.1.0
Jinja2==2.11.3
Keras-Applications 
Keras-Preprocessing 
kiwisolver 
Markdown 
MarkupSafe==1.1.1
matplotlib 
numpy 
olefile==0.46
Pillow 
protobuf==3.14.0
pycparser==2.20
pymongo==3.11.4
pyOpenSSL==20.0.1
pyparsing 
python-dateutil 
PyYAML==5.4.1
scipy 
six 
tensorboard==1.12.2
tensorflow==1.12.0
termcolor==1.1.0
tornado 
typing-extensions 
Werkzeug 
zipp 
```

<br />



## Datasets

| Folder                                                       | Content                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [examples](https://github.com/victordibia/data2vis/blob/master/examples) | Directory containing 4300 Vega-lite example visualization specifications |
| [sourcedata](https://github.com/victordibia/data2vis/blob/master/sourcedata) | Directory containing `training data` (source, target pairs split into train/dev/test sets) used to train the seq2seq model. You can take a look at the [data_gen.py](https://github.com/victordibia/data2vis/blob/master/utils/data_gen.py) script to see how the this training data is generated from the example |

<br />



## 실행 방법

1. 이 저장소를 로컬 저장소에 클론한다.

`git clone https://github.com/Ewha-BTS/ERP.git`

2. requirements를 설치한다.

> 아나콘다 가상 환경에서 진행하는 것을 추천합니다.

* `cd ERP` ; 첫 번째 step에서 저장했던 폴더로 이동한다.

- `pip install -r requirements.txt`

3. `python app.py` or `python3 app.py` ; 서버를 실행한다.

4. 클라이언트를 실행한다.

* `cd erp-client` ; 클라이언트 폴더로 이동한다.

* `npm start`

![Group 3](https://user-images.githubusercontent.com/49134038/120289667-80009100-c2fc-11eb-8152-c4d8187b846f.png)

<br>



## Tech Stack

#### Front-end

- React.js
- Recoil
- styled-components (SASS 기반)

<br />



#### Back-end

* Flask
* Python
* Tensorflow

<br />



