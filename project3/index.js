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
var MongoClient = require('mongodb').MongoClient;

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



/* const chat = []
const accs = [
  {id: 1, user:'iris', username:'Iris' , pass:'1111', friends:[2,3], mail:'', pics:'cat1494951740221.png' },
  {id: 2, user:'john', username:'John Doe' , pass:'doe', friends:[1], mail:'', pics:'meow.png' },
  {id: 3, user:'tom', username:'Tom' , pass:'123', friends:[1], mail:'', pics:'' }
]*/
const whosonline = [];
MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
  const db = client.db('Database');
  const chat = db.collection('chat');
  const accs = db.collection('accs');
  
  io.on('connection', (socket) => {
    socket.on('new message', (data) => {
      accs.find({id: data.send}).toArray((err, profile) => {
        sname = profile[0].username;
        spic = profile[0].pics;
        data.sname = sname;
        data.spic = spic;
        console.log('status: send message.');
        console.log(data);
        chat.insertOne(data);
        socket.emit('message', data);
        chat.aggregate([{ $group: { _id: null, maxId: { $max: "$id" } } }]).toArray((err, id) => {
          if (id.length > 0) {
            socket.broadcast.emit('new message', data, id[0].maxId+1);
          }else {
            socket.broadcast.emit('new message', data, 0);
          }
        })
      })
      /*
      sname = accs[data.send-1].username;
      spic = accs[data.send-1].pics;
      data.sname = sname;
      data.spic = spic;
      console.log('status: send message.');
      console.log(data);
      chat.insert(data);
      socket.emit('message', data);
      socket.broadcast.emit('new message', data, chat.length);
      */
    });
    socket.on('login', (data) => {
      accs.find({"user" : data.user, "pass" : data.pass}).toArray((err, acc) => {
        console.log(typeof(acc));
        if (typeof(acc) != 'undefined' && acc.length > 0) {
          noerror = 1;
          if (whosonline.length > 0) {
            for (let who of whosonline) {
              if (who.id == acc[0].id) {
                console.log('error: user ' + acc[0].user +' login in dirrerent places at the same time.');
                socket.emit('send error', '該賬號已在別處登入！');
                noerror = 0;
              }
            }
          }if (noerror) {
            whosonline.push({id: acc[0].id});
            console.log("status: who's online now?");
            console.log(whosonline);
            var data = {
              id: acc[0].id,
              username: acc[0].username,
              friends: [],
              pics: acc[0].pics
            };
            accs.find().toArray((err, friends) => {
              for (let friend of friends) {
                for (i=0;i<acc[0].friends.length;i++) {
                  if (friend.id == acc[0].friends[i]) {
                    data.friends.push({id: friend.id, username: friend.username, pics: friend.pics});
                  }
                }
              }
              chat.aggregate([{ $group: { _id: null, maxId: { $max: "$id" } } }]).toArray((err, id) => {
                if (id.length) {
                  socket.emit('sign in', data, id[0].maxId+1);
                  console.log('status: user ' + data.user + ' login success/column number:' + id[0].maxId+1);
                }else {
                  socket.emit('sign in', data, 0);
                  console.log('status: user ' + data.user + ' login success/column number:' + 0);
                }
              })
            })
          }
        }else {
          socket.emit('send error', '賬號或密碼有誤');
        }
      })
      
      /*
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
      } */
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
      chat.find().toArray((err, chats) => {
        console.log(chats.length);
        if (chats.length > 0) {
          socket.emit('empty');
          for (let chatbox of chats) {
            if (chatbox) {
              if (uid == chatbox.rece) {
                socket.emit('message', chatbox);
              }else if (uid == chatbox.send) {
                chat.aggregate([{ $group: { _id: null, maxId: { $max: "$id" } } }]).toArray((err, id) => {
                  if (id.length > 0) {
                    socket.emit('new message', chatbox, id[0].maxId+1);
                  }else {
                    socket.emit('new message', chatbox, 0);
                  }
                })
              }
            }
          }
        }else {
          socket.emit('empty');
        }
      })
      /*
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
      }*/
    })

    socket.on('delete message', (tid) => {
      tid = parseInt(tid);
      chat.find({"id" : tid}).toArray((err, chats) => {
        console.log(chats);
        if (chats.length > 0) {
          chat.remove(chats[0]);
          socket.broadcast.emit('delete M', tid);
          console.log('status: delete message:'+ tid);
          console.log(chats);
        }
      })
      /*
      chat[id] = null;
      socket.broadcast.emit('delete M', id);
      console.log('status: show full chat message.');
      console.log(chat);
      */
    })
    /*  ↓↓↓ not right? ↓↓↓
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
    */
  })

  io.of('/signup').on('connection', (socket) => {
    socket.on('sign up', (data) => {
      accs.find({"user": data.user}).toArray((err, match) => {
        if (match.length != 0) {
          accs.aggregate([{ $group: { _id: null, maxId: { $max: "$id" } } }]).toArray((err, aid) => {
            pinfo = {
              id: aid+1,
              user: data.user,
              username: data.username,
              pass: data.pass,
              email: data.mail,
              pics: data.pics
            }
            accs.insertOne()
          })
        }
      })
    })
  })
})