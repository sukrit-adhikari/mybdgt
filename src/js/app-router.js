//REACT
import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
//REACT REDUX
import { connect } from 'react-redux';
//APPLICATION PAGES
import HomePage from './pages/homePage.jsx';
import LoginPage from './pages/loginPage.jsx';
import Error404Page from './error-pages/Error404Page.jsx';
import userActionCreators from './action-creators/user.js';
import TransactionFormPage from './pages/transactionFormPage.jsx';

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
                    <Route exact path="/add/transaction" component={TransactionFormPage} />
                    <Route exact path="/404" component={Error404Page} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/" component={HomePage} />
                    <Route path="*" component={Error404Page} />
                </Switch>) : (<Switch>
                    <Route path="*" component={LoginPage} />
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