import React, { Component } from "react";
import Input from "./Input.jsx";
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
          id,userId,amount,accountId,credit,dateAndTime
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
      <div>
        <div class="row">
            {this.state.transactions.map((item) => (
              <div class="card col-lg-4 col-md-4">
                <div class="card-body">
                  <h5 class="card-title">{item.dateAndTime}</h5>
                  <p class="card-text">{item.amount}</p>
                  <a href="#" class="btn btn-primary">More</a>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default FormContainer;