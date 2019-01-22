import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { HttpLink } from 'apollo-link-http';
import { connect } from 'react-redux';
import userActionCreators from '../action-creators/user.js'

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
                        transactions{
                          id
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