import transactionController from './database/TransactionController.js';
import accountController from './database/AccountController.js';

var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

let db = null;

var schema = buildSchema(`
    type Query {
        transactions: [Transaction]
        accounts: [Account]
    }
    type Transaction {
        id: Int
        userId: Int
        comment: String
        amount: Float
        accountId: Int
        credit: Int
        dateAndTime: String
    }
    type Account {
        id: Int
        displayName: String
        userId: Int
    }
`);

var root = {
    transactions: (args) => {return transactionController.all(db)},
    accounts: (args)=>{return accountController.all(db);}
};


export default  {
    init: function(app,database){
        db = database;
        app.use('/api', graphqlHTTP({
            schema: schema,
            rootValue: root, 
            graphiql: true,
        }));
    }
}