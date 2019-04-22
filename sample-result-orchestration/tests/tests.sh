#!/bin/sh

while ! timeout 1 bash -c "echo > /dev/tcp/vote/80"; do
    sleep 1
done

curl -sS -X POST --data "vote=b" http://vote > /dev/null
sleep 10

if phantomjs ./tests/render.js http://localhost | grep -q '0 vote'; then
  echo -e "\\e[41m------------"
  echo -e "\\e[91mTests failed"
  echo -e "\\e[41m------------"
  exit 1
else
  echo -e "\\e[42m------------"
  echo -e "\\e[92mTests passed"
  echo -e "\\e[42m------------"
  exit 0
fi
