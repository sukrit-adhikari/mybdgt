import React from 'react';
import Header from '../components/container/Header.jsx';

const Login = () => {
    return (
    <app-page>
    <Header></Header>
    <div className="container mt-3">	
	<div className="row">
		<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <form>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" name="password" id="password" placeholder="Password" />
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

export default Login;