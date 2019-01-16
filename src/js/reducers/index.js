import { combineReducers } from 'redux'
import transactionReducer from './transaction.js'
import accountReducer from './account.js'

export default combineReducers({
  transactions:transactionReducer,
  accounts:accountReducer
})