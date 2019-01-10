module.exports = {
    user : function(){ 
        return "CREATE TABLE `user` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `username` TEXT NOT NULL UNIQUE, `password` TEXT NOT NULL )"
    },
    transaction : function(){ 
        return "CREATE TABLE `transaction` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `user_id` INTEGER ,`amount` NUMBER NOT NULL, `account_id` INTEGER , `credit` INTEGER NOT NULL, `dateandtime` TEXT NOT NULL )"
    },
    account : function(){ 
        return "CREATE TABLE `account` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `display_name` TEXT NOT NULL, `user_id` INTEGER NOT NULL)"
    },
};