const dotenv = require('dotenv');
const fs = require('fs');
const http = require('http');
const https = require('https');
const cors = require('cors');
var express = require('express');
var app = express();
var router = require('./app-web/router/api-v1/index');
const apiRoot = `/api/v${process.env.API_VERSION || 1}`;

var privateKey, certificate, credentials, httpServer, httpsServer;

// Load environment variables
dotenv.config({ path: `.env` });
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
dotenv.config({ path: `.env.local.${process.env.NODE_ENV}` });

console.info(`\nApplication server started         MODE = ${process.env.NODE_ENV}`);

// Set application`s port
app.set('port', process.env.SERVER_HTTP_PORT || 4000);
app.set('secure-port', process.env.SERVER_HTTPS_PORT || 4001);

// App Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Request body processors
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// App routes under prefix /api/v{apiVersion}/
app.use(apiRoot, router);

// SSL certificates
privateKey  = fs.readFileSync('ssl-certificates/server.key', 'utf8');
certificate = fs.readFileSync('ssl-certificates/server.crt', 'utf8');

credentials = {
  key: privateKey,
  cert: certificate
};

// function httpServerHandler (request, response) {
//     const host = request.headers['host'];

//     response.writeHead(301, { 'Location': `https://${host}:${app.get('secure-port')}/${request.url}` });
//     response.end();
// }

// function httpsServerHandler (request, response) {
//   response.writeHead(200, { 'Content-Length': '5' });
//   response.end('HTTPS');
// }

httpServer = http.createServer(app);
httpsServer = https.createServer(credentials, app);

httpServer.listen(app.get('port'), () => {
  console.info(`Application http server listening  HTTP_PORT = ${app.get('port')}`);
});
httpsServer.listen(app.get('secure-port'), () => {
  console.info(`Application https server listening HTTPS_PORT = ${app.get('secure-port')}\n\n`);
});

// app.listen(app.get('port'));