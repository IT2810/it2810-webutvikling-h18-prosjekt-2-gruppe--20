#! /bin/bash

NODE_ENV=production npm run build

scp -r build $DEPLOY_USER@it2810-20.idi.ntnu.no:~
