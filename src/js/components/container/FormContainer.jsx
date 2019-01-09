import React, { Component } from "react";
import Input from "./Input.jsx";

const FormContainer = class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      seo_title: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  render() {
    const { seo_title } = this.state;
    return (
      <div>
      <form id="article-form">
        <Input
          text="SEO title"
          placeholder="placeholder"
          label="seo_title"
          type="text"
          id="seo_title"
          value={seo_title}
          handleChange={this.handleChange}
        />
      </form>
      </div>
    );
  }
}

export default FormContainer;