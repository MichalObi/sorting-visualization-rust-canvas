const {
  ApolloServer
} = require('apollo-server');

const {
  typeDefs
} = require('./schema');

const initApolloServer = (ApolloServer, typeDefs) => {

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
