const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    var css1 = fs.readFileSync("./style.css");
    var css2 = fs.readFileSync("./style2.css");
    var css3 = fs.readFileSync("./style3.css");
    var css4 = fs.readFileSync("./style4.css");
    var css5 = fs.readFileSync("./style5.css");
    switch (req.url) {
        case '/':
            res.writeHead(200, {"Content-Type": "text/html;charset='utf-8'"});
            res.end("<html><head><meta charset='utf-8'><title>In case you don't know where to go.</title><link rel='stylesheet' type='text/css' href='style.css'/></head><body><div style='background-color: #FFDE0B;'><a href='http://localhost:3000/hello'>Hello</a></div><div style='background-color: #A4FF30;'><a href='http://localhost:3000/name'>Name</a></div><div style='background-color: #30FFBA;'><a href='http://localhost:3000/id'>Id</a></div><div class='clear'></div></body></html>");
            break;
        case '/hello':
            res.writeHead(200, {"Content-Type": "text/html;charset='utf-8'"});
            res.end("<html><head><meta charset='utf-8'><title>Hello</title><link rel='stylesheet' type='text/css' href='style2.css'/></head><body><div class='subcontent'><span style=' font-size: 9vw; font-weight:bold;'>你好。</span><div class='clear'></div></div></body></html>");
            break;
        case '/name':
            res.writeHead(200, {"Content-Type": "text/html;charset='utf-8'"});
            res.end("<html><head><meta charset='utf-8'><title>My name</title><link rel='stylesheet' type='text/css' href='style3.css'/></head><body><div class='subcontent'><span style=' font-size: 6vw; font-weight:bold;'>我的名字:</span><span style=' font-size: 9.5vw;'>陸佑函</span><div class='clear'></div></div></body></html>");
            break;
        case '/id':
            res.writeHead(200, {"Content-Type": "text/html;charset='utf-8'"});
            res.end("<html><head><meta charset='utf-8'><title>My id</title><link rel='stylesheet' type='text/css' href='style4.css'/></head><body><div class='subcontent'><span style = 'font-size: 6vw; font-weight: bold;'>我的學號:</span><span style='font-size: 6vw;'>110510501</span><div class='clear'></div></div></body></html>");
            break;
        case '/style.css':
            res.writeHead(200, {"Content-Type": "text/css"});
            res.write(css1);
            res.end();
            break;
        case '/style2.css':
            res.writeHead(200, {"Content-Type": "text/css"});
            res.write(css2);
            res.end();
            break;
        case '/style3.css':
            res.writeHead(200, {"Content-Type": "text/css"});
            res.write(css3);
            res.end();
            break;
        case '/style4.css':
            res.writeHead(200, {"Content-Type": "text/css"});
            res.write(css4);
            res.end();
            break;
        case '/style4.css':
            res.writeHead(200, {"Content-Type": "text/css"});
            res.write(css5);
            res.end();
            break;
        default:
            res.writeHead(404, {"Content-Type": "text/html;charset='utf-8'"});
            res.end("<html><head><meta charset='utf-8'><title>404</title><link rel='stylesheet' type='text/css' href='style5.css'/></head><body><div class='subcontent'><span style = 'font-size: 10vw;'>404: </span><span style = 'font-size: 3vw;'>Oops! Wrong page.</span><div class='clear'></div></div></body></html>");
            break;
    }
    console.log("Request for " + req.url + " received.");
})

server.listen(3000);
console.log('Server running at http://localhost:3000/hello')