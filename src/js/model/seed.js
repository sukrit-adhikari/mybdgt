module.exports = {
    user : function(db){
        return new Promise(function(resolve,reject){
            db.run("INSERT INTO user VALUES (?,?,?)", [null, "admin", "admin"], function (err) {
                if(err){
                    reject(err);
                }else{
                    resolve({});
                }
            });
        }); 
        
    },
};