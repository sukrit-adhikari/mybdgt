import React from 'react';
import ErrorMessagesVerticalStack from './ErrorMessagesVerticalStack.jsx';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state ={username:'',password:''};
    this.attemptLogin = this.attemptLogin.bind(this);
  }

  handleChangeUsername(event){
    this.setState({ username: event.target.value });
  }

  handleChangePassword(event){
    this.setState({ password: event.target.value })
  }

  attemptLogin(){
    this.props.attemptLogin(this.state.username,this.state.password);
  }

  render() {
    return (<app-presentation>
      {<div className="container mt-3">
      <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-12 offset-lg-3 col-lg-6">
      <ErrorMessagesVerticalStack errorMessages={this.props.errorMessages}></ErrorMessagesVerticalStack>
      </div>
      </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 offset-lg-3 col-lg-6">
            <app-form onKeyDown={({ key }) => { if (key === "Enter") { this.attemptLogin() } }}>
              <div className="form-group">
                <label htmlFor="user-name">Username</label>
                <input onChange={this.handleChangeUsername.bind(this)} value={this.state.username} type="text" className="form-control" id="user-name" aria-describedby="Username" placeholder="Username" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input onChange={this.handleChangePassword.bind(this)} value={this.state.password} type="password" className="form-control" id="password" placeholder="Password" />
              </div>
              <div className="form-check">
                <button disabled={this.props.loggingIn} onClick={this.attemptLogin} type="button" className="btn btn-primary">Log In</button>
              </div>
            </app-form>
          </div>
        </div>
      </div>}
    </app-presentation>)
  }
}

export default LoginForm;