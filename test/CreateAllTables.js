const sqlite3 = require("sqlite3").verbose();
const allModel = require('../src/js/model/all.js');
const assert = require('assert');
let db = null;

beforeEach(function () {
    db = new sqlite3.Database(':memory:');
});

afterEach(function () {
    db.close();
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