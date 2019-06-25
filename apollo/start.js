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

const errorHandler = err => console.dir(err);

MongoClient.connect(MONGO_URL, {
  useNewUrlParser: true
}, (err, database) => {
  const initApolloServer = (ApolloServer, typeDefs) => {

    if (err) errorHandler(err);

    console.log("Database created!");

    const dbInstance = database.db(dbName),
      appConfigs = dbInstance.collection('configs'); // create collection

    const prepare = o => {
      o._id = o._id.toString()
      return o;
    }

    const resolvers = {
      Query: {
        getAppConfigById: (root, {
          _id
        }) => appConfigs.findOne(ObjectId(_id), (err, result) => {
          if (err) errorHandler(err);
          return prepare(result);
        }),
        getAllAppConfigs: ($id) => (root, {}) =>
          appConfigs.find(ObjectId(_id), (err, result) => {
            if (err) errorHandler(err);
            return result.toArray().map(prepare);
          }),
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
