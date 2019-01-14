var env = require('node-env-file');
const path = require('path');
const express = require('express');
var morgan = require('morgan')
const webpack = require('webpack');
import serverBootstrap from './init.js'; 
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../../webpack.config.js';
import expressGraphql from './express-graphql.js';

const app = express(),
    DIST_DIR = path.join('./dist', __dirname, 'web'),
    HTML_FILE = path.resolve(DIST_DIR, 'index.html');
    

env(path.resolve(DIST_DIR, '../../.env'));
const PORT = process.env.PORT || 8080;
const sqlitePath = process.env.sqlite_path || ":memory:";

const setupMiddleware = function(){
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));
    app.use(morgan('combined')); // logging
}

const setupEndpoints = function(db){
    try{
        expressGraphql.applyApiMiddleware(app); // '/api'
        app.get('*', (req, res) => {
            res.sendFile(HTML_FILE);
        });
    }catch(err){
        return err;
    } 
    return null;
}

const startApp = function(){
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
    setupMiddleware();
    if(app.set('db',database.db)){
        setupEndpoints();
    }
    startApp();
}, function(err){

});
