import actions from '../actions/index.js';
import util from '../util.js';

const session = util.getCookie('session') || null;
export default function user(state = {auth:{session:session,loggingIn:false,loggedIn:true}}, action) {
    switch (action.type) {
    case actions.SET_AUTHENTICATION_STATUS:
      const val = Object.assign({},state,{"auth":action.payload});  
      return val;
    default:
      return state
    }
}