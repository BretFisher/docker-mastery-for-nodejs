FROM node:10.15-slim

ENV NODE_ENV=production

WORKDIR /node

COPY package.json package-lock*.json ./

RUN npm install && npm cache clean --force

WORKDIR /node/app

COPY . .

CMD ["node", "./bin/www"]
