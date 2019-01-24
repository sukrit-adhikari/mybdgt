import util from '../helpers/util';
import {authActionCreators} from '../action-creators/index.js';

const baseURL = 'http://localhost:8181';
const requestType = {"Content-Type": "application/json"};
const authHeaders = ()=>{
    return {session:util.getCookie("session") || ''};
}

const Fetching = (uri,method,headers,body) =>{
    const reqURL = uri ? (baseURL+'/'+uri) : baseURL +'/'+'api';
    return new Promise((resolve,reject)=>{
        fetch(reqURL, {
            method: method,
            headers: Object.assign({},
              requestType,
              (headers ? headers:{}),
              authHeaders()),
            body: body
          })
          .then((res)=>{
            //   if(res.status === 401){
            //     authActionCreators.updateAuthStatus({loggedIn:false});
            //   }
              resolve(res);
            },(err)=>{reject(err)});
        //   .then((res)=>{return res.json()},(err)=>{reject(err)}); 
    });
};

export default Fetching;