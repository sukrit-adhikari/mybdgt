import actions from '../actions/index.js';

const authActionCreators = {
  attemptLogin: function (username, password) {
    return (dispatch, getState, apiClient) => {
      fetch('http://localhost:8181/login', {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({operationName: null,
          query:`{login(username:\"${username}\", password: \"${password}\") {session}}`})
      })
      .then(response => response.json(),(err)=>{throw err;})
      .then(json => {
          if(json && json.data && json.data.login){
            document.cookie = "session="+json.data.login.session
            location.reload();
          }
          //dispatch({ type: actions.SET_AUTHENTICATION_STATUS, payload: { loggedIn: true } });
      });
    };
  }
}

export default authActionCreators;