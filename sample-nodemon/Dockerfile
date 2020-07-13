FROM node:10.15-slim

ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock*.json ./

RUN npm install && npm cache clean --force

ENV PATH /app/node_modules/.bin/:$PATH

COPY . .

CMD ["node", "./bin/www"]
