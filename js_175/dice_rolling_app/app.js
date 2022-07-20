const HTTP = require('http');
const URL = require('url').URL;

const PORT = 3000;

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

const SERVER = HTTP.createServer((req, res) => {

  let method = req.method;
  let path = req.url;

  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    const myURL = new URL(path, 'http://localhost:3000');
    const params = myURL.searchParams;
    const sides = params.get('sides');


    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    for (let index = 0; index < params.get('rolls'); index++) {
      res.write(`${rollDie(sides)}\n`);
    }
    res.write(`${method}\n`);
    res.write(`${path}\n`);
    res.end();
  }

});


SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});