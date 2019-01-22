//REACT
import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
//REACT REDUX
import { connect } from 'react-redux';
//APPLICATION PAGES
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Error404 from './error-pages/Error.404.jsx';
import userActionCreators from './action-creators/user.js';

class AppRouter extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.setLoggedIn({loggedIn : this.props.loginCheck});
    }
    render() {
        return ((this.props.loginCheck || this.props.loggedIn) ?
                (<Switch>
                    <Route exact path="/404" component={Error404} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/" component={Home} />
                    <Route path="*" component={Error404} />
                </Switch>) : (<Switch>
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

const mapDispatchToProps = (dispatch) => {
    return {
        setLoggedIn : (payload)=> dispatch(userActionCreators.updateAuthStatus(payload))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AppRouter));