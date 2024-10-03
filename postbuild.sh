#!/bin/sh
cp server.js .amplify-hosting/compute/default
npm ci --omit dev
cp -r ./node_modules ./.amplify-hosting/compute/default/node_modules
cp -r public ./.amplify-hosting/static
cp package.json ./.amplify-hosting/compute/default/package.json
cp deploy-manifest.json ./.amplify-hosting/deploy-manifest.json