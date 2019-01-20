import initDatabase from './init-database.js';
import morgan from 'morgan';
import expressGraphql from './express-graphql.js';

class InitServer {
    constructor(app, port, sqlitePath, publicPath) {
        this.app = app;
        this.port = port;
        this.sqlitePath = sqlitePath;
        this.publicPath = publicPath;
        this.session = { "1": "1" };
    }

    init() {
        const self = this;
        initDatabase
            .initDatabase(self.sqlitePath)
            .then(function (res) {
                self.app.set('db', res.db);
                self.startApp();
            }, function (err) {
                console.log(err);
                console.error("Exiting from the application.");
                process.exit(1);
            });
    }

    startApp() {
        const self = this;
        this.setupMiddleware();
        this.setupEndpoints();
        this.app.listen(self.port, () => {
            console.log(`PORT ${self.port}`);
            console.log(`INDEX HTML ${self.publicPath}`);
            console.log(`DATABASE PATH ${self.sqlitePath}`);
            console.log(new Date(),`App Started.`);
        });
    }

    setupEndpoints() {
        var self = this;
        try {
            expressGraphql.applyApiMiddleware(self.app); // '/api'
            // app.get('*', (req, res) => {
            //     res.sendFile(HTML_FILE);
            // });
        } catch (err) {
            throw err;
        }
    }

    setupMiddleware() {
        // CORS for web to call service
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Session");
            res.header("Access-Control-Allow-Methods", "*");
            if (req.method === 'OPTIONS') {
                res.sendStatus(200);
            } else {
                next();
            }
        });
        this.unsecureAuthenticationMiddleware();
        this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); // logging
    }

    //TODO Refactor
    unsecureAuthenticationMiddleware() {
        var self = this;
        self.app.set('session',Object.assign({},self.session));
        this.app.use(function (req, res, next) {
            console.log("Session ",self.session);
            if (self.session[req.get("session")] && self.session[req.get("session")].length) {
                next();
            } else {
                next();
                // res.status(401).json({errors:['Unauthorized Request.']});
            }
        });
    }
}

export default InitServer;