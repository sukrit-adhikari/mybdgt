import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';

const httpLink = new HttpLink({ uri: '/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || null,
    }
  });

  return forward(operation);
})

class AppApolloClient extends ApolloClient {
    constructor(options) {
        super(Object.assign({
            uri: "http://localhost:8181/api",
        }, options))
    }
    // is authenticated
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