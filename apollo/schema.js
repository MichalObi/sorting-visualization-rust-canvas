const {
  gql
} = require('apollo-server');

const typeDefs = gql `
  type Query {
    getAllAppConfigs: [AppConfig],
    getAppConfigById(_id: String): AppConfig,
  }

  enum ALGO_TYPE {
    bubble,
    quick,
    merge,
  }

  type AppConfig {
    _id: String,
    algoType: ALGO_TYPE,
    withVisual: Boolean,
    speed: Int,
    array: [Int!],
  }

  type Mutation {
    "Create new AppConfig"
    createAppConfig(algoType: ALGO_TYPE, withVisual: Boolean, speed: Int, array: [Int!]): AppConfig,
  }
`;

exports.typeDefs = typeDefs;
