import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../presentation/NavBar.jsx';

class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<app-container><NavBar></NavBar></app-container>)
    }
}

const mapStateToProps = (state) =>{
    return {
        loggedIn: state.user.auth.loggedIn
    }
}

export default connect(mapStateToProps)(Header);