const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    username: String!
    isFavored: Boolean
  }
  type Transfer {
    from: String!
    to: String!
    amount: Int!
    date: String
  }
  type AuthPayload {
    token: String!
    user: User!
  }
  type Error {
    error: String!
  }
  type Query {
    users: [User]
    transfers: [Transfer]
  }
  type Mutation {
    login(username: String!, password: String!): AuthPayload
    registerUser(username: String!, password: String!, isFavored: Boolean): User
    transferValue(from: String!, to: String!, amount: Int!): Transfer
  }
`;
