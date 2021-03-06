import React from 'react';
import { connect } from 'react-redux';
import TransactionCard from '../presentation/TransactionCard.jsx';
import transactionActionCreators from '../../action-creators/transaction.js';

class TransactionList extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(!this.props.transactions.length){
            this.props.refreshTransactions();
        }
    }

    render(){
        return (<app-container>
            <button onClick={this.props.refreshTransactions}>
                REFRESH
            </button>
            {
                this.props.transactions.map((item) =>{return (
                    <TransactionCard key={item.id} transaction={item}></TransactionCard>
                )
                })
            }
        </app-container>)
    }
}

const mapStateToProps = (state) => {
    return {transactions: state.transaction.transactions,
        accounts: state.account.accounts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        refreshTransactions: () => dispatch(transactionActionCreators.refreshTransactions())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionList);