import React from 'react';
import { connect } from 'react-redux';

const TransactionList = function({transactions}) {
    return (<div>
        <h1>TransactionList.jsx</h1>
        {transactions.map(
            (item) => (
                <a key="id" href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">${item.amount}</h5>
                        <small>{item.dateAndTime}</small>
                    </div>
                    <p className="mb-1">{item.comment}</p>
                    <small>Some Text</small>
                </a>
            ))
        }
    </div>)
}

const mapStateToProps = (state) => ({
    transactions: state.transactions,
    accounts: state.accounts
})

export default connect(
    mapStateToProps
    // state=>state
    )(TransactionList);