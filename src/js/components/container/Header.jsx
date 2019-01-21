import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../presentation/NavBar.jsx';

const Header = function () {
    return (<NavBar></NavBar>)
}

const mapStateToProps = (state) =>{
    return {
        user: state.user,
    }
}

export default connect()(Header);