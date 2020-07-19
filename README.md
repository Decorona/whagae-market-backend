# whagae-market-backend
whagae-market-backend

코로나로 어려움에 처한 소상공인을 돕기 위한 앱 화개장터 입니다

화개장터의 백엔드는 

nodejs 웹 프레임워크인 express를 이용하여 개발하였습니다.

database는 mariadb를 사용하였으며

db orm은 sequelize를 사용하였습니다

백엔드 서버를 기동하기 위한 명령어는 아래와 같습니다

git clone

npm i 

npm start

( docker option )

docker build -t snpo/hwagae .

docker push snpo/hwagae

docker run -d -p 80:3000 snpo/hwagae

docker ps

docker logs -f 'container_name'



[![Run on Ainize](https://ainize.ai/static/images/run_on_ainize_button.svg)](https://ainize.web.app/redirect?git_repo=github.com/Decorona/whagae-market-backend)

