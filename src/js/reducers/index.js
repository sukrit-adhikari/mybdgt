import { combineReducers } from 'redux'
import transaction from './transaction.js'
import account from './account.js'
import user from './user.js'

export default combineReducers({
  transaction,
  account,
  user
})