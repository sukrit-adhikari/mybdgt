var env = require('node-env-file');
const path = require('path');
const express = require('express');
var morgan = require('morgan')
const webpack = require('webpack');
import init from './init.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../../webpack.config.js';
import controller from './controller.js';


let db = null;

const app = express(),
    DIST_DIR = path.join('./dist', __dirname, 'web'),
    HTML_FILE = path.resolve(DIST_DIR, 'index.html'),
    compiler = webpack(config);

env(path.resolve(DIST_DIR, '../../.env'));
const PORT = process.env.PORT || 8080;
const sqlitePath = process.env.sqlite_path || ":memory:";


app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use(morgan('combined'));

init
.initDatabase(sqlitePath)
.then(function(res){
    db = res.db;
    controller.init(app,db);
    app.get('*', (req, res) => {
        res.sendFile(HTML_FILE);
    });
    app.listen(PORT, () => {
        console.log(`PORT ${PORT}`);
        console.log(`Index HTML ${HTML_FILE}`);
        console.log(`DATABASE PATH ${sqlitePath}`);
        console.log(`App Started.`);
    });
});