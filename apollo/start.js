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
  const initApolloServer = (ApolloServer, typeDefs) => {

    if (err) return console.dir(err);

    console.log("Database created!");

    const dbInstance = database.db(dbName),
      appConfigs = dbInstance.collection('configs');

    const resolvers = {
      Query: {
        getAllAppConfigs: () => [AppConfig],
        getAppConfigById: ($id) => AppConfig,
      },
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
