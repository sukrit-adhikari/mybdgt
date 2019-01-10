const path = require('path');
const express = require('express');
const webpack = require('webpack');
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../../webpack.config.js';

var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        transaction(id: Int!): Transaction
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

const transactions = [];

Array(100).fill().map((v, i) => i).forEach(function (value, index) {
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
    return transactions;
}

var root = {
    // transaction: getTransaction,
    transactions: getTransactions
};

const app = express(),
    DIST_DIR = path.join('./dist', __dirname, 'web'),
    HTML_FILE = path.resolve(DIST_DIR, 'index.html'),
    compiler = webpack(config);

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: config.output.publicPath
}));
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: root, 
    graphiql: true,
}));

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE);
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`);
    console.log('Press Ctrl+C to quit.');
});