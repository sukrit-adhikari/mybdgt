export default function transaction(state = {transactions:[]}, action) {
    switch (action.type) {
    case 'REFRESH_TRANSACTIONS':
      return action.transactions;  
    default:
      return state
    }
}