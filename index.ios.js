import React from 'react';
import { AppRegistry } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ApolloProvider } from 'react-apollo';
import { Router } from 'react-native-router-flux';
import routes from './src/Routes';
import { profileReducer, saveUserReducer } from './src/reducers/authReducer';
import { customerReducer } from './src/reducers/currentCustomer';
import { genericsReducer } from './src/reducers/genericsReducer';
import
   { priceDescriptionReducer,
    priceAmountReducer,
    pricePickerReducer,
    priceDetailsReducer,
} from './src/reducers/pricingReducer';
import { uiReducer } from './src/reducers/uiReducers';
import { authStatusReducer, graphqlStatusReducer } from './src/reducers/statusReducer';
import { estimateReducer } from './src/reducers/estimateReducer';
import { editPriceReducer } from './src/reducers/editPriceReducer';

const client = new ApolloClient({
  connectToDevTools: true,
  networkInterface: createNetworkInterface({
    uri: 'https://tlpm.ca/graphql',
  },
    {
      shouldBatch: true,
      initialState: window.__APOLLO_STATE__,
    },
  ),
});
console.disableYellowBox = true;
const apollo = client.middleware();
const combinedReducers =
  combineReducers({
    profile: profileReducer,
    apollo: client.reducer(),
    user: saveUserReducer,
    priceDescription: priceDescriptionReducer,
    priceAmount: priceAmountReducer,
    currentCustomer: customerReducer,
    authStatus: authStatusReducer,
    graphqlStatus: graphqlStatusReducer,
    pricePicker: pricePickerReducer,
    priceDetails: priceDetailsReducer,
    generics: genericsReducer,
    customText: estimateReducer,
    editPrice: editPriceReducer,
    ui: uiReducer,
  });

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
const reduxStore = createStore(combinedReducers, composeEnhancers(
      applyMiddleware(apollo, thunk),
  ),
);
const tlpmobile = () => (
  <ApolloProvider
    client={client}
    store={reduxStore}
  >
    <Router scenes={routes} />
  </ApolloProvider>
);

AppRegistry.registerComponent('tlpmobile', () => tlpmobile);
