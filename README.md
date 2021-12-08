# ERP: EDA를 위한 데이터 시각화 추천 시스템

[ERP 배포 사이트](http://35.224.89.32:3000) **_( due to the restricted server resource, plz contact me if you want to explore my service :) )_**

<hr style="height: auto; width: 50%; border-bottom: 5px solid; color: darkgreen; margin: 0 auto" />

<br />



Visualization recommender systems automatically generate chart results which prevent analysts to manually make them but just select the most liked result among the list.  Here, we demonstrate **a deep learning-based visualization recommendation system** that suggests visualization type and design choices learned from a large corpus of datasets and associated visualizations.

<br />



본 프로젝트는 데이터를 이해하여 Plot을 생성하고 추천해주는 딥러닝 추천 시스템 모델을 이용하여 사용자에게 몇 가지 Plot들을 추천해주는 기술(Visualization Recommendation)을 구현합니다. 더하여, 사용자가 직접 여러 차트들을 관리하고 필요에 맞게 이를 배치할 수 있는 대시보드를 구현하여 사용성을 증대시킨 웹 어플리케이션을 최종적으로 구현합니다.

<br />




## Team Info

이화여자대학교 엘텍공과대학 소프트웨어학부 컴퓨터공학과 7팀 이화BTS

- 김연수 : Ewha w.univ.
  - [Github](https://github.com/yskim0)
  - 백엔드, 모델
- 나정현 : Ewha w.univ.
  - [Github](https://github.com/leahincom)
  - 프론트엔드, 백엔드(Node.js)

<br />



## Demo

Check out our short demo/ 시연 영상은 아래를 참고해주세요.

[demo video](https://www.youtube.com/watch?v=uQ1P4H62fBk&t=1s)

<br />



## Features

#### Recommendation Dashboard

<img width="1111" alt="스크린샷 2021-11-17 오후 2 25 34" src="https://user-images.githubusercontent.com/48315997/142140112-711db5db-b338-42cd-afe6-c91efc8d1692.png">

1. dataset 로드 (샘플 데이터셋/ Your Dataset)

   > 현재 EXAMPLE 데이터셋만 제공 중입니다.

2. (추천시스템 모델을 통해 나온) Top-k개 chart recommendation plots 사이드바에 로드

3. 사용자가 chart 선택 시 대시보드에 확대되어 그려짐

4. chart 저장, vega-lite editor 사용 등의 옵션 제공

<br />



#### Main Dashboard

<img width="1265" alt="Screenshot 2021-12-08 at 17 11 56" src="https://user-images.githubusercontent.com/49134038/145172314-7ba2d866-85e7-4886-9a17-16428947a285.png">

- 슬래시 커맨드를 통해 html 태그 이용 가능
- 기존에 로드했던 데이터셋 리스트 사이드바에 로딩
- 데이터셋 별로 저장된 chart 리스트 사이드바에 로드
- chart 선택 후 슬래시 커맨드를 통해 `plot` 입력 시 대시보드에 해당 플랏 끼워넣음

<br />



### Sign Up Page

<img width="1266" alt="Screenshot 2021-12-08 at 17 04 34" src="https://user-images.githubusercontent.com/49134038/145171427-f7f9c419-683b-4f6d-b82a-26a0af962d3a.png">

- 이메일/ 비밀번호 형식에 맞는 계정 등록 가능
- `express-validator` 를 이용한 에러 핸들링

<br />



#### Login Page

<img width="1266" alt="Screenshot 2021-12-08 at 17 04 20" src="https://user-images.githubusercontent.com/49134038/145171441-7aee8967-5e34-44d5-bc6b-f03c5e11810b.png">

- 로그인 시 사용자 정보 로드

- 비밀번호 찾기 기능

<br />



### My Page

<img width="1264" alt="마이페이지" src="https://user-images.githubusercontent.com/49134038/142229755-5fb2f296-0a52-4251-b172-7a69bd702a02.png">

- 계정 정보 업데이트



## Getting Started (local)

### Frontend

1. Clone this repo

```
git clone https://github.com/Ewha-BTS/ERP.git
```

2. Change folder directory

```
cd erp-client
```

3. Install project packages

```
npm i
```

4. Run (dev mode)

```
npm run dev
```

### 실행 방법 (local)

1. 이 저장소를 로컬 저장소에 클론한다.

`git clone https://github.com/Ewha-BTS/ERP.git`

2. requirements를 설치한다.

> 아나콘다 가상 환경에서 진행하는 것을 추천합니다.

* `cd ERP` ; 첫 번째 step에서 저장했던 폴더로 이동한다.

- `pip install -r requirements.txt`

3. `python server.py` or `python3 server.py` ; </br> 
############이 부분 노드 서버 실행 명령어 ############
서버를 실행한다.

- 실행 전 유의 사항
    - 학습한 모델은 깃허브 용량 초과(100MB 초과)로 인해 업로드하지 못하였습니다.
    - **아래 링크를 통해 모델을 다운로드하여 `/vizmodel` 폴더에 이동한 후 실행하셔야 정상적으로 작동합니다.** 
    - model이 없으면 작동하지 않습니다!!
    - https://drive.google.com/file/d/1mXan201jbXrmwkP1144P95vf9lMuh_v7/view?usp=sharing


4. 클라이언트를 실행한다.

* `cd erp-client` ; 클라이언트 폴더로 이동한다.

* `npm start`


<br>



## Tech Stack and Library

#### Front-end

- React.js
- Next.js
- TypeScript
- Recoil
- styled-components

```
"@fortawesome/fontawesome-svg-core": "^1.2.36",
"@fortawesome/free-brands-svg-icons": "^5.15.4",
"@fortawesome/free-regular-svg-icons": "^5.15.4",
"@fortawesome/free-solid-svg-icons": "^5.15.4",
"@fortawesome/react-fontawesome": "^0.1.15",
"fontsource-nunito-sans": "^4.0.0",
"fontsource-roboto": "^4.0.0",
"json-server": "^0.16.3",
"match-sorter": "^6.3.0",
"next": "11.1.0",
"next-cookies": "^2.0.3",
"next-images": "^1.8.1",
"react": "17.0.2",
"react-beautiful-dnd": "^13.1.0",
"react-contenteditable": "^3.3.6",
"react-dom": "17.0.2",
"react-vega": "^7.4.4",
"recoil": "^0.4.1",
"styled-components": "^5.3.0",
"vega": "^5.21.0",
"vega-lite": "^5.1.1"
```

<br />



#### Back-end

* node.js
* Python
* Flask
* MongoDB
* Tensorflow


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

- data2vis에서 사용된 데이터셋입니다. 

<br />



## License

Distributed under the MIT License. See `LICENSE` for more information.

