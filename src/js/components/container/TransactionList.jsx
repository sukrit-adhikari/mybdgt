import React from 'react';
import { connect } from 'react-redux';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import TransactionCard from '../presentation/TransactionCard.jsx';

class TransactionList extends React.Component{
    
    constructor(props){
        super(props);
    }
 
    componentWillMount(){
        const client = new ApolloClient({
            uri: "http://localhost:8181/api"
          });
          
          client
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
              store.dispatch({ type: 'REFRESH_TRANSACTIONS',transactions:result.data.transactions })
          })
    }
    
    render(){
        return (<div>
            {this.props.transactions.map((item) =>
                <TransactionCard key={parseInt(item.id)} transaction={item}></TransactionCard>
            )}
        </div>)
    }

}

const mapStateToProps = (state) => (
{
    transactions: state.transactions,
    accounts: state.accounts
})

// const mapDispatchToProps = (dispatch) => {
//     return {
//         reload: (id) => {
//             dispatch(toggleTodo(id))
//       }
//     }  
// }

export default connect(
    mapStateToProps
    // state=>state
)(TransactionList);