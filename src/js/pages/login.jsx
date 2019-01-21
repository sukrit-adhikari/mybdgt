import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/container/Header.jsx';
import authActionCreators from '../action-creators/user.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount(){
    this.props.dispatch(authActionCreators.attemptLogin("admin","admin"));
  }

  render() {
    return (<app-page>
      <Header></Header>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" href="#">Active</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>
      <div className="container mt-3">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input value="admin" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input value="admin" type="password" className="form-control" name="password" id="password" placeholder="Password" />
              </div>
              <div className="form-check">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
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

export default connect(
  // mapStateToProps,
  mapDispatchToProps
)(Login);