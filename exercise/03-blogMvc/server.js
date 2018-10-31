const V = require('./view')
const M = require('./model')
const logger = require('koa-logger')
const router = require('koa-router')()
const koaBody = require('koa-body')

const Koa = require('koa')
const app = (module.exports = new Koa())

app.use(logger())
app.use(koaBody())

router
  .post('/post/change/:id', change)
  .get('/post/edit/:id', edit)
  .get('/post/:id', show)
  .post('/post', create)
  .get('/post/new', add)
  .get('/', list)

app.use(router.routes())

async function list (ctx) {
  const posts = M.list()
  ctx.body = await V.list(posts)
}

async function add (ctx) {
  ctx.body = await V.new()
}

async function show (ctx) {
  const id = ctx.params.id
  const post = M.get(id)
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.body = await V.show(post)
}

async function edit (ctx) {
  const id = ctx.params.id
  const post = M.get(id)
  ctx.body = await V.edit(post)
}

async function change (ctx) {
  const post = ctx.request.body
  post.id = ctx.params.id
  M.edit(post)
  ctx.redirect('/')
}

async function create (ctx) {
  const post = ctx.request.body
  M.add(post)
  ctx.redirect('/')
}

if (!module.parent) {
  app.listen(3000)
  console.log('Server run at http://localhost:3000')
}
