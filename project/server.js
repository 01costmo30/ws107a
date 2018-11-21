const V = require('./view')
const M = require('./model')
const logger = require('koa-logger')
const router = require('koa-router')()
const koaBody = require('koa-body')
const path = require('path');
const fs = require('fs');

const Koa = require('koa')
const app = (module.exports = new Koa())

app.use(logger())
app.use(koaBody())

router
    .get('/', login)
    .get('/chat', open)
    .get('/chat/:id', show)
    .post('/login', signin)
    .get('/signup', signup)
    .get('/signup/send', suform)
    .get('/delete/:id', del)
    .post('/send/:id', send)
app.use(router.routes())

async function login(ctx) {
    ctx.body = await V.login()
}
async function signin(ctx) {
    const a = ctx.request.body
    const res = M.login(a)
    if (res) {
        ctx.redirect('/chat')
    }else {
        ctx.redirect('/')
    }
}

async function signup(ctx) {
    ctx.body = await V.signup()
}

async function suform(ctx) {
    const post = ctx.request.body
    M.signup(post)
    ctx.redirect('/chat')
}

async function open(ctx) {
    // if (ctx.params.chk) {
        const user = M.whoami()
        const facc = M.facc(user[0].friends)
        ctx.body = await V.open(user[0], facc)
    /* }else {
        ctx.redirect('/')
    } */
}

async function show(ctx) {
    const chat = M.list()
    const user = M.whoami()
    const facc = M.facc(user[0].friends)
    ctx.body = await V.show(chat, user[0], facc, ctx.params.id)
}

async function send(ctx) {
    const post = ctx.request.body
    const user = M.whoami()
    M.send(post, user[0], parseInt(ctx.params.id))
    ctx.redirect('/chat/'+ctx.params.id)
}

async function del(ctx) {
    const id = ctx.params.id
    const chat = M.delete(id)
    ctx.redirect('/')
}

if (!module.parent) {
  app.listen(3000)
  console.log('Server run at http://localhost:3000')
}
