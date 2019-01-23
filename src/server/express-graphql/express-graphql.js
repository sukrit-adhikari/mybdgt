import authenticationMiddleware from './authenticationMiddleware.js';
import transaction from '../database/transaction.js';
import account from '../database/account.js';
import schema from './schema.js';
import UserService from '../service/user.js';
import graphqlHTTP from 'express-graphql';
let db = null;
let $userService = null;

var root = {
    transactions: (args) => { return transaction.all(db) },
    accounts: (args) => { return account.all(db); },
    createUser: (args) => { return $userService.signup(args) },
    login: (obj, context, info) => { return $userService.login(obj.username, obj.password, context) },
};

export default {
    initializeServices: function (app) {
        db = app.get('db');
        $userService = new UserService(db);
    },

    applyApiMiddleware: function (app) {
        this.initializeServices(app);
        authenticationMiddleware.unsecureAuthenticationMiddleware(app);
        app.use('/api', graphqlHTTP({
            schema: schema.schema,
            rootValue: root,
            graphiql: true,
            context: {
                addSession: (key,value) => {
                    authenticationMiddleware.addSession(app,key,value);
                }
            }
        }));
    },
}