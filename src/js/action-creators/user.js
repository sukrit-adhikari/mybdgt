import actions from '../actions/index.js';

const authActionCreators = {
  attemptLogin: function (username, password) {
    return (dispatch, getState, apiClient) => {
      dispatch({ type: actions.SET_AUTHENTICATION_STATUS, payload: { loggingIn: true } });
      fetch('http://localhost:8181/login', {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operationName: null,
          query: `{login(username:\"${username}\", password: \"${password}\") {session}}`
        })
      })
        .then(response => response.json(), (err) => { throw err; })
        .then(json => {
          if (json && json.data && json.data.login) {
            const session = json.data.login.session;
            document.cookie = "session=" + session
            dispatch({
              type: actions.SET_AUTHENTICATION_STATUS, payload:
                { loggedIn: true,loggingIn: false , session:session}
            });
            window.location = '/';
          }
        });
    };
  },
  updateSession: function (session) {
    return (dispatch, getState) => {
      dispatch({ type: actions.SET_AUTHENTICATION_STATUS, payload: { session: session } });
    };
  },
}

export default authActionCreators;