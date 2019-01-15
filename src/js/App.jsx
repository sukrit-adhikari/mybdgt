import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import SPA from './components/container/SPA.jsx';

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

function App(){
  return (
    <Provider store={store}>
      <SPA />
    </Provider>
  );
}

export default App;