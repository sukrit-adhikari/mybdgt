const path = require('path');
const express = require('express');
const webpack = require('webpack');
import init from './init.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../../webpack.config.js';

var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
import {promisify} from 'bluebird';

let db = null;

const transactions = [];

Array(10).fill().map((v, i) => i).forEach(function (value, index) {
    transactions.push(
        {
            id: index,
            uerId: 1,
            amount: 100*Math.random(),
            accountId: 1,
            credit: Math.ceil(Math.random()),
            dateAndTime: new Date() 
        }
    );
});
 
const getTransactions = function (args) {
    return new Promise(function(resolve,reject){
        db.all("SELECT * FROM user", [], function(err,rows){
            if(err){
                reject(err);
            }
            transactions[0].dateAndTime = rows[0].password;
            resolve(transactions);
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


// app.use(webpackDevMiddleware(compiler, {
//     publicPath: config.output.publicPath
// }));

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