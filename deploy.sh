#!/bin/bash

npx lerna run build

echo "-- Commiting changes to GIT! --"

git add .
git commit

echo "-- Running lerna --"

npx lerna publish