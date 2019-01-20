import ApolloClient from "apollo-boost";

const client = function(config){
    return new ApolloClient(Object.assign({
        uri: "http://localhost:8181/api"
    },config));
}

export default client;