import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://localhost:8181/api"
});

client
  .query({
    query: gql`
  {
    transactions {
      id,userId,amount,comment,accountId,credit,dateAndTime
    } 
  }
`
  })
  .then(result => {
    store.dispatch({ type: 'REFRESH_TRANSACTIONS',transactions:result.data.transactions })
})

export default function transaction(state = {transactions:[]}, action) {
    switch (action.type) {
    case 'REFRESH_TRANSACTIONS':
      return action.transactions;  
    default:
      return state
    }
}