const {
  gql
} = require('apollo-server');

const typeDefs = gql `
  type Query {
    allAppConfigs(limit: Int): [AppConfig],
    appConfigById(_id: String): AppConfig,
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

  type ConfigStats {
    _id: String,
    appConfigId: String,
    jsArraySortTime: Int,
    rustArraySortTime: Int
  }

  type Mutation {
    "Create new AppConfig"
    createAppConfig(algoType: ALGO_TYPE, withVisual: Boolean, speed: Int, array: [Int!]): AppConfig,
    createConfigStats(_id: String, jsArraySortTime: Int, rustArraySortTime: Int): ConfigStats
  }
`;

exports.typeDefs = typeDefs;
