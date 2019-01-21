import actions from '../actions/index.js';
import gql from "graphql-tag";

const authActionCreators = {
  attemptLogin: function (username,password) {
    return (dispatch, getState, apiClient) => {
        apiClient
        .query({
          query: gql`
          query{
            login(
              username:"${username}"
              password:"${password}"
            ){
              session
            }
          }
          `,
          fetchPolicy:'network-only',
        })
        .then(result => {
          const session = result.data.session;
          dispatch({ type: actions.SET_AUTH_COOKIE, payload: { session: session } });
        });
    };
  }
}

export default authActionCreators;