import { Provider } from 'react-redux';
import Home from './pages/Home.jsx';
import Error404 from './error-pages/Error.404.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore } from 'redux';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import reducer from './reducers/index.js';

import { HashRouter } from 'react-router-dom'
import {Route,Switch} from 'react-router';

const initialState = { transactions:[],accounts:[] };
 
const store = createStore(reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter> 
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="*" component={Error404}/>
      </Switch>  
    </HashRouter>
  </Provider>
,document.getElementById('root'));

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