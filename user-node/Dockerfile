FROM node:10-slim

EXPOSE 3000

WORKDIR /node

COPY package*.json ./

RUN npm install && npm cache clean --force

WORKDIR /node/app

COPY . .

CMD ["node", "app.js"]
