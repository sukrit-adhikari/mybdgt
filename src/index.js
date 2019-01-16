import {React,Component} from 'react';
import ReactDOM from 'react-dom';
// import { Provider, connect } from 'react-redux';
// import { HashRouter } from 'react-router-dom'
// import {Route,Switch} from 'react-router';
// import SPA from './js/components/container/SPA/'
// import App from './js/components/container/SPA.jsx';

// import App from "./js/App.jsx";
import Error404 from "./js/error-pages/Error.404.jsx";

// import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import App from './js/App.jsx';

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

function counter(state = {}, action) {
  switch (action.type) {
  case 'REFRESH_ALL_ACCOUNT':
    state.accounts = action.accounts;
    return state;
  case 'REFRESH_TRANSACTIONS':
    state.transactions = action.transactions;
    return state;
  default:
    return state
  }
}

let store = createStore(counter,{ transactions:[],accounts:[] } );

const client = new ApolloClient({
  uri: "/api"
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

ReactDOM.render(
  <App/>
//   (
// <Provider store={store}>
//     <HashRouter> 
//       <Switch>
//         <Route exact path="/" component={App}>
//           {/* <App/> */}
//         </Route>
//         <Route path="*" component={Error404}/>
//       </Switch>  
//     </HashRouter>
// </Provider>)
    ,
    document.getElementById('root')
);