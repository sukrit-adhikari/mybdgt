import {Component} from 'react';
import { connect } from 'react-redux';
import TransactionList from '../presentation/TransactionList.jsx';

class SPA extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <h1>test SPA</h1>
                <TransactionList transactions={this.state.transactions}></TransactionList>
            </div>
          )   
    }
}

const mapStateToProps = function(state) {
    return {
        transactions: state.transactions,
        // loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps)(SPA);