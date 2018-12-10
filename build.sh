#!/bin/bash

set -e 1

for f in ./packages/*; do
    cd $f
    echo "-- building and testing >> $f << --"
    npm run build
    cd ../..
done