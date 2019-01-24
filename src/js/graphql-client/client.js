import fetching from './fetching';
import { CodeBuild } from 'aws-sdk';

const client = {
    authOK() {
        return new Promise((resolve, reject) => {
            const body = JSON.stringify({
                operationName: null,
                query: `{
                  transactions {
                    id
                  } 
                }`});
            fetching(null,
                'post',
                null,
                body
            ).then((res) => {
                if (res.status === 401) {
                    resolve(false);
                } else if (res.status === 200) {
                    resolve(true);
                }else{
                    reject({status:res.status});
                }
            }, (err) => {
                reject(err);
            })
        });
    }
}

export default client;