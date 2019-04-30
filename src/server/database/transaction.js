module.exports = {
    all: function (db) {
        return new Promise(function (resolve, reject) {
            db.all("SELECT id,timestamp,layers,frame,eth,ip,tcp,udp,data FROM packet", [], function (err, rows) {
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