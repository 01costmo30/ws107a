var V = module.exports = {}

V.layout = function (content) {
    return `
    <html>
        <head>
            <title>多人聊天室</title>
            <style>
                html {
                    scroll-behavior: smooth;
                }
                body, #content {
                    font-family: consolas;
                    overflow: hidden;
                }
                h1 {
                    margin: 0 auto;
                }
                form span {
                    margin: 0 0 10px 0;
                    float: left;
                    width: 100%;
                }
                #person {
                    border-width: 0 1px 0 0;
                    border-style: solid;
                    float: left;
                    height: calc(100% - 90px);
                    width: 10%;
                }
                #chatroom {
                    max-height: calc(100% - 90px);
                    min-height: 50%;
                    height: calc(100% - 90px);
                    max-width: 30%;
                    overflow: auto;
                    padding: 10px;
                    float: left;
                }
                #send {
                    float: left;
                    position: fixed;
                    bottom: 0;
                    margin: 0 0 15px 20px;
                    left: 10%;
                }
                .date {
                    background-color: gray;
                    border-radius: 15px;
                    font-family: consolas;
                    font-size: 10px;
                    padding: 2px 6px;
                    margin: 0 0 10px 0;
                    color: #ffffff;
                    float: left;
                }
                .chatbox {
                    min-height: 30px;
                    margin: 0 0 10px 0;
                    width: 100%;
                    float: left;
                }
                .cont, button, input {
                    background-color: #000000;
                    border-radius: 20px;
                    font-family: consolas;
                    font-size: 12px;
                    padding: 8px;
                    border: 0;
                    color: #ffffff;
                }
                .cont {
                    overflow-wrap: break-word;
                    table-layout: fixed;
                    word-break: break-all;
                    word-wrap: break-word;
                    max-width: calc(30% - 100px);
                    min-height: 24px;
                }
                .time, .delete {
                    font-size: 10px;
                    color: lightgray;
                }
                input {
                    margin-right: 10px;
                }
                .clear {
                    clear: both;
                }
            </style>
        </head>
        <body onload="scroll()">
            <div id="content">
                ${content}
            </div>
            <script>
                function scroll() {
                    document.getElementById("chatroom").scrollTop = document.getElementById("chatroom").scrollHeight;
                }
            </script>
        </body>
    </html>`
}

V.open = function (user, facc) {
    let f = []
    for (i=0;i<facc.length;i++) {
        f.push(`<span class="friend"><a href='/chat/${facc[i].id}'>${facc[i].username}</a></span>`)
    }
    let cont = `
    <h1>ChatRoom</h1>
    <div id="person">
        ${f.join('\n')}
    </div>
    <div id="chatroom">
        Let's chat!
        <span class="clear"></span>
    </div>
    <div class="clear"></div>
    `
    return V.layout(cont)
}

V.show = function (chat, user, facc, id) {
    let list = []
    let f = []
    let date = []
    for (i=0;i<facc.length;i++) {
        f.push(`<span class="friend"><a href='/chat/${facc[i].id}'>${facc[i].username}</a></span>`)
    }
    for (let chatbox of chat) {
        if (chatbox && (chatbox.send==user.id||chatbox.rece==user.id)) {
            if (date.length==0) {
                date.push(chatbox.date)
                list.push(`<span class="date">${chatbox.date.YYYY}/${chatbox.date.mm}/${chatbox.date.dd}</span>`)
            }else if (JSON.stringify(date[0])!=JSON.stringify(chatbox.date)) {
                console.log('date change:',date[0],'-->',chatbox.date)
                date.splice(0, 1, chatbox.date)
                list.push(`<span class="date">${chatbox.date.YYYY}/${chatbox.date.mm}/${chatbox.date.dd}</span>`)
            }
            if (chatbox.time.hour<10) {
                if (chatbox.time.minute<10) {
                    list.push(`
                        <span class="chatbox">
                            <span class="cont">${chatbox.content}</span>
                            <span class="time">0${chatbox.time.hour}:0${chatbox.time.minute}</span>
                            <span class="delete"><a href="/delete/${chatbox.id}">刪除</a></span>
                            <span class="clear"></span>
                        </span>
                    `)
                }else {
                    list.push(`
                        <span class="chatbox">
                            <span class="cont">${chatbox.content}</span>
                            <span class="time">0${chatbox.time.hour}:${chatbox.time.minute}</span>
                            <span class="delete"><a href="/delete/${chatbox.id}">刪除</a></span>
                            <span class="clear"></span>
                        </span>
                    `)
                }
            }else if (chatbox.time.minute<10) {
                list.push(`
                    <span class="chatbox">
                        <span class="cont">${chatbox.content}</span>
                        <span class="time">${chatbox.time.hour}:0${chatbox.time.minute}</span>
                        <span class="delete"><a href="/delete/${chatbox.id}">刪除</a></span>
                        <span class="clear"></span>
                    </span>
                `)
            }else {
                list.push(`
                    <span class="chatbox">
                        <span class="cont">${chatbox.content}</span>
                        <span class="time">${chatbox.time.hour}:${chatbox.time.minute}</span>
                        <span class="delete"><a href="/delete/${chatbox.id}">刪除</a></span>
                        <span class="clear"></span>
                    </span>
                `)
            }
        }
    }
    let cont = `
    <h1>ChatRoom</h1>
    <div id="person">
        ${f.join('\n')}
    </div>
    <div id="chatroom">
        ${list.join('\n')}
        <span class="clear"></span>
    </div>
    <form id="send" action="/send/${id}" method="post">
        <input type="text" name="content"><input type="submit" value="send>">
    </form>
    <div class="clear"></div>
    `
    return V.layout(cont)
} 

V.login =  function () {
    let cont = `
    <h1>Login</h1>
    <form action="/login" method="post">
        <span>賬號：<input type="text" name="u"></span>
        <span>密碼：<input type="password" name="p"></span>
        <input type="submit" value="send>">還沒注冊？<a href="/signup">注冊</a>
        <span class="clear"></span>
    </form>
    `
    return V.layout(cont)
}

V.signup = function () {
    let cont = `
    <h1>Login</h1>
    <div id="chatroom">
        <form action="/signup/send" method="post">
            <span>賬號：<input type="text" name="u"></span>
            <span>密碼：<input type="password" name="p1"></span>
            <span>確認密碼：<input type="password" name="p2"></span>
            <input type="submit" value="send>">
            <span class="clear"></span>
        </form>
    </div>
    `
    return V.layout(cont)
}