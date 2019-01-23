var { buildSchema } = require('graphql');

module.exports =
    {
        schema:
            buildSchema(`
                type Query {
                    transactions: [Transaction]
                    accounts: [Account]
                    login(
                        username: String!
                        password: String!
                    ): Session!
                }
                type Mutation {
                    createUser(
                        username: String!
                        password: String!
                    ): UserObject
                }
                type Session{
                    session: String!
                }
                type UserObject{
                    id: Int!
                    username: String
                }
                type User{
                    id: Int
                    username: String
                    password: String
                }
                type Transaction {
                    id: Int
                    userId: Int
                    comment: String
                    amount: Float
                    accountId: Int 
                    credit: Int
                    dateAndTime: String
                }
                type Account {
                    id: Int
                    displayName: String
                    userId: Int
                }
                `),
    }
