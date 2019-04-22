FROM node:10-alpine

EXPOSE 3000

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./ 

RUN npm install && npm cache clean --force

COPY . .

CMD [ "node", "./bin/www" ]
