import actions from '../actions/index.js';
import util from '../helpers/util.js';

const transactionActionCreators = {
  refreshTransactions: function () {
    return (dispatch, getState, apiClient) => {
      fetch('http://localhost:8181/api', {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
          "session":util.getCookie('session')
        },
        body: JSON.stringify({operationName: null,
          query:`{
            transactions {
              id,userId,amount,comment,accountId,credit,dateAndTime
            } 
          }`})
      })
      .then(response => response.json(),(err)=>{return err;})
      .then(result => {
        result.data.transactions[0].amount = parseInt(Math.random()*1000);
        dispatch({ type: actions.REFRESH_TRANSACTIONS, payload: { transactions: result.data.transactions } });
      });
    };
  }
}

export default transactionActionCreators;