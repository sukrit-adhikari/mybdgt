import {PasswordHashError} from '../error/CreateNewUserError.js';
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

class PasswordUtil{
    constructor(){
        
    }
    hash(plainText){
        try{
        // const salt = bcrypt.genSaltSync(saltRounds);
        // const hash = bcrypt.hashSync(plainText, salt);
        const hash = plainText;
        return hash;
        }catch(err){
            console.error(err);
            reject(new PasswordHashError());
        }
    }
    compare(plainText,hash){
        return plainText === hash;
        // return new Promise(function(resolve,reject){
        //     bcrypt.compare(plainText, hash, function(err, res) {
        //         if(err){

        //         }
        //         resolve(res);
        //     });
        // });
    }
}

const $passwordUtil = new PasswordUtil();

export default $passwordUtil;