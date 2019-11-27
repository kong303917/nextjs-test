const express = require('express');
const next = require('next');
import * as http from "http";

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

interface Req extends http.IncomingMessage {
  params?: any,
}

app
  .prepare()
  .then(() => {
    serverRun();
  })
  .catch((ex: any) => {
    console.log(ex.stack);
    process.exit(1);
  });
  
function serverRun() {
  const server = express();
  // api接口
  const controllers = require('./server/controller');
  const apiRoute = ''; // '/web';
  server.use(apiRoute, controllers);

  // 匹配URL为 `/` 的路由，然后渲染 `/` 对应的 `page/index.tsx` 文件
  server.get('/', (req: Req, res: http.ServerResponse) => {
    app.render(req, res, '/')
  });

  // 匹配URL为 `/about` 的路由，然后渲染 `/about` 对应的 `page/about.tsx` 文件
  server.get('/about', (req: Req, res: http.ServerResponse) => {
    app.render(req, res, '/about')
  });

  // 匹配URL为 `/detail/:id` 的路由，添加 `params 参数`，然后渲染 `/detail` 对应的 `page/detail.tsx` 文件
  server.get('/detail/:id', (req: Req, res: http.ServerResponse) => {
    app.render(req, res, '/detail', {
      id: req.params.id
    })
  });

  server.get('*', (req: http.IncomingMessage, res: http.ServerResponse) => {
    return handle(req, res);
  });

  server.listen(3000, (err: any) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
}