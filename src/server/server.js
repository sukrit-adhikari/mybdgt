const path = require('path');
const express = require('express');
const webpack = require('webpack');
import init from './init.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../../webpack.config.js';

var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

let db = null;

const getTransactions = function (args) {
    return new Promise(function(resolve,reject){
        db.all("SELECT id,amount,account_id as accountId, date_and_time as dateAndTime FROM bdgt_transaction", [], function(err,rows){
            if(err){
                reject(err);
            }
            resolve(rows);
        })
    })
}


var schema = buildSchema(`
    type Query {
        transactions: [Transaction]
    }
    type Transaction {
        id: Int
        userId: Int
        amount: Float
        accountId: Int
        credit: Int
        dateAndTime: String
    }
`);
var root = {
    // transaction: getTransaction,
    transactions: getTransactions
};

const app = express(),
    DIST_DIR = path.join('./dist', __dirname, 'web'),
    HTML_FILE = path.resolve(DIST_DIR, 'index.html'),
    compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: root, 
    graphiql: true,
}));

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE);
})

const PORT = process.env.PORT || 8080

init.initDatabase().then(function(res){
    db = res.db;
    app.listen(PORT, () => {
        console.log(`App listening to ${PORT}....`);
        console.log('Press Ctrl+C to quit.');
    });

})