const Router = require('express').Router();
const user = require('./controllers/user');

Router.use('/user', user);

module.exports = Router;