import React from 'react';
import Header from '../components/container/Header.jsx';
import TransactionList from '../components/container/TransactionList.jsx';
import TimeFilter from '../components/container/TimeFilter.jsx';
// import Favicon from '../../assets/favicon.ico';

const HomePage = () => {
    return (<app-page>
        <Header></Header>
        <TimeFilter></TimeFilter>
        <page-section>
            <div className="mt-3 row">
                <div className="col-lg-4">
                    <TransactionList></TransactionList>
                </div>
            </div>
        </page-section>
    </app-page>)
}

export default HomePage;