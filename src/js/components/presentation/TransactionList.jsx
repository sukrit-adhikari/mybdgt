import React from 'react';

const TransactionList = class TransactionList extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return    (<div><h1>TL test</h1>
            {this.props.transactions.map(
                (item) => (
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">${item.amount}</h5>
                  <small>{item.dateAndTime}</small>
                </div>
                <p class="mb-1">{item.comment}</p>
                <small>Donec id elit non mi porta.</small>
              </a>
            ))
            }
                </div>
            );
    }
}

export default TransactionList;