import React from 'react';
import Header from '../components/container/Header.jsx';
import TransactionList from '../components/container/TransactionList.jsx';
import TimeFilter from '../components/container/TimeFilter.jsx';

const Home = () => {
    return (<app-page>
        <Header></Header>
        <TimeFilter></TimeFilter>
        <page-section>
        <div className="mt-3">
            <TransactionList></TransactionList>
        </div>
        </page-section>
    </app-page>)
}

export default Home;