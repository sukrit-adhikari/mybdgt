import React from 'react';
import { connect } from 'react-redux';
import TransactionCard from '../presentation/TransactionCard.jsx';
import transactionActionCreators from '../../action-creators/transaction.js';

class TransactionList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.refreshTransactions();
    }

    render() {
        return (
            <app-container>
                {this.props.transactions.map((item) =>
                    <TransactionCard key={parseInt(item.id)} transaction={item}></TransactionCard>
                )}
            </app-container>)
    }
}

const mapStateToProps = (state) => ({
    transactions: state.transactions,
    accounts: state.accounts
});

const mapDispatchToProps = (dispatch) => {
    return {
        refreshTransactions: () => dispatch(transactionActionCreators.refreshTransactions())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionList);