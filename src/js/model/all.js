module.exports = {
    user : function(){ 
        return "CREATE TABLE `user` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `username` TEXT NOT NULL, `password` TEXT NOT NULL );)"
    }
};