import transaction from './database/transaction.js';
import account from './database/account.js';
import schema from './schema.js';
import UserService from './service/user.js';

var graphqlHTTP = require('express-graphql');
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
                }
            }
        }));
    },
    unsecureAuthenticationMiddleware(app) {
        var self = this;
        const STR_SESSION = 'session';
        app.set(STR_SESSION, {});
        app.use(function (req, res, next) {
            const session = app.get(STR_SESSION);
            // console.log("session", session,"header-session",req.get("session"));
            if (req.url === '/login' && req.method === 'POST') {
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
                res.status(401).json({ message: ['Unauthorized Request.'], Location: "", Path: "" });
            }
        });
    }
}