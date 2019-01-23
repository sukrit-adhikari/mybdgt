import React from 'react';
import Header from '../components/container/Header.jsx';
import TransactionList from '../components/container/TransactionList.jsx';
import TimeFilter from '../components/container/TimeFilter.jsx';

const HomePage = () => {
    return (<app-page>
        <Header></Header>
        <TimeFilter></TimeFilter>
        <page-section>
            <div className="mt-3">
                <div className="row">
                    <div className="col-lg-4">
                        <TransactionList></TransactionList>
                    </div>
                </div>

            </div>
        </page-section>
    </app-page>)
}

export default HomePage;