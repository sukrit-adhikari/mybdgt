const sqlite3 = require("sqlite3").verbose();
const tableModel = require('../src/server/model/table.js');
const assert = require('assert');

let db = null;

beforeEach(function () {
    return new Promise(function(resolve,reject){
        db = new sqlite3.Database(':memory:',sqlite3.OPEN_READWRITE,(err)=>{
            if(err){
                reject(err);
            }
            resolve({});
        });

    });
});

afterEach(function(){
    db=null;
});

describe('User Table', function () {
    it('should execute create table SQL query', function (done) {
        db.exec(tableModel.user(), function (err) {
            if (err) {
                done(err);
            }
            done();
        });
    });

    it('createUserTable() test', function (done) {
        tableModel.createUserTable(db)
        .then(function(res){done()},function(err){done(err)})
    });

    it('insert [username] NULL should fail', function (done) {
        db.run("INSERT INTO user VALUES (?,?,?)", [null, null, null], function (err) {
            assert.throws(function () {
                if (err) {
                    throw new Error();
                }else{
                }
            }, Error, "const. failed - NULL username is not allowed.");
            done();
        });
    }, function (err) {
        done(err);
    });
});

describe('Transaction Table', function () {
    it('should execute create table SQL query', function (done) {
        db.exec(tableModel.transaction(), function (err) {
            if (err) {
                done(err);
            }
            done();
        });
    });
    it('should create table with createTransactionTable()', function (done) {
        tableModel.createTransactionTable(db)
        .then(function(res){done()},function(err){done(err)})
    });
});

describe('Account Table', function () {
    it('should execute create table SQL query', function (done) {
        db.exec(tableModel.account(), function (err) {
            if (err) {
                done(err);
            }
            done();
        });
    });

    it('should create table with createAccountTable()', function (done) {
        tableModel.createAccountTable(db)
        .then(function(res){done()},function(err){done(err)})
    });
});

describe('Tag Table', function () {
    it('should execute create table SQL query', function (done) {
        db.exec(tableModel.tag(), function (err) {
            if (err) {
                done(err);
            }
            done();
        });
    });

    it('should create table with createTagTable()', function (done) {
        tableModel.createTagTable(db)
        .then(function(res){done()},function(err){done(err)})
    });
});

describe('TagGroup Table', function () {
    it('should execute create table SQL query', function (done) {
        db.exec(tableModel.tagGroup(), function (err) {
            if (err) {
                done(err);
            }
            done();
        });
    });
    it('should create table with createTagGroupTable()', function (done) {
        tableModel.createTagGroupTable(db)
        .then(function(res){done()},function(err){done(err)})
    });
});
