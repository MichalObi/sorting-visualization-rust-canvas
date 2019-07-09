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
  query allAppConfigs($limit: Int) {
    allAppConfigs(limit: $limit) {
      _id,
      algoType,
      withVisual,
      speed
      array,
    }
  }`;

const ALL_APP_CONFIGS_STATS = gql `
  query allAppConfigsStats($limit: Int) {
    allAppConfigsStats(limit: $limit) {
      _id,
      appConfigId,
      jsArraySortTime,
      rustArraySortTime,
    }
  }`;

const ALL_APP_CONFIGS_WITH_STATS = gql `
  query allAppConfigsWithStats($limit: Int) {
    allAppConfigsWithStats(limit: $limit) {
      _id,
      appConfigId,
      algoType,
      withVisual,
      speed
      array,
      jsArraySortTime,
      rustArraySortTime,
    }
  }`;

const CREATE_APP_CONFIG = gql `
  mutation CreateAppConfig($algoType: ALGO_TYPE, $withVisual: Boolean, $speed: Int, $array: [Int!]){
    createAppConfig(algoType: $algoType, withVisual: $withVisual, speed: $speed, array: $array) {
      _id,
      algoType,
      withVisual,
      speed
      array,
    }
  }`;

const CREATE_CONFIG_STATS = gql `
  mutation createConfigStats($appConfigId:String, $jsArraySortTime: String, $rustArraySortTime: String){
    createConfigStats(appConfigId: $appConfigId, jsArraySortTime:$jsArraySortTime, rustArraySortTime:$rustArraySortTime) {
      _id,
      appConfigId,
      jsArraySortTime,
      rustArraySortTime,
    }
  }
  `;

const saveConfigStats = ({
  _id: appConfigId
}, configStats) => {
  const {
    jsArraySortTime,
    rustArraySortTime
  } = configStats;

  client.mutate({
      variables: {
        appConfigId,
        jsArraySortTime,
        rustArraySortTime,
      },
      mutation: CREATE_CONFIG_STATS,
      update: (cache, {
        data: {
          createConfigStats,
        }
      }) => {

        const {
          allAppConfigsStats
        } = cache.readQuery({
          query: ALL_APP_CONFIGS_STATS,
          variables: {
            limit: 0,
          }
        });

        cache.writeQuery({
          query: ALL_APP_CONFIGS_STATS,
          variables: {
            limit: 0,
          },
          data: {
            allAppConfigsStats: allAppConfigsStats.concat([createConfigStats]),
          }
        });
      }
    })
    .then(() => getAllAppConfigsStats())
    .catch(data => console.log('Saved stats error:', data))
};

const getAllAppConfigsWithStats = (limit = 0) => {
  client.query({
      query: ALL_APP_CONFIGS_WITH_STATS,
      variables: {
        limit,
      },
      fetchPolicy: 'network-only'
    })
    .then(res => console.log('App all configs with stats', res))
    .catch(data => console.log('App all configs with stats error:', data))
};

const getAllAppConfigs = (configStats, limit = 0) => {
  client.query({
      query: ALL_APP_CONFIGS,
      variables: {
        limit,
      },
      fetchPolicy: 'network-only'
    })
    .then(res => {
      console.log('App all configs', res);
      if (configStats) {
        const [lastAddedConfig] = res.data.allAppConfigs;

        saveConfigStats(lastAddedConfig, configStats);
      }
    })
    .catch(data => console.log('All configs error:', data))
};

const getAllAppConfigsStats = (limit = 0) => {
  client.query({
      query: ALL_APP_CONFIGS_STATS,
      variables: {
        limit,
      },
      fetchPolicy: 'network-only'
    })
    .then(res => console.log('App all configs stats', res))
    .catch(data => console.log('All configs stats error:', data))
}

const saveAppConfig = ({
  algoType,
  withVisual,
  speed,
  array,
}, getConfigStatsCb) => {
  client.mutate({
      variables: {
        algoType,
        withVisual,
        speed,
        array,
      },
      mutation: CREATE_APP_CONFIG,
      update: (cache, {
        data: {
          createAppConfig,
        }
      }) => {

        const {
          allAppConfigs
        } = cache.readQuery({
          query: ALL_APP_CONFIGS,
          variables: {
            limit: 0,
          }
        });

        cache.writeQuery({
          query: ALL_APP_CONFIGS,
          variables: {
            limit: 0,
          },
          data: {
            allAppConfigs: allAppConfigs.concat([createAppConfig]),
          }
        });
      }
    })
    .then(() => getAllAppConfigs(getConfigStatsCb(), 1))
    .catch(data => console.log('Saved config error:', data))
};

export {
  getAllAppConfigs,
  getAllAppConfigsStats,
  getAllAppConfigsWithStats,
  saveAppConfig,
}
