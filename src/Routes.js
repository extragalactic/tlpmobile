import React from 'react';
import {
  Scene,
  Actions,
} from 'react-native-router-flux';

import Home from './refactor/Home/Home';
import GiftedChatContainer from './components/GiftedChat/GiftedChatContainer';
import EstimateContainer from './refactor/Estimates/EstimatesContainer';
import EstimateiPhone from './refactor/Estimates/EstimateIphone';
import SurveyContainer from './refactor/Survey/SurveyContainer';
import SurveyCompleteContainer from './refactor/Survey/SurveyCompleteContainer';
import CustomerListContainer from './refactor/CustomerList/CustomerListContainer';
import CustomerDetailsContainer from './refactor/CustomerDetails/CustomerDetailsContainer';
import CustomerListContainerQueue from './refactor/CustomerList/CustomerListContainerQueue';
import PhotoGalleryContainer from './refactor/PhotoGallery/PhotoGalleryContainer';
import PricingContainer from './refactor/Estimates/PricingContainer';
import StreetViewContainer from './refactor/Maps/StreetViewContainer';
import SearchContainer from './refactor/SearchCustomer/SearchContainer';
import PhotoEditorContainer from './refactor/PhotoGallery/PhotoEditorContainer';
import SurveyorHome from './refactor/Home/SurveyorHome';
import EstimatorHome from './refactor/Home/EstimatorHome';

const routes = Actions.create(
  <Scene key="root">
    <Scene
      key="home"
      component={Home}
    />
        <Scene
      key={'surveyorHome'}
      component={SurveyorHome}
      passProps
    />    
    <Scene
      key={'estimatorHome'}
      component={EstimatorHome}
      passProps
    />
    <Scene
      key={'giftedChatContainer'}
      component={GiftedChatContainer}
      passProps
    />
    <Scene
      key={'estimateContainer'}
      component={EstimateContainer}
      passProps
    />
    <Scene
      key={'customerList'}
      component={CustomerListContainer}
      passProps
    />
    <Scene
      key={'customerDetailsContainer'}
      component={CustomerDetailsContainer}
      passProps
    />
    <Scene
      key={'myEstimates'}
      component={EstimateContainer}
      passProps
    />
    <Scene
      key={'myEstimatesiPhone'}
      component={EstimateiPhone}
      passProps
    />
    <Scene
      key={'customerListContainerQueue'}
      component={CustomerListContainerQueue}
      passProps
    />
    <Scene
      key={'pricingContainer'}
      component={PricingContainer}
      passProps
    />
    <Scene
      key={'photoGalleryContainer'}
      component={PhotoGalleryContainer}
      passProps
      hideBackImage
      sceneStyle={{ marginTop: 50 }}
    />
    <Scene
      key={'streetView'}
      component={StreetViewContainer}
      passProps
    />
    <Scene
      key={'searchContainer'}
      component={SearchContainer}
      passProps
    />
    <Scene
      key={'surveyContainer'}
      component={SurveyContainer}
      passProps
    />
    <Scene
      key={'surveyCompleteContainer'}
      component={SurveyCompleteContainer}
      passProps
    />
    <Scene
      key={'photoEditor'}
      component={PhotoEditorContainer}
      passProps
    />
  </Scene>,
);

export default routes;

