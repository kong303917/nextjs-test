"use strict";
exports.__esModule = true;
var express = require('express');
var next = require('next');
var dev = process.env.NODE_ENV !== 'production';
var app = next({ dev: dev });
var handle = app.getRequestHandler();
app
    .prepare()
    .then(function () {
    serverRun();
})["catch"](function (ex) {
    console.log(ex.stack);
    process.exit(1);
});
function serverRun() {
    var server = express();
    // 接口
    var controllers = require('./server/controller');
    var apiRoute = ''; // '/web';
    server.use(apiRoute, controllers);
    // 匹配URL为 `/` 的路由，然后渲染 `/` 对应的 `page/index.tsx` 文件
    server.get('/', function (req, res) {
        app.render(req, res, '/');
    });
    // 匹配URL为 `/about` 的路由，然后渲染 `/about` 对应的 `page/about.tsx` 文件
    server.get('/about', function (req, res) {
        app.render(req, res, '/about');
    });
    // 匹配URL为 `/detail/:id` 的路由，添加 `params 参数`，然后渲染 `/detail` 对应的 `page/detail.tsx` 文件
    server.get('/detail/:id', function (req, res) {
        app.render(req, res, '/detail', {
            id: req.params.id
        });
    });
    server.get('*', function (req, res) {
        return handle(req, res);
    });
    server.listen(3000, function (err) {
        if (err)
            throw err;
        console.log('> Ready on http://localhost:3000');
    });
}