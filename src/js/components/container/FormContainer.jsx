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
        <div class="row"><table class="table table-responsive-sm">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Id</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
              <th scope="col">account</th>
            </tr>
          </thead>
          <tbody>
            {this.state.transactions.map((item) => (
              <tr>
                <th scope="row">2</th>
                <td>{item.id}</td>
                <td>{item.amount}</td>
                <td>{item.dateAndTime}</td>
                <td>account</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}

export default FormContainer;