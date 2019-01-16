export default function transaction(state = {accounts:[]}, action) {
    switch (action.type) {
    case 'REFRESH_ALL_ACCOUNTS':
      return action.accounts
    default:
      return state
    }
}