import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../presentation/LoginForm.jsx';
import {authActionCreators} from '../../action-creators/index.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value })
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value })
  }

  render() {
    return (<app-container>
      <LoginForm 
        attemptLogin={this.props.attemptLogin}
        errorMessages={this.props.errorMessages}
        loggingIn={this.props.loggingIn}
        loggedIn={this.props.loggedIn}></LoginForm>
    </app-container>)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(authActionCreators.attemptLogin(username, password))
  };
};

const mapStateToProps = (state) => {
  return {
    loggingIn: state.user.auth.loggingIn,
    loggedIn: state.user.auth.loggedIn,
    session:state.user.auth.session,
    errorMessages:state.user.auth.errorMessages || [],
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);