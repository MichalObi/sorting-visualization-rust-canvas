const {
  gql
} = require('apollo-server');

const typeDefs = gql `
  type Query {
    "A simple type for getting started!"
    hello: String
  }

  enum ALGO_TYPE {
    BUBBLE,
    QUICK,
    MERGE
  }

  type AppConfig {
    id: ID!,
    algoType: ALGO_TYPE,
    withVisual: Boolean,
    speed: Int,
    array: String
  }
`;

exports.typeDefs = typeDefs;
