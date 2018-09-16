const http = require('http');

const port = 3000, hostname = 'localhost'

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<p>Hello World\n</p><a href="http://www.youtube.com">Youtube</a>');
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});