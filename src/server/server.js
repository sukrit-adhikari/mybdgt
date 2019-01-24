var env = require('node-env-file');
const path = require('path');
const express = require('express');
import InitServer from './init-server.js';

const app = express(),
DIST_DIR = path.join('./dist', __dirname, 'web'),
HTML_FILE = path.resolve(DIST_DIR, './src/index.html');
env(path.resolve(DIST_DIR, '../../.env'));
app.use('/static',express.static('dist/web'));
const port = process.env.PORT || 8080;
const sqlitePath = process.env.sqlite_path || ":memory:";
const server = new InitServer(app,port,sqlitePath,HTML_FILE);
server.init(); // <- START