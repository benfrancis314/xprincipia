//Server script
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('build/privkey.pem', 'utf8');
var certificate = fs.readFileSync('build/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();
const path = require('path');

// your express configuration here
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


//app.listen(80);
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(443);

var httpServer = http.createServer( function (req, res) {
  res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
  res.end();
}).listen(80);


// httpServer.listen(8080);


