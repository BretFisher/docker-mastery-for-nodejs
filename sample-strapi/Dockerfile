FROM node:14-bullseye

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

EXPOSE 1337

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

CMD ["node", "server.js"]
