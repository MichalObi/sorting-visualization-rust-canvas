const {
  gql
} = require('apollo-server');

const typeDefs = gql `
  type Query {
    getAllAppConfigs: [AppConfig],
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

  type Mutation {
    "Create new app Config."
    createAppConfig(id: ID!, algoType: ALGO_TYPE, withVisual: Boolean, speed: Int, array: [Int!]): AppConfig
  }
`;

exports.typeDefs = typeDefs;
