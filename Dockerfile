FROM node:alpine

RUN mkdir /app

WORKDIR /app
ADD ./package.json /app/package.json
ADD ./process.json /app/process.json

RUN npm install

EXPOSE 5000

CMD npm run build:run
