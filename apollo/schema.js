const {
  gql
} = require('apollo-server');

const typeDefs = gql `
  type Query {
    getAllAppConfig: [AppConfig],
    getAppConfigById: AppConfig
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
`;

exports.typeDefs = typeDefs;
