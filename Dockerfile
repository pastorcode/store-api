FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g typescript

RUN rimraf dist/

RUN tsc

CMD ["npm", "start"]
