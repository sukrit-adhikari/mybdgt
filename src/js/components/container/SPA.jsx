import React from 'react';
// import { connect } from 'react-redux';
import TransactionList from '../presentation/TransactionList.jsx';

// const SPA = class SPA extends React.Component {
//     constructor(props){
//         super(props);
//     }
//     render(){
//         return (
//             <div>
//                 <h1>test SPA</h1>
//                 <TransactionList transactions={this.props.transactions}></TransactionList>
//             </div>
//           )   
//     }
// }

const SPA = () => {
        return (
            <div>
                <h1>SPA.jsx</h1>
                <TransactionList></TransactionList>
            </div>
          )   
}

export default SPA;

// const mapStateToProps = state => ({
//     transactions: state.transactions,
//     accounts: state.accounts
// })
  
// export default connect(
// mapStateToProps,
// // mapDispatchToProps
// )(SPA);