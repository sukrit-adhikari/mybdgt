import React from 'react';

const TransactionCard = (props) => {return (<a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">${props.transaction.amount}</h5>
                <small>{props.transaction.dateAndTime}</small>
            </div>
            <p className="mb-1">{props.transaction.comment}</p>
            <small>Some Text</small>
        </a>)
}

export default TransactionCard;