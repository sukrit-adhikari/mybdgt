const sqlite3 = require("sqlite3").verbose();

const getNewDB = function(){
    return new sqlite3.Database(':memory:');
}