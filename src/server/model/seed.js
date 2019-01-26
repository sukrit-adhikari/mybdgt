module.exports = {
    user: function (db) {
        return new Promise(function (resolve, reject) {
            const stmt = db.prepare("INSERT INTO user VALUES (?,?,?)");
            stmt.run([null, "admin", "admin"]);
            stmt.finalize(function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({});
                }
            });
        });
    },
    tag: function (db) {
        return new Promise(function (resolve, reject) {
            const stmt = db.prepare("INSERT INTO tag VALUES (?,?,?,?)");
            stmt.run([null, 1, "Gas", null]);
            stmt.run([null, 1, "Grocery", null]);
            stmt.run([null, 1, "Rent", null]);
            stmt.finalize(function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({});
                }
            });
        });
    },
    account: function (db) {
        return new Promise(function (resolve, reject) {
            const stmt = db.prepare("INSERT INTO account VALUES (?,?,?)");
            stmt.run([null, "account1", 1]);
            stmt.run([null, "account2", 1]);
            stmt.finalize(function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({});
                }
            });
        });
    },
    transactionFake: function (db) {
        return new Promise(function (resolve, reject) {
            const stmt = db.prepare("INSERT INTO bdgt_transaction VALUES (?,?,?,?,?,?,?)");
            Array(10).fill().map((v, i) => i).forEach(function (value, index) {
                stmt.run(
                    [
                        null,
                        1,
                        100 * Math.random(),
                        "Comment",
                        1,
                        1,
                        JSON.stringify(new Date())
                    ]
                );
            });

            stmt.finalize(function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({});
                }
            });
        });
    },
}; 