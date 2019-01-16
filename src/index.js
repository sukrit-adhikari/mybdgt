import { Provider } from 'react-redux';
import TransactionList from './js/components/presentation/TransactionList.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const initialState = { transactions:[{amount:12,comment:12,dateAndTime:12}],accounts:[] };

const counter = function counter(state, action) {
  switch (action.type) {
  case 'REFRESH_ALL_ACCOUNT':
    state.accounts = action.accounts;
    return state;
  case 'REFRESH_TRANSACTIONS':
    // state.transactions = action.transactions;
    return {...state,transactions:action.transactions}
  default:
    return state
  }
}

const store = createStore(counter,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends React.Component{
  render(){return(
    <Provider store={store}>
      <TransactionList />
    </Provider>
  )}
}

ReactDOM.render(<App/>,document.getElementById('root'));

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