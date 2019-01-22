import transaction from './database/transaction.js';
import account from './database/account.js';
import schema from './schema.js';
import UserService from './service/user.js';

var graphqlHTTP = require('express-graphql');
let db = null;
let $userService = null;


const STR_SESSION = 'session';

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
        this.unsecureAuthenticationMiddleware(app);
        app.use('/api', graphqlHTTP({
            schema: schema.schema,
            rootValue: root,
            graphiql: true,
            context: {
                addSession: (key, value) => {
                    const oldSession = app.get('session');
                    let entry = {};
                    entry[key] = value;
                    const newSession = Object.assign({}, oldSession, entry);
                    app.set('session', newSession);
                },
                removeSession: (key) => {
                    console.log(key);
                }
            }
        }));
    },
    unsecureAuthenticationMiddleware(app) {
        var self = this;
        const send401 = (res) =>{res.status(401).json({ message: ['Unauthorized Request.'], Location: "", Path: "" });};
        app.set(STR_SESSION,{});
        app.use(function (req, res, next) {
            const session = app.get(STR_SESSION);
            if(req.url === '/logout' && req.method === 'POST'){
                console.log("Loggin Out.");
                const newSession = {};
                let deletedSessionKey = null;
                const oldSession = app.get(STR_SESSION);
                Object.keys(app.get(STR_SESSION)).map((item)=>{
                    if(req.get(STR_SESSION) === item){
                        deletedSessionKey = item; // REMOVE
                    }else{
                        newSession[item] = oldSession[item];
                    }
                });
                console.log("Session",deletedSessionKey,"removed.");
                app.set(STR_SESSION,newSession);
                send401(res);
            }else if (req.url === '/login' && req.method === 'POST') {
                req.url = '/api'; // Redirect to GQL
                console.log("Login Attempt.", "Redirect to GQL");
                next();
            } else if (Object.keys(session).includes(req.get(STR_SESSION))) {
                console.log("Authenticated Request -> GQL");
                next();
            } else if (req.url === '/api/dev' || req.url === '/api/dev?') {
                next();
            } else {
                console.log("Unauthenticated Request.");
                send401(res);                
            }
        });
    }
}