import authenticationMiddleware from './authenticationMiddleware.js';
import transaction from '../database/transaction.js';
import account from '../database/account.js';
import schema from './schema.js';
import UserService from '../service/user.js';
import graphqlHTTP from 'express-graphql';
let db = null;
let $userService = null;

var root = {
    transactions: (args, context, info) => { return transaction.all(db,args) },
    accounts: (args, context, info) => { return account.all(db); },
    createUser: (args, context, info) => { return $userService.signup(args) },
    login: (args, context, info) => { return $userService.login(args.username, args.password, context) },
};

export default {
    initializeServices: function (app) {
        db = app.get('db');
        $userService = new UserService(db);
    },

    applyApiMiddleware: function (app) {
        this.initializeServices(app);
        authenticationMiddleware.unsecureAuthenticationMiddleware(app);
        app.use('/api',
        (req,res) => {
            graphqlHTTP({
                schema: schema.schema,
                rootValue: root,
                graphiql: true,
                context: {
                    addSession: (key,value) => {
                        authenticationMiddleware.addSession(app,key,value);
                    }
                },
                // formatError:(err)=>{
                //     // console.log(err);
                //     return res.status(400).json({message:"err"});
                // }
            })(req,res);
        }
        );
    },
}