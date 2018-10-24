const Koa = require('koa');
const app = module.exports = new Koa();

app.use(async function(ctx) {
  // console.log('url=', ctx.url)
  switch (ctx.url) {
    case '/hello': ctx.type = 'text/html;charset=utf-8'; ctx.body = '你好'; break;
    case '/name' : ctx.type = 'text/html;charset=utf-8'; ctx.body = '陸佑函'; break;
    case '/id'   : ctx.type = 'text/html;charset=utf-8'; ctx.body = '110510501'; break;
    default : ctx.status = 404
  }
  // ctx.body = 'Hello World';
});

if (!module.parent) app.listen(3000);