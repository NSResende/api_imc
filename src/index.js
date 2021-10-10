const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
app.use(bodyParser());

const router = new Router();

const PORT = process.env.PORT || 3000,

importRoutes = require('./controllers/controllers');
app.use(importRoutes.routes());

const server = app.listen(`${PORT}`);
module.exports = server;