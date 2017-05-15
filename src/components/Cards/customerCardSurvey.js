import React from 'react';
import { Card, Button } from 'react-native-elements';
import { View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { MasterStyleSheet } from '../../style/MainStyles';
import StreetViewContainer from '../../refactor/Maps/StreetViewContainer';

const CustomerCardSurvey = ({ customer }) => (
  <Card
    containerStyle={MasterStyleSheet.cardStyle}
    image={customer.survey.photos.length > 0 ? { uri: customer.survey.photos[0].photo } : null}
  >
    <View>
      <Button
        icon={{ name: 'assignment' }}
        backgroundColor="#03A9F4"
        buttonStyle={MasterStyleSheet.mainButtonStyle}
        title="Survey Details"
        onPress={() => Actions.surveyContainer()}
      />
    </View>
  </Card>
);

export default CustomerCardSurvey;

