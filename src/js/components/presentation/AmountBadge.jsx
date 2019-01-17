import React from 'react';

class AmountBadge extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <span>
        <span className=" badge badge-success">0</span>
        <span className="badge badge-danger">-$30.00</span>
        </span>
        )
    }
}

export default AmountBadge;