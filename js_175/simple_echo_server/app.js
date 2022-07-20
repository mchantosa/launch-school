const HTTP = require('http');
const PORT = 3000;


const SERVER = HTTP.createServer((req, res) => {

  /**
   * Most browser will automatically request a favicon.ico
   * file after the initial request is made, aparently not
   * chrome or safari, cannot emulate. This is a filter.
   */

  let method = req.method;
  let path = req.url;
  console.log(res.statusCode);  //confirming the default response is 200

  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write(`${method}\n`);
    res.write(`${path}\n`);
    res.write(`Yo, sup!`);
    res.end();
  }

});

SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});