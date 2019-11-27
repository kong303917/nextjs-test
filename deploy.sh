#部署脚本
git pull &&

yarn install &&

pm2 start yarn --name "next-test" -- run start