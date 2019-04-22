FROM node:10

# set this with shell variables at build-time.
# If they aren't set, then not-set will be default.
ARG CREATED_DATE=not-set
ARG SOURCE_COMMIT=not-set

# labels from https://github.com/opencontainers/image-spec/blob/master/annotations.md
LABEL org.opencontainers.image.authors=bret@bretfisher.com
LABEL org.opencontainers.image.created=$CREATED_DATE
LABEL org.opencontainers.image.revision=$SOURCE_COMMIT
LABEL org.opencontainers.image.title="Sample Node.js Dockerfile with LABELS"
LABEL org.opencontainers.image.url=https://hub.docker.com/r/bretfisher/jekyll
LABEL org.opencontainers.image.source=https://github.com/BretFisher/udemy-docker-mastery-for-nodejs
LABEL org.opencontainers.image.licenses=MIT
LABEL com.bretfisher.nodeversion=$NODE_VERSION

WORKDIR /app

COPY index.js .

CMD ["node", "index.js"]
