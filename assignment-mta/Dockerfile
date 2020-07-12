FROM node:8

RUN apt-get update && apt-get install -y graphicsmagick

WORKDIR /app

RUN chown -R node:node .

USER node

COPY --chown=node:node package.json package-lock*.json ./

RUN npm install \
    && npm cache clean --force

COPY --chown=node:node . .

ENV CHARCOAL_FACTOR 0.1

CMD [ "node", "index.js" ]
