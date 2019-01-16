const assert = require('assert');
const init = require('../src/server/init.js');

describe('Server Initialization', function () {
    it('Create Database', function (done) {
        init.createDatabase(":memory:");
        done();
    });
    it('Get Database', function (done) {
        init.getDatabase(":memory:");
        done();
    });
    it('initDatabase(":memory:")', function (done) {
        init.initDatabase(":memory:").then(function(res){
            done();
        },function(err){
            done(err);
        });
    });
});