#!/bin/sh
cp server-base.js .amplify-hosting/compute/default
cp -r ./node_modules ./.amplify-hosting/compute/default/node_modules
cp -r public ./.amplify-hosting/static
cp deploy-manifest.json ./.amplify-hosting/deploy-manifest.json
cp package.json ./.amplify-hosting/compute/default/package.json
cd .amplify-hosting/compute/default
node_modules/.bin/esbuild --bundle server-base.js --outfile=server.cjs --platform=node --external:pkg --external:lightningcss --external:vite
rm -rf node_modules