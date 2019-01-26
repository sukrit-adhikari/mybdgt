import actions from '../actions/index.js';

export default function transaction(state = {transactions:[]}, action) {
    switch (action.type) {
    case actions.REFRESH_TRANSACTIONS:
      const val = Object.assign({},state,{"transactions":action.payload.transactions});
      return val;  
    default:
      return state
    }
}