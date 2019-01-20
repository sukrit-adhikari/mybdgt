//REACT
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import {Route,Switch} from 'react-router';
//REDUX
import {createStore,applyMiddleware} from 'redux';
//REACT-REDUX
import { Provider } from 'react-redux';
//REDUX MIDDLEWARE
import thunk from 'redux-thunk';
//APPLICATION
import reducer from './reducers/index.js';
import apolloClientCreator from './graphql-client/client.js';
//APPLICATION PAGES
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Error404 from './error-pages/Error.404.jsx';

const initialState = { 
  user:{
    loggedIn : false,
    loggingIn: true,
    userObject:{
    }
  },
  transactions:[],
  accounts:[]
};

const apiClient = apolloClientCreator({
  onError:(err)=>{
    if(err.networkError){
      console.log(err);
    }
  },
  headers:{"session":"1"}
});

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk.withExtraArgument(apiClient))
);

ReactDOM.render( 
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={Home}/>
        <Route path="*" component={Error404}/>
      </Switch>
    </HashRouter>
  </Provider>
,document.getElementById('root'));