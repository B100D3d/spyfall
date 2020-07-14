FROM node:14.5

ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src/app

COPY . .

RUN npm i

EXPOSE 3001

RUN npm run build

CMD npm run start

