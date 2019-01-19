var env = require('node-env-file');
const path = require('path');
const express = require('express');
var morgan = require('morgan');
import serverBootstrap from './init.js'; 
// const basicAuth = require('express-basic-auth');
 

import expressGraphql from './express-graphql.js';

const app = express(),
    DIST_DIR = path.join('./dist', __dirname, 'web'),
    HTML_FILE = path.resolve(DIST_DIR, 'index.html');
    
    // app.use(basicAuth({
    //     challenge: true,
    //     users: { 'admin': 'admin' }
    // }))

env(path.resolve(DIST_DIR, '../../.env'));
const PORT = process.env.PORT || 8080;
const sqlitePath = process.env.sqlite_path || ":memory:";

const setupEndpoints = function(){
    try{
        expressGraphql.applyApiMiddleware(app); // '/api'
        // app.get('*', (req, res) => {
        //     res.sendFile(HTML_FILE);
        // });
    }catch(err){
        return err;
    } 
    return null;
}

const setupMiddleware = function(){
    // CORS for web to call service
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "*");
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        } else {
            next();
        }
    });
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); // logging
}

const startApp = function(){
    setupMiddleware();
    setupEndpoints();
    app.listen(PORT, () => {
        console.log(`PORT ${PORT}`);
        console.log(`Index HTML ${HTML_FILE}`);
        console.log(`DATABASE PATH ${sqlitePath}`);
        console.log(`App Started.`);
    });
}

serverBootstrap
.initDatabase(sqlitePath)
.then(function(database){
    app.set('db',database.db);
    startApp();
}, function(err){

});

// Dead Code

// var cors = require('cors');
// const webpack = require('webpack');
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import config from '../../webpack.config.js';

// const compiler = webpack(config);
// app.use(webpackDevMiddleware(compiler, {
//     publicPath: config.output.publicPath
// }));
// app.options('*', cors());