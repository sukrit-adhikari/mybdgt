const sqlite3 = require("sqlite3").verbose();
const tableModel = require('../src/server/model/table.js');
const assert = require('assert');

let db = null;

before(function () {
    db = new sqlite3.Database('');
});

describe('User Table', function () {
    it('should create table', function (done) {
        db.exec(tableModel.user(), function (err) {
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

describe('Transaction Table', function () {
    it('should create table', function (done) {
        db.exec(tableModel.transaction(), function (err) {
            if (err) {
                done(err);
            }
            done();
        });
    });
});

describe('Account Table', function () {
    it('should create table', function (done) {
        db.exec(tableModel.account(), function (err) {
            if (err) {
                done(err);
            }
            done();
        });
    });
});

describe('Tag Table', function () {
    it('should create table', function (done) {
        db.exec(tableModel.tag(), function (err) {
            if (err) {
                done(err);
            }
            done();
        });
    });
});

describe('TagGroup Table', function () {
    it('should create table', function (done) {
        db.exec(tableModel.tagGroup(), function (err) {
            if (err) {
                done(err);
            }
            done();
        });
    });
});
