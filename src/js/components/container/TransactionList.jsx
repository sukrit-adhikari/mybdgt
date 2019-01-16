import React from 'react';
import { connect } from 'react-redux';
import TransactionCard from '../presentation/TransactionCard.jsx';

const TransactionList = function ({ transactions }) {
    return (<div>
        {transactions.map((item) =>
            <TransactionCard key={parseInt(item.id)} transaction={item}></TransactionCard>
        )}
    </div>)
}

const mapStateToProps = (state) => (
{
    transactions: state.transactions,
    accounts: state.accounts
})

export default connect(
    mapStateToProps
    // state=>state
)(TransactionList);