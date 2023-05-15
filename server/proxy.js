const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

apiProxy.on('error', function (err, req, res) {
  console.log('Proxy error:', err);
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('Proxy error: ' + err);
});
const express = require('express');
const app = express();
app.use('/api', function (req, res) {
  apiProxy.web(req, res, { target: 'http://localhost:3000' });
});

app.listen(8000, function () {
  console.log('Proxy server listening on port 8000');
});
