import actions from '../actions/index.js';
import util from '../util.js';

const session = util.getCookie('session') || null;
const defaultState = {auth:
    {
      session:session,
      errorMessages:[],
      loggingIn:false,
      loggedIn:false}
    };
export default function user(state = defaultState , action) {
    switch (action.type) {
    case actions.SET_AUTHENTICATION_STATUS:
      const val = Object.assign({},state,{"auth":action.payload});  
      return val;
    default:
      return state
    }
}