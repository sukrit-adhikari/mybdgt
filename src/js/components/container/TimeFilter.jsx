import React from 'react';
import AmountBadge from '../presentation/AmountBadge.jsx';

class FilterBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div>
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown button
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
            </div>
            <AmountBadge></AmountBadge>
        </div>
        )
    }
}

export default FilterBar;