const http = require('http');
const url = require('url'); 

const server = http.createServer((req, res) => {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
    switch (pathname) {
        case '/hello':
            res.writeHead(200, {"Content-Type": "text/html;charset='utf-8'"});
            res.end("<html><head><meta charset='utf-8'><title>Hello</title><style>body {background-color: #FFDE0B; font-family: consolas;}.subcontent{transform: translate(-50%,-50%);position: absolute;display: table-cell;padding: 50px 40px;width: 30%;top: 50%;left: 50%;}.subcontent span{float: left; width: 100%; text-align: center;}.clear {clear: both;}</style></head><body><div class='subcontent'><span style=' font-size: 9vw; font-weight:bold;'>你好。</span><div class='clear'></div></div></body></html>");
            break;
        case '/name':
            res.writeHead(200, {"Content-Type": "text/html;charset='utf-8'"});
            res.end("<html><head><meta charset='utf-8'><title>My name</title><style>body {background-color: #A4FF30; font-family: consolas;}.subcontent{transform: translate(-50%,-50%);position: absolute;display: table-cell;padding: 50px 40px;width: 30%;top: 50%;left: 50%;}.subcontent span{float: left; width: 100%;}.clear {clear: both;}</style></head><body><div class='subcontent'><span style=' font-size: 6vw; font-weight:bold;'>我的名字:</span><span style=' font-size: 9.5vw;'>陸佑函</span><div class='clear'></div></div></body></html>");
            break;
        case '/id':
            res.writeHead(200, {"Content-Type": "text/html;charset='utf-8'"});
            res.end("<html><head><meta charset='utf-8'><title>My id</title><style>body {background-color: #30FFBA; font-family: consolas;}.subcontent{transform: translate(-50%,-50%);position: absolute;display: table-cell;padding: 40px 40px;width: 30%;top: 50%;left: 50%;}.subcontent span{float: left; width: 100%;}.clear {clear: both;}</style></head><body><div class='subcontent'><span style = 'font-size: 6vw; font-weight: bold;'>我的學號:</span><span style='font-size: 6vw;'>110510501</span><div class='clear'></div></div></body></html>");
            break;
        default:
            res.writeHead(404, {"Content-Type": "text/html;charset='utf-8'"});
            res.end("<html><head><meta charset='utf-8'><title>404</title><style>body {background-color: #30E6FF;}.subcontent{transform: translate(-50%,-50%);position: absolute;display: table-cell;padding: 50px 40px;width: 30%;top: 50%;left: 50%;}.subcontent span{float: left; width: 100%;}.clear {clear: both;}</style></head><body><div class='subcontent'><span style = 'font-size: 10vw;'>404: </span><span style = 'font-size: 3vw;'>Oops! Wrong page.</span><div class='clear'></div></div></body></html>");
            break;
    }
})

server.listen(3000);
console.log('Server running at http://localhost:3000/hello')