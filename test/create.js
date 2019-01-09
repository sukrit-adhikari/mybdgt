const sqlite3 = require("sqlite3").verbose();
const allModel = require('../src/js/model/all.js');

var assert = require('assert');
describe('Create User Table from allModel', function() {
  describe('#createUserTable()', function() {
    it('should create table, insert and retrieve 10 record', function() {
        const result = []; 
        var db = new sqlite3.Database(':memory:');
        db.serialize(function() {
            db.run(allModel.user());
            var stmt = db.prepare("INSERT INTO user VALUES (?,?,?)");
            for (var i = 0; i < 10; i++) {
                stmt.run([null,"username" + i,"password"+ i]);
            }
            stmt.finalize();        
            db.each("SELECT id,password,username FROM user", function(err, row) {
                if(err){
                    console.error(err);
                    return;
                }
                result.push(row);
            });
        },null,function(){
            console.log(result);
            assert.equal(result.length, 10);
        });
        db.close();
    });
  });
});