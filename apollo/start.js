const {
  ApolloServer
} = require('apollo-server');

const {
  MongoClient,
  ObjectId
} = require('mongodb');

const {
  typeDefs
} = require('./schema');

const {
  initMongoDB
} = require('./../mongo/init-mongo.js');

const initApolloServer = (ApolloServer, typeDefs, dbInstance) => {

  const appConfigs = dbInstance.collection('configs'),
    appStats = dbInstance.collection('configsStats');

  const prepare = o => {
    o._id = o._id.toString()
    return o;
  }

  const resolvers = {
    Query: {
      appConfigById: async (root, {
        _id
      }) => prepare(await appConfigs.findOne(ObjectId(_id))),

      allAppConfigs: async (root, {
          limit
        }) =>
        (await appConfigs.find({}).limit(limit).sort({
          '_id': -1
        }).toArray()).map(prepare),

      appConfigStatsById: async (root, {
        _id
      }) => prepare(await appStats.findOne(ObjectId(_id))),

      allAppConfigsStats: async (root, {
          limit
        }) =>
        (await appStats.find({}).limit(limit).sort({
          '_id': -1
        }).toArray()).map(prepare)
    },
    Mutation: {
      createAppConfig: async (root, args) => {
        const {
          insertedIds
        } = await appConfigs.insert(args);

        return prepare(await appConfigs.findOne({
          _id: insertedIds['0']
        }));
      },

      createConfigStats: async (root, args) => {
        const {
          insertedIds
        } = await appStats.insert(args);

        return prepare(await appStats.findOne({
          _id: insertedIds['0']
        }));
      }
    }
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.listen().then(({
    url
  }) => console.log(`Server ready at ${url}`));
}

initMongoDB()
  .then(db =>
    initApolloServer(ApolloServer, typeDefs, db.getDbInstance()));
