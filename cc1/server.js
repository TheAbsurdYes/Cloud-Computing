const http = require('http');

const { apiController } = require('./controllers/apiController')


const hostname = '127.0.0.1';
const port = 6000;

const server = http.createServer(async (req, res) => {
  if (req.url === '/api/geekJoke' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ text: await apiController() }) );
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
