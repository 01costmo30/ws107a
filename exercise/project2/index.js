var Koa = require('koa')
var serve = require('koa-static')
var app = new Koa()
var path = require('path')
var http = require('http')
var server = http.createServer(app.callback())
var io = require('socket.io')(server)
var port = process.env.PORT || 3000

const chat = []
const accs = [
  {id: 1, user:'iris', username:'Iris' , pass:'1111', friends:[2,3], mail:'', pics:'cat1494951740221.png' },
  {id: 2, user:'john', username:'John Doe' , pass:'doe', friends:[1], mail:'', pics:'meow.png' },
  {id: 3, user:'tom', username:'Tom' , pass:'123', friends:[1], mail:'', pics:'' }
]
const whosonline = [];

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

app.use(serve(path.join(__dirname, 'public')));

var numUsers = 0;

io.on('connection', (socket) => {
  // var addedUser = false;

  socket.on('new message', (data) => {
    sname = accs[data.send-1].username;
    spic = accs[data.send-1].pics;
    data.sname = sname;
    data.spic = spic;
    console.log(data);
    chat.push(data);
    socket.emit('message', data);
    socket.broadcast.emit('new message', data, chat.length);
  });
  socket.on('login', (data) => {
    for (let acc of accs) {
      if (data.user == acc.user) {
        if (data.pass == acc.pass) {
          error = 1;
          if (whosonline.length > 0) {
            console.log(data.user);
            for (let who of whosonline) {
              if (who.id == acc.id) {
                console.log('error: user '+ data.user +' login in different places at the same time.');
                socket.emit('send error', '該賬號已在別處登入！');
                error = 0;
              }
            }
          }if (error) {
            console.log('status: user '+ data.user +' login success:'+chat.length);
            whosonline.push({id: acc.id});
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
    console.log(whosonline);
    for (i=0;i<whosonline.length;i++) {
      if (whosonline[i].id == id) {
        whosonline.splice(i, 1);
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
      console.log(chat);
  })
  /*
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
  */
})