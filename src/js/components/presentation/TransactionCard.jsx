import React from 'react';

class TransactionCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var item = this.props.transaction;
        return (<a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">${item.amount}</h5>
                <small>{item.dateAndTime}</small>
            </div>
            <p className="mb-1">{item.comment}</p>
            <small>Some Text</small>
        </a>)
    }
}

export default TransactionCard;