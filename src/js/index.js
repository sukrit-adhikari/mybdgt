//REACT
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
//REDUX
import { createStore, applyMiddleware , compose} from 'redux';
//REACT-REDUX
import { Provider } from 'react-redux';
//REDUX MIDDLEWARE
import thunk from 'redux-thunk';
//APPLICATION
import reducer from './reducers/index.js';
import AppRouter from './app-router.js';
import AppClient from './graphql-client/client.js';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

AppClient.authOK()
  .then((res) => {
    try{
      ReactDOM.render(
        <Provider store={store}>
          <HashRouter>
            <AppRouter loginCheck={res===true}></AppRouter>
          </HashRouter>
      </Provider>
      , document.getElementById('root'));
    }catch(err){
      console.log(err);
    }
  }, (err) => {
    document.getElementById('root').innerHTML = '<p style="color:red;">Unexpected error occured (Service might be down). Please try again.<br/>'+JSON.stringify(err)+'</p>';;
});