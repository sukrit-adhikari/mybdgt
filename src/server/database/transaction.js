module.exports = {
    all: function (db,args) {
        let afterId = 0;
        let count = 100;
        if(args && args.afterId && parseInt(args.afterId) > 0){
            afterId = parseInt(args.afterId);
        }
        if(args && args.count && parseInt(args.count) > 0 && parseInt(args.count) < 1000){
            count = parseInt(args.count);
        }
        return new Promise(function (resolve, reject) {
            db.all("SELECT id,timestamp,layers,frame,eth,ip,tcp,udp,data FROM packet WHERE id > ?", [afterId], function (err, rows) {
                if (err) {
                    reject(err); 
                }
                resolve(rows);
            });
        });
    },
    create: function(db,model){
        return new Promise(function (resolve, reject) {
            db.run("INSERT INTO user VALUES (?,?,?)", [null, null, null], function (err) {
                if (err) {
                    reject(err);
                }
               resolve({});
            });
        });
    }
}