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

            allModel.createUserTable(db) // Create Table
            .then(function () { 
                return allModel.createTagTable(db);
            }, function (err) { reject(err)})
            .then(function () {
                return allModel.createTransactionTable(db);
            }, function (err) { reject(err)})
            .then(function () {
                return seed.tag(db);// Seed Table
            }, function (err) { reject(err)})
            .then(function () {
                return seed.user(db);
            }, function (err) { reject(err) })
            .then(function () {
                return seed.transaction(db);
            }, function (err) { reject(err) })
            .then(function () {
                resolve({ db: db });
            }, function (err) { reject(err) })

        });
    }
}