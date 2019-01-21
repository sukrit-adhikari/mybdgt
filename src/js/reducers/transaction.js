export default function transaction(state = {transactions:[]}, action) {
    switch (action.type) {
    case 'REFRESH_TRANSACTIONS':
      const val = {...state,"transactions":action.payload.transactions};
      return val;  
    default:
      return state
    }
}