import sqliteCode from '../util/constant/sqlite-status.js';
import { UserSignupGenericError,
    UserLoginGenericError,
    DuplicateUserNameError } from '../util/error/CreateNewUserError.js';

const createUser = function (db,user) {
    return new Promise(function (resolve, reject) {
        try {
            db.run("INSERT into user(id,username,password) VALUES (?,?,?)", [
                null,
                user.username,
                user.password
            ], function (err) {
                if (err) {
                    console.error(err);
                    if(err.code === sqliteCode.error.SQLITE_CONSTRAINT){
                        reject(new DuplicateUserNameError());
                    }
                    reject(new UserSignupGenericError());
                }
                var lastId = this.lastID;
                resolve({ id: lastId,username:user.username });
            });
        } catch (err) {
            console.log(err);
            reject(new UserSignupGenericError());
        }
    })
}

const retrieveUsernamePassword = function(db,username){
    return new Promise(function (resolve, reject) {
        try {
            db.get("SELECT id,username,password from user where username=? COLLATE NOCASE", [
                username
            ], function (err,row) {
                if (err) {
                    console.error(err);
                    reject(new UserLoginGenericError());
                }
                resolve(row);
            });
        } catch (err) {
            console.log(err);
            reject(new UserLoginGenericError());
        }
    })
}


export { createUser, retrieveUsernamePassword };