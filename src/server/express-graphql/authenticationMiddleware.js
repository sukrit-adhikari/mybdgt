export default {
    sessionString:'session',
    addSession: (app,key,value) => {
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
            const requestSessionHeader = req.get(self.sessionString);
            if(req.url === '/logout' && req.method === 'POST'){
                console.log("Logging Out.");
                const newSession = {};
                let deletedSession = {key:null,value:null};
                Object.keys(session).map((item)=>{
                    if(requestSessionHeader === item){
                        deletedSession.key = item; // REMOVE
                        deletedSession.value = session[item]; // REMOVE
                    }else{
                        newSession[item] = session[item];
                    }
                });
                console.log("Session",deletedSession,"removed."); 
                app.set(self.sessionString,newSession);
                res.status(200).json({loggedOut:true});
            }else if (req.url === '/login' && req.method === 'POST') {
                req.url = '/api'; // Redirect to GQL
                console.log("Login Attempt.", "Redirect to GQL");
                next(); 
                // 
            }else if (req.url === '/signup' && req.method === 'POST') {
                req.url = '/api'; // Redirect to GQL
                console.log("Signup attempt.", "Redirect to GQL");
                next(); 
            }else if (Object.keys(session).includes(requestSessionHeader)) {
                console.log("Authenticated Request -> GQL");
                next();
            }else if (req.url === '/api/dev' || req.url === '/api/dev?') {
                next();
            }else {
                console.log("Unauthenticated Request.");
                send401(res);                
            }
        });
    }
}