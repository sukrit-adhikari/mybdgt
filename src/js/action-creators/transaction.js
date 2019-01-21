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
          `,
          fetchPolicy:'network-only',
        })
        .then(result => {
          result.data.transactions[0].amount = parseInt(Math.random()*1000);
          dispatch({ type: actions.REFRESH_TRANSACTIONS, payload: { transactions: result.data.transactions } });
        });
    };
  }
}

export default transactionActionCreators;