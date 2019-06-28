const {
  ApolloServer
} = require('apollo-server');

const {
  typeDefs
} = require('./schema');

const {
  MongoClient,
  ObjectId
} = require('mongodb');

const dbName = 'rust-canvas',
  MONGO_URL = `mongodb://localhost:27017/${dbName}`;

MongoClient.connect(MONGO_URL, {
  useNewUrlParser: true
}, (err, database) => {
  if (err) return console.dir(err);

  console.log("Database created!");

  const initApolloServer = (ApolloServer, typeDefs) => {

    const dbInstance = database.db(dbName),
      appConfigs = dbInstance.collection('configs');

    const prepare = o => {
      o._id = o._id.toString()
      return o;
    }

    const resolvers = {
      Query: {
        appConfigById: async (root, {
          _id
        }) => prepare(await appConfigs.findOne(ObjectId(_id))),

        allAppConfigs: async () =>
          (await appConfigs.find({}).toArray()).map(prepare)
      },
      Mutation: {
        createAppConfig: async (root, args) => {
          const {
            insertedIds
          } = await appConfigs.insert(args);

          return prepare(await appConfigs.findOne({
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
    }) => {
      console.log(`Server ready at ${url}`);
    });
  }

  initApolloServer(ApolloServer, typeDefs);

});
