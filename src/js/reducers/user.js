export default function user(state = {user:{}}, action) {
    switch (action.type) {
    case 'REFRESH_USER':
      return action.payload.user;  
    default:
      return state
    }
}