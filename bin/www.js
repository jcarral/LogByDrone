#!/usr/bin/env node
require('dotenv').config();
const http = require('http');
const app = require('../server');

const port = process.env.SHOPIFY_APP_PORT || '3000';

app.set('port', port);

const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) {
    return console.log('😫');
  }
  return console.log(`🚀 Now listening on port ${port}`);
});
