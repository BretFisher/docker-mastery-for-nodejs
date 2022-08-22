FROM node:8.9-slim

# hadolint ignore=DL3009
RUN apt-get update -qq && apt-get install -qy \ 
    ca-certificates \
    bzip2 \
    curl \
    libfontconfig \
    --no-install-recommends
RUN yarn global add phantomjs-prebuilt
COPY . /app
WORKDIR /app
CMD ["/app/tests.sh"]
