import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../presentation/NavBar.jsx';
import {authActionCreators} from '../../action-creators/index.js'

class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<app-container>
            <NavBar loggedIn={this.props.loggedIn}
                user={{}}
                attemptLogout={this.props.attemptLogout}
            >
            </NavBar>
            </app-container>);
    }
}

const mapStateToProps = (state) =>{
    return {
        loggedIn: state.user.auth.loggedIn
    }
}

const mapDispatchToProsp = (dispatch) =>{
    return {
        attemptLogout : () =>{dispatch(authActionCreators.attemptLogout())}
    }
}

export default connect(mapStateToProps,mapDispatchToProsp)(Header);