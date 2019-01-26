import actions from '../actions/index.js';
import util from '../helpers/util.js';

const session = util.getCookie('session') || null;
const defaultState = {
  user:{
    username:null
  },
  auth:
    {
      session:session,
      errorMessages:[],
      loggingOut:false,
      loggingIn:false,
      loggedIn:false
    },
  notifications:[],
  errors:[],
  };
export default function user(state = defaultState , action) {
    switch (action.type) {
    case actions.SET_AUTHENTICATION_STATUS:
    {
      let val = Object.assign({},state,{"auth":action.payload});  
      return val;
    }
    case actions.SET_NOTIFICATIONS:
    {
      let val = Object.assign({},state,{"notifications":action.payload});  
      return val;
    }
    case actions.SET_ERRORS:
    {
      let val = Object.assign({},state,{"errors":action.payload});  
      return val;
    }
    default:
      return state
    }
}