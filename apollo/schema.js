const {
  gql
} = require('apollo-server');

const typeDefs = gql `
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

exports.typeDefs = typeDefs;
