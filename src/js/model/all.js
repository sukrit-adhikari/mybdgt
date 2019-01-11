const executeSQL = function (db, sql) {
    return new Promise(function (resolve, reject) {
        db.exec(sql, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({});
            }
        });
    });
}

module.exports = {
    user: function () {
        return "CREATE TABLE `user` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `username` TEXT NOT NULL UNIQUE, `password` TEXT NOT NULL )"
    },
    createUserTable: function (db) {
        return executeSQL(db,this.user());
    },
    transaction: function () {
        return "CREATE TABLE `bdgt_transaction` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `user_id` INTEGER NOT NULL ,`amount` NUMBER NOT NULL, `comment` TEXT NULL ,`account_id` INTEGER , `credit` INTEGER NOT NULL, `date_and_time` TEXT NOT NULL )"
    },
    createTransactionTable: function (db) {
        return executeSQL(db,this.transaction());
    },
    account: function () {
        return "CREATE TABLE `account` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `display_name` TEXT NOT NULL, `user_id` INTEGER NOT NULL)"
    },
    createAccountTable: function (db) {
        return executeSQL(db,this.account());
    },
    tagGroup: function () {
        return "CREATE TABLE `tag_group` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `user_id` INTEGER NOT NULL , `display_name` TEXT NOT NULL, `tag_group_id` INTEGER)"
    },
    tag: function () {
        return "CREATE TABLE `tag` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `user_id` INTEGER NOT NULL ,`display_name` TEXT NOT NULL, `tag_group_id` INTEGER)"
    },
    createTagTable: function (db) {
        return executeSQL(db,this.tag());
    },
};