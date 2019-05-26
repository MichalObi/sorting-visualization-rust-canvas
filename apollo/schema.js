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
    array: [Int!]
  }

  type Mutation {
    "Get a specyfic gql app config base on id."
    getGqlAppConfig(id: ID!): AppConfig!
  }
`;

exports.typeDefs = typeDefs;
