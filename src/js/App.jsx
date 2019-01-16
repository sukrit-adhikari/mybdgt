import {React,Component} from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import SPA from './components/container/SPA.jsx';

// import ApolloClient from "apollo-boost";
// import gql from "graphql-tag";

// function counter(state = {}, action) {
//   switch (action.type) {
//   case 'REFRESH_ALL_ACCOUNT':
//     state.accounts = action.accounts;
//     return state;
//   case 'REFRESH_TRANSACTIONS':
//     state.transactions = action.transactions;
//     return state;
//   default:
//     return state
//   }
// }

// let store = createStore(counter,{ transactions:[],accounts:[] } );

// const client = new ApolloClient({
//   uri: "/api"
// });

// client
//   .query({
//     query: gql`
//   {
//     transactions {
//       id,userId,amount,comment,accountId,credit,dateAndTime
//     } 
//   }
// `
//   })
//   .then(result => {
//     store.dispatch({ type: 'REFRESH_TRANSACTIONS',transactions:result.data.transactions })
// })

const App = ({}) => (
  <SPA transactions={transactions}/>
)


const mapStateToProps = state => ({
  transactions: state.transactions
})

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(App)