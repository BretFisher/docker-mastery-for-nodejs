FROM node:10-slim

EXPOSE 3000

WORKDIR /node

COPY package*.json ./
RUN mkdir app && chown -R node:node .
USER node
RUN npm install && npm cache clean --force

WORKDIR /node/app

COPY --chown=node:node . .

CMD ["node", "app.js"]
