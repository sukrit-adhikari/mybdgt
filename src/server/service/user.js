import {UserSignupGenericError, UserLoginGenericError} from '../util/error/CreateNewUserError.js';
import PasswordUtil from '../util/crypt/password.js';
import {createUser,retrieveUsernamePassword} from '../database/user.js';
import { GraphQLError } from 'graphql';

import {PasswordUsernameMismatch} from '../util/error/LoginError.js';

class UserService {
    constructor(db) {
        if (!db.open) {
            throw new Error("Database not valid.");
        }
        this.db = db;
    }

    signup(user) {
        const self = this;
        if(!user.username || !user.password){
            return new UserSignupGenericError();
        }
        const passwordHash = self.PasswordUtil.hash(user.password);
        let userObject = Object.assign({},user);
        userObject = Object.assign(userObject,{id:null,password:passwordHash});
        return createUser(self.db,userObject);
    }

    login(username,password) {
        const self = this;
        return new Promise(function(resolve,reject){
            if(!username || !password){
                reject(new GraphQLError("No username or password provided."));
            }
            const usernameQuery = username;
            retrieveUsernamePassword(self.db,usernameQuery)
            .then(function(res){
                if(res && res.password && PasswordUtil.compare(password,res.password)){
                    resolve({id:res.id,session:res.id,username:username});
                }
                reject(new PasswordUsernameMismatch());
            },function(err){
                reject(err);
            })
        });
       
    }
}
  
export default UserService;