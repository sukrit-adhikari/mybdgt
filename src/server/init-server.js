import initDatabase from './bootstrap/database.js';
import morgan from 'morgan';
import express_Graphql from './express-graphql/express-graphql.js';
const exec = require('child_process').exec;
import express from 'express';
var env = require('node-env-file');
import NetMon from './Netmon.js';

class InitServer {
    constructor(app, port, sqlitePath, publicPath) {
        this.app = app;
        this.port = port;
        this.sqlitePath = sqlitePath;
        this.publicPath = publicPath;
    }

    init() {
        const self = this;
        initDatabase
            .initDatabase(self.sqlitePath)
            .then(function (res) {
                self.app.set('db', res.db);
                self.startApp(res.db);
            }, function (err) {
                console.log(err);
                console.error(new Date(), "Exiting from the application.");
                process.exit(1);
            });
    }

    startApp(dataBase) {
        const self = this;
        this.setupMiddleware();
        this.setupEndpoints();

        //
        self.initNetMon(dataBase);

        this.app.listen(self.port, () => {
            console.log(`PORT ${self.port}`);
            console.log(`INDEX HTML ${self.publicPath}`);
            console.log(`DATABASE PATH ${self.sqlitePath}`);
            console.log(new Date(), `App Started.`);
        });
    }

    setupEndpoints() {
        var self = this;
        try {
            this.app.use(express.json());
            express_Graphql.applyApiMiddleware(self.app);
            // app.get('*', (req, res) => {
            // res.sendFile(HTML_FILE);
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
        this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); // logging
    }

    initNetMon(dataBase){
        const nm = new NetMon(dataBase);
    }

}

export default InitServer;