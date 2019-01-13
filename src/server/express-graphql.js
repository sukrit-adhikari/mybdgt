import transaction from './database/transaction.js';
import account from './database/account.js';
import schema from './schema.js';

var graphqlHTTP = require('express-graphql');

let db = null;


var root = {
    transactions: (args) => {return transaction.all(db)},
    accounts: (args)=>{return account.all(db);}
};


export default  {
    applyApiMiddleware: function(app){
        db = app.get('db');
        app.use('/api', graphqlHTTP({
            schema: schema.schema,
            rootValue: root, 
            graphiql: true,
        }));
    }
}