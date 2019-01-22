//REACT
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router';
//REDUX
import { createStore, applyMiddleware , compose} from 'redux';
//REACT-REDUX
import { Provider } from 'react-redux';
//REDUX MIDDLEWARE
import thunk from 'redux-thunk';
//APPLICATION
import reducer from './reducers/index.js';
import AppApolloClient from './graphql-client/client.js';
import AppRouter from './app-router.js';
//APPLICATION PAGES
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Error404 from './error-pages/Error.404.jsx';

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
const sessionCookie = getCookie('session');

const apiClient = new AppApolloClient({
  headers: { "session": sessionCookie }
});

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk.withExtraArgument(apiClient)),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

apiClient.authOK()
  .then((res) => {
    try{
      ReactDOM.render(
        <Provider store={store}>
          <HashRouter>
            <AppRouter loginCheck={res}></AppRouter>
          </HashRouter>
      </Provider>
      , document.getElementById('root'));
    }catch(err){
      console.log(err);
    }
  }, (err) => {
    document.getElementById('root').innerHTML = '<p style="color:red;">Unexpected error occured (Service might be down). Please try again.<br/>'+JSON.stringify(err)+'</p>';;
});