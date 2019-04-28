const sqlite3 = require("sqlite3").verbose();
const tableModel = require('../model/table.js');
const seed = require('../model/seed.js');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

let db = null;
const memoryPath = ":memory:";

module.exports = {
    createDatabase: function(sqlitePath){
        db = new sqlite3.Database(sqlitePath, function (err) {
            if (err) {
                throw err;
            }
        })
        return true;
    },
    getDatabase: function(sqlitePath){
        if(!db){
            this.createDatabase(sqlitePath);
        }
        return db;
    },
    checkDatabase: function(sqlitePath){
        if(!sqlitePath){
            throw new Error('Bad sqlitePath');
        }
        return new Promise(function(resolve,reject){
            if(sqlitePath && sqlitePath === memoryPath){
                resolve({});
            }
            fs.unlinkSync(sqlitePath);
            resolve({});
        });
        
    },
    initDatabase: function (sqlitePath) {
        const self = this;
        const sqliteFile = '/tmp/network-monitor-database-'+uuidv4()+'.sqlite';
        fs.writeFile(sqliteFile,'', function (err) {
            if (err) throw err;
            console.log('Database File '+sqliteFile);
        }); 
        return new Promise(function (resolve, reject) {
            // const db = self.getDatabase(sqlitePath);
            const db = self.getDatabase(sqliteFile);
            
            // if (sqlitePath && !sqlitePath.startsWith(':') && fs.existsSync(sqlitePath)) {
            //     resolve(db);
            //     return;
            // }

            // Create Table
            tableModel.createUserTable(db)
            .then(function () { 
                return tableModel.createPacketTable(db);
            }, function (err) { reject(err)})
            // .then(function () { 
            //     return tableModel.createTagGroupTable(db);
            // }, function (err) { reject(err)})
            // .then(function () {
            //     return tableModel.createTransactionTable(db);
            // }, function (err) { reject(err)})
            // .then(function () {
            //     return tableModel.createAccountTable(db);
            // }, function (err) { reject(err)})


            // Seed Table
            // .then(function () {
            //     return seed.tag(db);
            // }, function (err) { reject(err)})
            .then(function () {
                return seed.user(db);
            }, function (err) { reject(err) })
            // .then(function () {
            //     return seed.account(db);
            // }, function (err) { reject(err) })
            // .then(function () {
            //     return seed.transactionFake(db);
            // }, function (err) { reject(err) })

            //at-last
            .then(function () {
                resolve({ db: db });
            }, function (err) { reject(err) })

        });
    }
}