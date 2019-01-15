import React, { Component } from "react";

import NotFoundImage from '../../assets/icons/404.jpg';

const Error404 = class Error404 extends Component {
  constructor() {
    super();
    this.state = {
      
    };
  }

  render() {
    return (
        <img src={NotFoundImage} alt={"404 Not Found Image"}/> 
    );
  }
}

export default Error404;