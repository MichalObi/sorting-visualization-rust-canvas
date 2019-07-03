import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  onError: ({
    networkError,
    graphQLErrors
  }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});

const ALL_APP_CONFIGS = gql `
  query {
    allAppConfigs {
      _id,
      algoType,
      withVisual,
      speed
      array
    }
  }`;

const CREATE_APP_CONFIG = gql `
mutation CreateAppConfig($algoType: ALGO_TYPE, $withVisual: Boolean, $speed: Int, $array: [Int!]){
  createAppConfig(algoType: $algoType, withVisual: $withVisual, speed: $speed, array: $array) {
    algoType,
    withVisual,
    speed
    array
  }
}`;

const saveConfigStats = ({
  _id: appConfigId
}, configStats) => {
  const configStatsWithId = Object.assign({}, {
    appConfigId
  }, configStats);

  console.log('configStatsWithId', configStatsWithId);
};

const getAllAppConfigs = configStats => {
  client.query({
      query: ALL_APP_CONFIGS
    })
    .then(res => {
      console.log('All configs:', res);

      if (configStats) {
        const [lastAddedConfig] = res.data.allAppConfigs;

        saveConfigStats(lastAddedConfig, configStats);
      }
    })
    .catch(data => console.log('All configs error:', data))
};

const saveAppConfig = ({
  algoType,
  withVisual,
  speed,
  array
}, getConfigStatsCb) => {
  client.mutate({
      variables: {
        algoType,
        withVisual,
        speed,
        array
      },
      mutation: CREATE_APP_CONFIG,
      update: (cache, {
        data: {
          createAppConfig
        }
      }) => {

        const {
          allAppConfigs
        } = cache.readQuery({
          query: ALL_APP_CONFIGS
        });

        cache.writeQuery({
          query: ALL_APP_CONFIGS,
          data: {
            allAppConfigs: allAppConfigs.concat([createAppConfig])
          }
        });
      }
    })
    .then(() => getAllAppConfigs(getConfigStatsCb()))
    .catch(data => console.log('Saved config error:', data))
};

export {
  ALL_APP_CONFIGS,
  getAllAppConfigs,
  saveAppConfig
}
