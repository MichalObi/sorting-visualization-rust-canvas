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

const MONGO_URL = 'mongodb://localhost:27017/rust-canvas';

MongoClient.connect(MONGO_URL, {
  useNewUrlParser: true
}, (err, db) => {
  const initApolloServer = (ApolloServer, typeDefs) => {

    if (err) throw err;
    console.log("Database created!");
    db.close();

    const resolvers = {
      Query: {
        getAllAppConfig: () => [AppConfig],
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
