const sqlite3 = require("sqlite3").verbose();
const allModel = require('../src/js/model/all.js');
const assert = require('assert');
let db = null;

before(function () {
    db = new sqlite3.Database('');
});


describe('Create User Table', function () {
    it('should create table', function (done) {
        db.exec(allModel.user(), function (err) {
            if (err) {
                done(err);
            }
            done();
        });
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

describe('Create Transaction Table', function () {
    it('should create table', function (done) {
        db.exec(allModel.transaction(), function (err) {
            if (err) {
                done(err);
            }
            done();
        });
    });
});

describe('Create Account Table', function () {
    it('should create table', function (done) {
        db.exec(allModel.account(), function (err) {
            if (err) {
                done(err);
            }
            done();
        });
    });
});
