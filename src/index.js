import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import {Route,Switch} from 'react-router';

import FormContainer from "./js/components/container/FormContainer.jsx";
import Error404 from "./js/components/container/Error404.jsx";

ReactDOM.render(
    <HashRouter> 
      <Switch>
        <Route exact path="/" component={FormContainer}/>
        <Route path="*" component={Error404}/>
      </Switch>  
    </HashRouter>,
    document.getElementById('create-article-form')
);