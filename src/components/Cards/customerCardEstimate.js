import React from 'react';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import { MasterStyleSheet } from '../../style/MainStyles';

const _CustomerCardEstimate = ({ ...props, customer }) => (
  <Card
    containerStyle={MasterStyleSheet.cardStyle}
    image={customer.survey.photos.length > 0 ? { uri: customer.survey.photos[0].photo } : null}

  >
    <View>
      <Button
        icon={{ name: 'assignment' }}
        backgroundColor="#03A9F4"
        buttonStyle={MasterStyleSheet.mainButtonStyle}
        title="Estimate"
        onPress={() => DeviceInfo.isTablet() ? Actions.myEstimates({ id: props.currentCustomer }) : Actions.myEstimatesiPhone({ id: props.currentCustomer })}
      />
    </View>
  </Card>
);

const mapStateToProps = state => ({
  currentCustomer: state.currentCustomer,
});
const CustomerCardEstimate = connect(mapStateToProps, null)(_CustomerCardEstimate);


export default CustomerCardEstimate;
