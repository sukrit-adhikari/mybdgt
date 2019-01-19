export default function transaction(state = {transactions:[]}, action) {
    switch (action.type) {
    case 'REFRESH_TRANSACTIONS':
      return action.payload.transactions;  
    default:
      return state
    }
}