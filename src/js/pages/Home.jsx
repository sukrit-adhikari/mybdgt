import React from 'react';
import Header from '../components/container/Header.jsx';
import TransactionList from '../components/container/TransactionList.jsx';

const Home = () => {
        return (<div>
            <Header></Header>
            <TransactionList></TransactionList>
        </div>)
}

export default Home;