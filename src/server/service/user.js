import { GenericError,DuplicateUserNameError } from '../util/error/CreateNewUserError.js';
import sqliteCode from '../util/constant/sqlite-status.js';
import {PasswordUtil} from '../util/crypt/password.js';

class UserService {
    constructor(db) {
        if (!db.open) {
            throw new Error("Database not valid.");
        }
        this.db = db;
        this.passwordUtil = new PasswordUtil();
    }

    createUser(user) {
        const self = this;
        if(!user.username || !user.password){
            return new GenericError();
        }
        return new Promise(function (resolve, reject) {
            try {
                const passwordHash = self.passwordUtil.hash(user.password);
                self.db.run("INSERT into user(id,username,password) VALUES (?,?,?)", [
                    null,
                    user.username,
                    passwordHash
                ], function (err) {
                    if (err) {
                        console.error(err);
                        if(err.code === sqliteCode.error.SQLITE_CONSTRAINT){
                            resolve(new DuplicateUserNameError())
                        }
                        resolve(new GenericError());
                    }
                    var lastId = this.lastID;
                    resolve({ id: lastId,username:user.username })
                })
            } catch (err) {
                console.log(err);
                resolve(new GenericError());
            }
        })
    }
}

export default UserService;