import actions from '../actions/index.js';
import util from '../helpers/util.js';

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
          if(json.errors){
            dispatch({
              type: actions.SET_AUTHENTICATION_STATUS, payload:
                {errorMessages:json.errors.map(item=>item.message), loggedIn: false, loggingIn: false , session:''}
            });
          }else if (json && json.data && json.data.login) {
            const session = json.data.login.session;
            document.cookie = "session=" + session
            dispatch({
              type: actions.SET_AUTHENTICATION_STATUS, payload:
                {errorMessages:[], loggedIn: true, loggingIn: false , session:session}
            });
          }
        });
    };
  },
  updateAuthStatus: function (payload) {
    return (dispatch, getState) => {
      dispatch({ type: actions.SET_AUTHENTICATION_STATUS, payload: payload });
    };
  },
  attemptLogout: function () {
    return (dispatch, getState, apiClient) => {
      const removedSession = util.getCookie("session");
      document.cookie = "";
      dispatch({ type: actions.SET_AUTHENTICATION_STATUS, payload: { loggingOut: true } });
      fetch('http://localhost:8181/logout', {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
          "session": removedSession
        },
        body: JSON.stringify({})
      })
      .then(response => window.location='/', (err) => {window.location ='/'});
    };
  },
}

export default authActionCreators;