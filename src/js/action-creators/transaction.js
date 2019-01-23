import actions from '../actions/index.js';
import fetching from '../graphql-client/fetching';

export default {
  refreshTransactions: function () {
    return (dispatch, getState, apiClient) => {
      const body = JSON.stringify({operationName: null,
        query:`{
          transactions {
            id,userId,amount,comment,accountId,credit,dateAndTime
          } 
        }`});
        console.log(body);

      fetching(null,
        'post',
        null,
        body)
      .then(response => response.json(),(err)=>{return err;})
      .then(result => {
        result.data.transactions[0].amount = parseInt(Math.random()*1000);
        dispatch({ type: actions.REFRESH_TRANSACTIONS, payload: { transactions: result.data.transactions } });
      });
    };
  }
}