const path = require('path');
const views = require('koa-views');
const Koa = require('koa');
const app = module.exports = new Koa();

// setup views, appending .ejs
// when no extname is given to render()

app.use(views(path.join(__dirname, '/views'), { extension: 'ejs' }));

// dummy data

const user = {
  name: {
    first: 'Tobi',
    last: 'Holowaychuk'
  },
  species: 'ferret',
  age: 3
};

// render

app.use(async function(ctx) {
<<<<<<< HEAD:exercise/hw4/app.js
=======
//  await ctx.render('user', { user });
>>>>>>> 4e97913555598c34a7c393d0ee4cf0213c705714:example/03-koa/08-templates/app.js
  await ctx.render('user2', { user });
});

if (!module.parent) app.listen(3000);
