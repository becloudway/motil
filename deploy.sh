#!/bin/bash


for f in ./packages/*; do
    cd $f
    echo "-- building and testing >> $f << --"
    npm run build
    cd ../..
done

echo "-- running lerna! --"

git add .
git commit

npx lerna publish