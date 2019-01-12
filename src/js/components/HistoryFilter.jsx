import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const HistoryFilter = class FormContainer extends Component {
    constructor(props) {
      super();
      this.state = {
      }
    }
    componentDidMount() {
        const client = new ApolloClient({
          uri: "http://localhost:8080/api"
        });
        client
          .query({
            query: gql`
          {
            accounts {
              id,displayName,userId
            } 
          }
        `
          })
          .then(result => {
            this.setState({
              accounts: result.data.accounts
            })
          })
          this.props.refreshAllAccount(result.data.accounts);
      }
      render() {
        return (
            <div>
            {this.props.store.accounts.map((item) => (
              <a class="dropdown-item" href="#">{item.displayName}</a>
            ))}
        </div>
        )
    }
}


export default HistoryFilter;