var { buildSchema } = require('graphql');

module.exports =
    {
        schema:
            buildSchema(`
                type Query {
                    transactions: [Transaction]
                    accounts: [Account]
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
