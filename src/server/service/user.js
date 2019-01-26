import randomString from 'randomstring';
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
        return new Promise((resolve,reject)=>{
            if(!user.username || !user.password){
                reject(new UserSignupGenericError());
                return;
            }
            const passwordHash = PasswordUtil.hash(user.password);
            let userObject = Object.assign({},user);
            userObject = Object.assign(userObject,{id:null,password:passwordHash});
            createUser(self.db,userObject)
            .then((res)=>{
                resolve(res);
            },(err)=>{
                console.log(err);
                reject(err);
            });
        });
    }

    login(username,password,context) {
        const self = this;
        return new Promise(function(resolve,reject){
            if(!username || !password){
                reject(new GraphQLError("No username or password provided."));
            }
            const usernameQuery = username;
            retrieveUsernamePassword(self.db,usernameQuery)
            .then(function(res){
                if(res && res.password && PasswordUtil.compare(password,res.password)){
                    const newSession = randomString.generate({ length: 32, charset: 'alphabetic' });
                    context.addSession(newSession, res.id);
                    resolve({id:res.id,session:newSession,username:username});
                }
                reject(new PasswordUsernameMismatch());
            },function(err){
                reject(err);
            })
        }); 
        //
    }
}
  
export default UserService;