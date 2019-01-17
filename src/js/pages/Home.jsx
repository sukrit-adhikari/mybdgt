import React from 'react';
import Header from '../components/container/Header.jsx';
import TransactionList from '../components/container/TransactionList.jsx';
import TimeFilter from '../components/container/TimeFilter.jsx';

const Home = () => {
    return (<div>
        <Header></Header>
        <TimeFilter></TimeFilter>
        <div className="mt-3"><TransactionList></TransactionList></div>
    </div>)
}

export default Home;