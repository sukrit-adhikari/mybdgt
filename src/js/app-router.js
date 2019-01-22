//REACT
import React from 'react';
import { HashRouter } from 'react-router-dom'
import { Route, Switch, withRouter } from 'react-router';
//REACT REDUX
import { connect } from 'react-redux';
//APPLICATION PAGES
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Error404 from './error-pages/Error.404.jsx';

class AppRouter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return ((this.props.loginCheck || this.props.loggedIn) ?
                (<Switch>
                    {console.log('Starting router for logged in user.')}
                    <Route exact path="/404" component={Error404} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/" component={Home} />
                    <Route path="*" component={Error404} />
                </Switch>) : (<Switch>
                    {console.log('Starting router for logged out user.')}
                    <Route path="*" component={Login} />
                </Switch>)
                )
    }
}

const mapStateToProps = (state) => {
    return {
        loggingIn: state.user.auth.loggingIn,
        loggedIn: state.user.auth.loggedIn,
    }
}

export default withRouter(connect(
    mapStateToProps
)(AppRouter));