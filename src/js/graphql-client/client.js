import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

class AppApolloClient extends ApolloClient {
    constructor(options) {
        super(Object.assign({
            uri: "http://localhost:8181/api",
        }, options))
    }
    authOK() {
        var self = this;
        return new Promise((resolve, reject) => {
            self
                .query({
                    query: gql`
                    {
                        login(
                          username:"admin"
                          password:"admin"
                        ){
                          session
                        }
                      }
                `
                })
                .then(result => {
                    resolve(true);
                },(err)=>{
                    if(err.networkError.statusCode === 401 || err.networkError.statusCode === 403 ){
                        resolve(false);
                    }
                    reject(err);
                });
        })
    }
}

export default AppApolloClient;