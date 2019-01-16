import React from "react";
import Header from '../components/container/Header.jsx';

import NotFoundImage from '../../assets/icons/404.jpg';

const Error404 = class Error404 extends React.Component {
  constructor() {
    super();
    this.state = {
      
    };
  }

  render() {
    return (
        <div>
        <Header />
          <img className="img-fluid"  src={NotFoundImage} alt={"404 Not Found Image"}/> 
        </div>
    );
  }
}

export default Error404;