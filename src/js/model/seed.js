module.exports = {
    user: function (db) {
        return new Promise(function (resolve, reject) {
            db.run("INSERT INTO user VALUES (?,?,?)", [null, "admin", "admin"], function (err) {
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
    transaction: function (db) {
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