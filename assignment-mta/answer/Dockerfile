# this is an answer file for Assignment Migrating Traditional Apps
# move it up a directory for it to work
FROM node:8

RUN apt-get update && apt-get install -y graphicsmagick

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV CHARCOAL_FACTOR=0.1

CMD ["node", "index.js"]
