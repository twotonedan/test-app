#!/bin/bash

set -e -u -x

PROJECT=$1

cd $PROJECT

npm install

npm run build

aws s3 cp dist/ s3://frontend.dev.stellarims.com/ --recursive

aws cloudfront create-invalidation --distribution-id E2HUS8EQ79BO6B --paths "/*" > output.txt

cat output.txt
