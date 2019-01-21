export default function user(state = {auth:{loggedIn:false}}, action) {
    switch (action.type) {
    case 'SET_AUTHENTICATION_STATUS':
      const val = Object.assign({},state,{"auth":action.payload});  
      return val;
    default:
      return state
    }
}