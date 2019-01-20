import { combineReducers } from 'redux'
import transactionReducer from './transaction.js'
import accountReducer from './account.js'
import userReducer from './user.js'

export default combineReducers({
  transactions:transactionReducer,
  accounts:accountReducer,
  user:userReducer
})