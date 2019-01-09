var Koa = require('koa')
var serve = require('koa-static')
var session = require('koa-session')
var app = new Koa()
var path = require('path')
var http = require('http')
var fs = require('fs')
var server = http.createServer(app.callback())
var io = require('socket.io')(server)
var port = process.env.PORT || 3000

app.keys = ['my little secret'];

const CONFIG = {
  key: 'kdlasfe,dalj.amvlkdajfas', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */
}

app.use(session(CONFIG, app))

server.listen(port, () => {
  console.log('status: Server listening at port %d', port);
});

app.use(serve(path.join(__dirname, 'public')));

const chat = []
const accs = [
  {id: 1, user:'iris', username:'Iris' , pass:'1111', friends:[2,3], mail:'', pics:'cat1494951740221.png' },
  {id: 2, user:'john', username:'John Doe' , pass:'doe', friends:[1], mail:'', pics:'meow.png' },
  {id: 3, user:'tom', username:'Tom' , pass:'123', friends:[1], mail:'', pics:'' }
]
const whosonline = [];

io.on('connection', (socket) => {
  socket.on('new message', (data) => {
    sname = accs[data.send-1].username;
    spic = accs[data.send-1].pics;
    data.sname = sname;
    data.spic = spic;
    console.log('status: send message.');
    console.log(data);
    chat.push(data);
    socket.emit('message', data);
    socket.broadcast.emit('new message', data, chat.length);
  });
  socket.on('login', (data) => {
    for (let acc of accs) {
      if (data.user == acc.user) {
        if (data.pass == acc.pass) {
          noerror = 1;
          if (whosonline.length > 0) {
            for (let who of whosonline) {
              if (who.id == acc.id) {
                console.log('error: user '+ data.user +' login in different places at the same time.');
                socket.emit('send error', '該賬號已在別處登入！');
                noerror = 0;
              }
            }
          }if (noerror) {
            console.log('status: user '+ data.user +' login success:'+chat.length);
            whosonline.push({id: acc.id});
            console.log("status: who's online now?");
            console.log(whosonline);
            var data = {
                id: acc.id,
                username: acc.username,
                friends: [],
                pics: acc.pics
            };
            for (let friend of accs) {
                for (i=0;i<acc.friends.length;i++) {
                    if (friend.id == acc.friends[i]) {
                      data.friends.push({id: friend.id, username: friend.username, pics: friend.pics});
                    }
                }
            }
            socket.emit('sign in', data, chat.length);
          }
        }else {
          socket.emit('send error', '賬號或密碼有誤');
        }
      }
    }
  })

  socket.on('logout', (id) => {
    console.log('status: user id '+id+' has logout.');
    for (i=0;i<whosonline.length;i++) {
      if (whosonline[i].id == id) {
        whosonline.splice(i, 1);
        console.log("status: who's online now?");
        console.log(whosonline);
      }
    }
  })

  socket.on('show message', (uid) => {
    if (chat.length > 0) {
      socket.emit('empty');
      for (let chatbox of chat) {
        if (chatbox) {  
            if (uid == chatbox.rece) {
            socket.emit('message', chatbox);
            }else if (uid == chatbox.send) {
                socket.emit('new message', chatbox, chat.length);
            }
        }
      }
    }else {
      socket.emit('empty');
    }
  })

  socket.on('delete message', (id) => {
      chat[id] = null;
      socket.broadcast.emit('delete M', id);
      console.log('status: show full chat message.');
      console.log(chat);
  })
  //  ↓↓↓ not right? ↓↓↓
  socket.on('isonline', (w) => {
    console.log(w);
    if (typeof(w) != "undefined" && w != null) {
      for (let acc of accs) {
        if (acc.id == w) {
          var data = {
                id: acc.id,
                username: acc.username,
                friends: [],
                pics: acc.pics
            };
            for (let friend of accs) {
                for (i=0;i<acc.friends.length;i++) {
                    if (friend.id == acc.friends[i]) {
                      data.friends.push({id: friend.id, username: friend.username, pics: friend.pics});
                    }
                }
            }
            socket.emit('sign in', data, chat.length);
        }
      }
    }
  })
  
  // ↓↓↓ not right ↓↓↓
  // socket.on('disconnect', () => {
    // console.log('status: user id '+socket.online+' has disconnect.');
    /*
    for (let acc of accs) {
      if (socket.online == acc.id) {
        var data = {
            id: acc.id,
            username: acc.username,
            friends: [],
            pics: acc.pics
        };
        for (let friend of accs) {
            for (i=0;i<acc.friends.length;i++) {
                if (friend.id == acc.friends[i]) {
                  data.friends.push({id: friend.id, username: friend.username, pics: friend.pics});
                }
            }
        }
      }
    }
    socket.emit('sign in', data, chat.length);
    *//*
    for (i=0;i<whosonline.length;i++) {
      if (whosonline[i].id == socket.online) {
        whosonline.splice(i, 1);
        console.log("status: who's online now?");
        console.log(whosonline);
        console.log(socket.online);
      }
    }
  });*/
})