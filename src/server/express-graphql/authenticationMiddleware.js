export default {
    sessionString:'session',
    addSession: (app, key,value) => {
        const oldSession = app.get('session');
        let entry = {};
        entry[key] = value;
        const newSession = Object.assign({}, oldSession, entry);
        app.set('session', newSession);
    },
    unsecureAuthenticationMiddleware(app) {
        var self = this;
        const send401 = (res) =>{res.status(401).json({ message: ['Unauthorized Request.'], Location: "", Path: "" });};
        app.set(self.sessionString,{});
        app.use(function (req, res, next) {
            const session = app.get(self.sessionString);
            if(req.url === '/logout' && req.method === 'POST'){
                console.log("Logging Out.");
                const newSession = {};
                let deletedSessionKey = null;
                const oldSession = app.get(self.sessionString);
                Object.keys(app.get(self.sessionString)).map((item)=>{
                    if(req.get(self.sessionString) === item){
                        deletedSessionKey = item; // REMOVE
                    }else{
                        newSession[item] = oldSession[item];
                    }
                });
                console.log("Session",deletedSessionKey,"removed."); 
                app.set(self.sessionString,newSession);
                send401(res);
            }else if (req.url === '/login' && req.method === 'POST') {
                req.url = '/api'; // Redirect to GQL
                console.log("Login Attempt.", "Redirect to GQL");
                next(); 
            } else if (Object.keys(session).includes(req.get(self.sessionString))) {
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