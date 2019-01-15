import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const SPA = class SPA extends Component {
  constructor() {
    super();
    this.state = {
      
    };
  }
  componentWillMount() {
    // const client = new ApolloClient({
    //   uri: "/api"
    // });
    // client
    //   .query({
    //     query: gql`
    //   {
    //     transactions {
    //       id,userId,amount,comment,accountId,credit,dateAndTime
    //     } 
    //   }
    // `
    //   })
    //   .then(result => {
    //     store.dispatch({ type: 'REFRESH_TRANSACTIONS',transactions:result.data.transactions })
    //   })
  }
  refreshAllAccount(accounts){
    // store.dispatch({ type: 'REFRESH_ALL_ACCOUNT',accounts:accounts })
  }
  render() {
    return (
      <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Bdgt</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                  <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="#404">Credits</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="#404">History</a>
              </li>
              <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false">
                      Settings
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">Something else here</a>
                  </div>
              </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
      </div>
  </nav>

  <div class="container mt-3">
      <div>
          <div class="card mt-3">
              <div class="" id="headingTwo">
                  <h5 class="mb-0">
                      <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo"
                          aria-expanded="false" aria-controls="collapseTwo">
                          <ul class="navbar-nav mr-auto">
                              <li class="nav-item dropdown">
                                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      Last Week
                                  </a>
                                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                      <a class="dropdown-item" href="#">Action</a>
                                      <a class="dropdown-item" href="#">Another action</a>
                                      <div class="dropdown-divider"></div>
                                      <a class="dropdown-item" href="#">Something else here</a>
                                  </div>
                              </li>
                          </ul>
                      </button>
                      
                      <span class=" badge
                              badge-success">0</span>
                      <span class="badge badge-danger">-$30.00</span>
                  </h5>
              </div>

          </div>
          <div class="row mb-3">
              <div class="col-sm ">
                  <ul class="nav nav-pills mt-3">
                      <li class="nav-item">
                          <a class="nav-link active" href="#">All</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="#">Gas</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="#">Grocery</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="#">Rent</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="#">Internet</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="#">Electricity</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="#">Transfer</a>
                      </li>
                  </ul>
              </div>
          </div>
        <div class="row">
        <div class="list-group">
            {/* {store.getState().transactions.map((item) => (
              <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${item.amount}</h5>
                <small>{item.dateAndTime}</small>
              </div>
              <p class="mb-1">{item.comment}</p>
              <small>Donec id elit non mi porta.</small>
            </a>
            ))} */}
        </div>
      </div>
      </div>
  </div>
  </div>
    );
  }
}

export default SPA;