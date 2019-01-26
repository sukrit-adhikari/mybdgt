import React from 'react';
import { connect } from 'react-redux';
import {authActionCreators} from '../../action-creators/index.js';

import SignupForm from '../presentation/SignupForm.jsx';

class Signup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<app-container>
    <SignupForm 
        attemptSignup={this.props.attemptSignup}
        errors={this.props.errors}
        >
    </SignupForm>
    </app-container>)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptSignup: (username, password) => dispatch(authActionCreators.attemptSignup(username, password))
  };
};

const mapStateToProps = (state) => {
  return {
    errors : state.user.errors
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);