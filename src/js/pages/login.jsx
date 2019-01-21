import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/container/Header.jsx';
import authActionCreators from '../action-creators/user.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username:"",password:""};
  }
  
  attemptLogin(){
    this.props.attemptLogin(this.state.username,this.state.password);
  }

  handleChangeUsername(event){
    this.setState({username:event.target.value})
  }

  handleChangePassword(event){
    this.setState({password:event.target.value})
  }

  render() {
    return (<app-page>
      <Header></Header>
      <div className="container mt-3">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 offset-lg-3 col-lg-6">
            <app-form onKeyDown={({key})=>{if(key==="Enter"){this.attemptLogin()}}}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input onChange={this.handleChangeUsername.bind(this)} value={this.state.username} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="Username" placeholder="Username" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input onChange={this.handleChangePassword.bind(this)} value={this.state.password} type="password" className="form-control" id="password" placeholder="Password" />
              </div>
              <div className="form-check">
                <button onClick={this.attemptLogin.bind(this)} type="button" className="btn btn-primary">Log In</button>
              </div>
            </app-form>
          </div>
        </div>
      </div>
    </app-page>)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      attemptLogin: (username,password) => dispatch(authActionCreators.attemptLogin(username,password))
  };
};

const mapStateToProps = (state)=>{
  return {
    username:"",
    password:""
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);