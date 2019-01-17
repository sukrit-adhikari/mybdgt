import {UserSignupGenericError, UserLoginGenericError} from '../util/error/CreateNewUserError.js';
import {PasswordUtil} from '../util/crypt/password.js';
import {createUser,retrieveUsernamePassword} from '../database/user.js';
class UserService {
    constructor(db) {
        if (!db.open) {
            throw new Error("Database not valid.");
        }
        this.db = db;
        this.passwordUtil = new PasswordUtil();
    }

    signup(user) {
        const self = this;
        if(!user.username || !user.password){
            return new UserSignupGenericError();
        }
        const passwordHash = self.passwordUtil.hash(user.password);
        let userObject = Object.assign({},user);
        userObject = Object.assign(userObject,{password:passwordHash});
        return createUser(self.db,userObject);
    }

    login(user) {
        const self = this;
        if(!user.username || !user.password){
            return new UserLoginGenericError();
        }
        const passwordHash = self.passwordUtil.hash(user.password);
        retrieveUsernamePassword()
        .then(function(res){
            console.log(res);
        },function(err){

        })
        let userObject = Object.assign({},user);
        userObject = Object.assign(userObject,{password:passwordHash});
        return createUser(self.db,userObject);
    }
}

export default UserService;