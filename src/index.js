import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import {Route,Switch} from 'react-router';

import App from "./js/App.jsx";
import Error404 from "./js/error-pages/Error.404.jsx";

ReactDOM.render(
    <HashRouter> 
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="*" component={Error404}/>
      </Switch>  
    </HashRouter>,
    document.getElementById('root')
);