module.exports = {
    executeSQL: function (db, sql) {
        return new Promise(function (resolve, reject) {
            db.exec(sql, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({});
                }
            });
        });
    },
    user: function () {
        return "CREATE TABLE `user` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `username` TEXT NOT NULL UNIQUE, `password` TEXT NOT NULL )"
    },
    createUserTable: function (db) {
        return this.executeSQL(db,this.user());
    },
    packet: function () {
        return 'CREATE TABLE `packet` ('+
        '`id` INTEGER PRIMARY KEY AUTOINCREMENT, '+
        '`timestamp` INTEGER ,'+
        '`layers` TEXT NULL ,'+
        '`frame` TEXT NULL ,'+
        '`eth` TEXT NULL ,'+
        '`ip` TEXT NULL ,'+
        '`tcp` TEXT NULL ,'+
        '`udp` TEXT NULL ,'+
        '`data` TEXT NULL '+
        ')';
    },
    createPacketTable: function (db) {
        return this.executeSQL(db,this.packet());
    },
    // account: function () {
    //     return "CREATE TABLE `account` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `display_name` TEXT NOT NULL, `user_id` INTEGER NOT NULL)"
    // },
    // createAccountTable: function (db) {
    //     return this.executeSQL(db,this.account());
    // },
    // tagGroup: function () {
    //     return 'CREATE TABLE `tag_group` '+
    //             '( `id` INTEGER PRIMARY KEY AUTOINCREMENT, '+
    //             '`user_id` INTEGER NOT NULL , '+
    //             '`display_name` TEXT NOT NULL, '+
    //             '`tag_group_id` INTEGER)';
    // },
    // createTagGroupTable: function (db) {
    //     return this.executeSQL(db,this.tagGroup());
    // },
    // tag: function () {
    //     return "CREATE TABLE `tag` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `user_id` INTEGER NOT NULL ,`display_name` TEXT NOT NULL, `tag_group_id` INTEGER)"
    // },
    // createTagTable: function (db) {
    //     return this.executeSQL(db,this.tag());
    // },
};