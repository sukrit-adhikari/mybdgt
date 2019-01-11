import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const FormContainer = class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      transactions: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const client = new ApolloClient({
      uri: "http://localhost:8080/api"
    });
    client
      .query({
        query: gql`
      {
        transactions {
          id,userId,amount,comment,accountId,credit,dateAndTime
        } 
      }
    `
      })
      .then(result => {
        this.setState({
          transactions: result.data.transactions
        })
      })
  }
  handleChange(event) {
    // this.setState({ [event.target.id]: event.target.value });
  }
  render() {
    return (
      <div class="row">
        <div class="list-group">
            {this.state.transactions.map((item) => (
              <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${item.amount}</h5>
                <small>{item.dateAndTime}</small>
              </div>
              <p class="mb-1">{item.comment}</p>
              <small>Donec id elit non mi porta.</small>
            </a>
            ))}
        </div>
      </div>
    );
  }
}

export default FormContainer;