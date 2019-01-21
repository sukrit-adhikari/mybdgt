import actions from '../actions/index.js';

export default function user(state = {auth:{loggedIn:false}}, action) {
    switch (action.type) {
    case actions.SET_AUTHENTICATION_STATUS:
      const val = Object.assign({},state,{"auth":action.payload});  
      return val;
    default:
      return state
    }
}