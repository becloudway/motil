#!/bin/bash


for f in ./packages/*; do
    cd $f
    echo "-- building and testing >> $f << --"
    npm run build
    cd ../..
done

echo "-- Commiting changes to GIT! --"

git add .
git commit

echo "-- Running lerna --"

npx lerna publish