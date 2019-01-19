import actions from '../actions/index.js';
import gql from "graphql-tag";

const transactionActionCreators = {
  refreshTransactions: function () {
    return (dispatch, getState, apiClient) => {
      apiClient
        .query({
          query: gql`
            {
              transactions {
                id,userId,amount,comment,accountId,credit,dateAndTime
              } 
            }
          `
        })
        .then(result => {
          dispatch({ type: actions.REFRESH_TRANSACTIONS, payload: { transactions: result.data.transactions } });
        });
    };
  }
}

export default transactionActionCreators;