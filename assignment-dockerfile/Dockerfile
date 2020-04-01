# fill in the blanks to dockerize this node app
FROM node:10.19-alpine

# expose port 3000 for other containers to see (or to be published)
EXPOSE 3000

# set tini version
ENV TINI_VERSION 0.18.0-r0

# install tini dependencies and avoid cache
RUN apk update \
    && apk add tini=${TINI_VERSION} --no-cache

# create /node dir (owner: root)
WORKDIR /node

# make /node to be owned by node user
RUN chown -R node:node .

# change to node user
USER node

# copy package.json-related files with node as owner
COPY --chown=node:node package.json package-lock.json* ./

# install npm dependencies as node user
RUN npm install \
    && npm cache clean --force

# copy source code to /node as node user
COPY --chown=node:node . .

# run tini
ENTRYPOINT ["/sbin/tini", "--"]

# run app
CMD ["node", "./app.js"]
