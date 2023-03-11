## Stage 1 (production base)
# This gets our dependencies installed and out of the way
FROM node:10-alpine as base

EXPOSE 3000

ENV NODE_ENV=production

WORKDIR /opt

COPY package*.json ./

RUN npm config list \
    && npm ci \
    && npm cache clean --force


## Stage 2 (development)
# we don't COPY in this stage because for dev you'll bind-mount anyway
# this saves time when building locally for dev via docker-compose
# if buildkit is enabled and used with a supporting version of docker-compose
FROM base as dev

ENV NODE_ENV=development

ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt

RUN npm config list \
    && npm install \
    && npm cache clean --force

WORKDIR /opt/app

CMD ["nodemon", "./bin/www", "--inspect=0.0.0.0:9229"]


## Stage 3 (intermediate)
# This gets our source code into builder for use in next two stages
# It gets its own stage so we don't have to copy twice
FROM base as interm

WORKDIR /opt/app

COPY . .


## Stage 4 (testing)
# use this in automated CI
# it has prod and dev npm dependencies
# In 18.09 or older builder, this will always run
# In BuildKit, this will be skipped by default 
FROM interm as test

CMD ["npm", "test"]


## Stage 5 (default, production)
# this will run by default if you don't include a target (BuildKit)
# it has prod-only dependencies
# In BuildKit, this is skipped for local dev
# you could run tini here, but zombie reaping isn't usually 
# an issue with node, and as long as you handle signals in code
# you don't need tini
FROM interm as prod

CMD ["node", "./bin/www"]
