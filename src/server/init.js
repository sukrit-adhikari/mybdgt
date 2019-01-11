const sqlite3 = require("sqlite3").verbose();
const allModel = require('../js/model/all.js');
const seed = require('../js/model/seed.js');

let db = null;

module.exports = {
    initDatabase: function () {
        return new Promise(function (resolve, reject) {
            db = new sqlite3.Database(':memory:', function (err) {
                if (err) {
                    reject(err);
                }
            });
            allModel.createUserTable(db)
                .then(function () {
                    return seed.user(db);
                },function(err){reject(err)})
                .then(function () {
                    resolve({ db: db });
                },function(err){reject(err)})
        });
    }
}