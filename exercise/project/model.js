const M = module.exports = {}

const chat = []
const accs = [
    {id: 1, user:'iris', username:'Iris' , pass:'1111', friends:[2], mail:'', pics:'tako.png' },
    {id: 2, user:'john', username:'John Doe' , pass:'doe', friends:[1], mail:'', pics:'' }
]
const who = []

M.list = function () {
    return chat
}
M.facc = function (a) {
    const facc = []
    for (i=0;i<a.length;a++) {
        for (let acc of accs) {
            if (a[i]==acc.id) {
                b = {id:acc.id, username:acc.username}
                facc.push(b)
            }
        }
    }
    return facc
}
M.whoami = function () {
    return who
}
M.send = function (chatbox, user, rece) {
    const id = chat.push(chatbox) - 1
    const time = new Date();
    chatbox.send = user.id;
    chatbox.rece = rece;
    chatbox.date = {YYYY: time.getFullYear(), mm: time.getMonth(), dd: time.getDate()}
    chatbox.time = {hour: time.getHours(), minute: time.getMinutes()}
    chatbox.id = id
    console.log(chat)
}
M.delete = function (id) {
    chat.splice(id, 1, null)
    console.log(chat)
}
M.login = function (a) {
    for (let acc of accs) {
        if (acc.user==a.u&&acc.pass==a.p) {
            who.splice(0, 1, acc)
            console.log('user ',acc.user, 'successfully login!');
            return acc.id;
        }
    }
    console.log('oh no!something wrong!');
    return 0;
}
M.signup = function (x) {
    
}