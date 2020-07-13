# stage 1 (base)
FROM node:8 as base

# labels
LABEL org.opencontainers.image.authors=alejandrorodarte1@gmail.com
LABEL org.opencontainers.image.title="Node.js Ultimate Dockerfile"
LABEL org.opencontainers.image.licenses=MIT
LABEL com.rodarte.nodeversion=$NODE_VERSION

# results service will work on port 8080 at container level
EXPOSE 8080

# set environment keyword, port, tini version and path
ENV NODE_ENV production
ENV PORT 8080
ENV TINI_VERSION v0.18.0
ENV PATH /app/node_modules/.bin:$PATH

# set workdir
WORKDIR /app

# make /app owned by node user
RUN chown -R node:node .

# download tini
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini

# make tini executable
RUN chmod +x /tini

# copy package.json
COPY --chown=node:node package.json package-lock.json* ./

# install prod dependencies
RUN npm config list \
    && npm ci \
    && npm cache clean --force

# run tini
ENTRYPOINT [ "/tini", "--" ]

# ---

# stage 2 (dev)
FROM base as dev

# set environment keyword
ENV NODE_ENV development

# NOTE: these apt dependencies are only needed
# for testing. they shouldn't be in production
RUN apt-get update -qq && apt-get install -qy \ 
    ca-certificates \
    bzip2 \
    curl \
    libfontconfig \
    --no-install-recommends

# install dev dependencies
RUN npm config list \
    && npm install --only=development \
    && npm cache clean --force

# change to user node
USER node

# run nodemon
CMD [ "nodemon", "server.js", "--inspect=0.0.0.0:9229" ]

# ---

# stage 3 (source)
FROM base as source

# copy source code, node should be owner
COPY --chown=node:node . .

# ---

# stage 4 (test)
FROM source as test

# set environment keyword
ENV NODE_ENV development

# copy prod+dev dependencies
COPY --chown=node:node --from=dev /app/node_modules /app/node_modules

# run test command
CMD [ "npm", "run", "test" ]

# ---

# stage 5 (audit)
FROM test as audit

# execute npm audit
CMD [ "npm", "audit" ]

# ---

# stage 6 (prod)
FROM source as prod

# basic test for container working
HEALTHCHECK --interval=5s --timeout=3s --start-period=1s --retries=3 CMD curl -f http://localhost/ || exit 1

# delete /tests dir
RUN rm -rf ./tests

# change to user node
USER node

# run node process
CMD [ "node", "server.js" ]