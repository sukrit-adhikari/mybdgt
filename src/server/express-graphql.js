import transaction from './database/transaction.js';
import account from './database/account.js';
import schema from './schema.js';
import UserService from './service/user.js';

var graphqlHTTP = require('express-graphql');
let db = null;
let $userService = null;

var root = {
    transactions: (args) => {return transaction.all(db)},
    accounts: (args)=>{return account.all(db);},
    createUser: (args)=>{return $userService.signup(args)},
    login: (obj,context,info)=>{return $userService.login(obj.username,obj.password,context)},
};

export default  {
    initialize: function(app){
        db = app.get('db');
        $userService = new UserService(db);
    },
    unsecureAuthenticationMiddleware(app) {
        var self = this;
        const STR_SESSION = 'session';
        app.set(STR_SESSION,{});
        app.use(function (req, res, next) {
            const session = console.log(app.get(STR_SESSION));
            if(req.url===process.env.dev_api || req.url===(process.env.dev_api+'?')){
                next();
            } else if(req.url==='/login' && req.method==='POST'){
                req.url = '/api'; // Redirect to GQL
                console.log(new Date(),"Login Attempt. Redirect to GQL",req.url);
                next();
            } else if (session[req.get("session")] && session[req.get("session")].length) {
                next();
            } else{
                res.status(401).json({message:['Unauthorized Request.'],Location:"",Path:""});
            }
        });
    },
    applyApiMiddleware: function(app){
        var self = this;
        this.initialize(app);
        this.unsecureAuthenticationMiddleware(app);
        app.use('/api', graphqlHTTP({
            schema: schema.schema,
            rootValue: root, 
            graphiql: true,
            context:{addSession:(key,value)=>{
                const oldSession = app.get('session');
                let entry = {};
                entry[key] = value;
                const newSession = Object.assign({},oldSession,entry);
                app.set('session',newSession);
            }
        }
        }));
    }
}