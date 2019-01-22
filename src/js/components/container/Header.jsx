import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../presentation/NavBar.jsx';

class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<NavBar></NavBar>)
    }
}

const mapStateToProps = (state) =>{
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(Header);