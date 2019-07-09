const {
  gql
} = require('apollo-server');

const typeDefs = gql `
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
    jsArraySortTime: String,
    rustArraySortTime: String,
  }

  type AppConfigWithStats {
    _id: String,
    appConfigId: String,
    algoType: ALGO_TYPE,
    withVisual: Boolean,
    speed: Int,
    array: [Int!],
    jsArraySortTime: String,
    rustArraySortTime: String,
  }

  type Query {
    allAppConfigs(limit: Int): [AppConfig],
    appConfigById(_id: String): AppConfig,
    allAppConfigsStats(limit: Int): [ConfigStats],
    appConfigStatsById(_id: String): ConfigStats,
    allAppConfigsWithStats(limit: Int): [AppConfigWithStats],
  }

  type Mutation {
    "Create new AppConfig"
    createAppConfig(algoType: ALGO_TYPE, withVisual: Boolean, speed: Int, array: [Int!]): AppConfig,
    "Create new AppConfig stats"
    createConfigStats(_id: String, appConfigId:String, jsArraySortTime: String, rustArraySortTime: String): ConfigStats,
  }
`;

exports.typeDefs = typeDefs;
