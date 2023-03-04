FROM node:10-slim

EXPOSE 3000

# WORKDIR now creates with proper USER permissions, so this will work
USER node
WORKDIR /node

COPY package*.json ./

RUN npm install && npm cache clean --force

WORKDIR /node/app

COPY --chown=node:node . .

CMD ["node", "app.js"]
