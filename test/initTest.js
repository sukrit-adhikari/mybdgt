const assert = require('assert');
const init = require('../src/server/init-database.js');

describe('Server Initialization', function () {
    it('Create Database', function (done) {
        assert.equal(true,init.createDatabase(":memory:"));
        done();
    });
    it('Get Database', function (done) {
        assert.equal(init.getDatabase(":memory:").open , true );
        done();
    });
    it('initDatabase(":memory:")', function (done) {
        init.initDatabase(":memory:")
        .then(function(res){
            done();
        },function(err){
            done(err);
        });
    });
});