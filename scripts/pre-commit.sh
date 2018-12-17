#!/usr/bin/env bash

FILES=`git diff --cached --name-only | grep -E "^[^_]*\.ts[x]?$"`;

if [ "$FILES" ];
then
     npm run lint:fix -- $FILES;
fi;