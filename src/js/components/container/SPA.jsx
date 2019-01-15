import React from 'react';
import { connect } from 'react-redux';

function SPA(props) {
    return (
      <div>
          lala
      </div>
    )
}

const mapStateToProps = function(state) {
    return {
        // profile: state.user.profile,
        // loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps)(SPA);