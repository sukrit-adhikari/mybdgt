import fetching from './fetching';

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
                }
            }, (err) => {
                resolve(false);
            })
        });
    }
}

export default client;