import actions from '../actions/index.js';
import fetching from '../graphql-client/fetching';

export default {
  attemptSignup: function (username, password) {
    return (dispatch, getState) => {
      dispatch({ type: actions.SET_AUTHENTICATION_STATUS, payload: { loggingIn: true } });
      const body = JSON.stringify({
        operationName: null,
        query: `mutation{createUser(username:\"${username}\", password: \"${password}\"){username}}`
      });
      fetching('signup',
        'post',
        null,
        body
      )
      .then(response => response.json(), (err) => { throw err; })
      .then(json => {
        if (json.errors) {
          dispatch({
            type: actions.SET_ERRORS, payload:
              { errorMessages: json.errors.map(item => item.message), loggedIn: false, loggingIn: false, session: '' }
          });
        } else if (json && json.data && json.data.login) {
          dispatch({
            type: actions.SET_AUTHENTICATION_STATUS, payload:
              { errorMessages: [], loggedIn: false, loggingIn: false, session: session }
          });
        }
      });
    };
  },

  attemptLogin: function (username, password) {
    return (dispatch, getState) => {
      dispatch({ type: actions.SET_AUTHENTICATION_STATUS, payload: { loggingIn: true } });
      const body = JSON.stringify({
        operationName: null,
        query: `{login(username:\"${username}\", password: \"${password}\") {session}}`
      });
      fetching('login',
        'post',
        null,
        body
      )
      .then(response => response.json(), (err) => { throw err; })
      .then(json => {
        if (json.errors) {
          dispatch({
            type: actions.SET_AUTHENTICATION_STATUS, payload:
              { errorMessages: json.errors.map(item => item.message), loggedIn: false, loggingIn: false, session: '' }
          });
        } else if (json && json.data && json.data.login) {
          const session = json.data.login.session;
          document.cookie = "session=" + session
          dispatch({
            type: actions.SET_AUTHENTICATION_STATUS, payload:
              { errorMessages: [], loggedIn: true, loggingIn: false, session: session }
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
    return (dispatch, getState) => {
      document.cookie = "";
      dispatch({ type: actions.SET_AUTHENTICATION_STATUS, payload: { loggingOut: true } });
      fetching('logout',
        'post',
        null,
        JSON.stringify({})
      )
        .then(response => window.location = '/', (err) => { window.location = '/' });
    };
  },
}