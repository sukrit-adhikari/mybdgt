module.exports = {
    all: function (db) {
        return new Promise(function(resolve,reject){
            db.all("SELECT id,display_name as displayName,user_id as userId FROM account", [], function(err,rows){
                if(err){
                    reject(err);
                }
                resolve(rows);
            })
        })
    }
}