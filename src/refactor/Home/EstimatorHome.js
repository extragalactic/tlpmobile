import React from 'react';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { View, Text, StyleSheet } from 'react-native';
import { MasterStyleSheet } from '../../style/MainStyles';
import { getUserandCustomers } from '../../graphql/queries';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
});

const _EstimatorHome = (props) => (
  <View 
   style={styles.container}
  >
         <Button
              title={'Ready for Pricing'}
              buttonStyle={MasterStyleSheet.readyPricingButtonStyle}
              onPress={() => Actions.customerListContainerQueue({ params: { id: props.profile, type: 'estimatequeue' } })}
            />
            <Button
              title={'New Estimates'}
              buttonStyle={MasterStyleSheet.newEstimatesButtonStyle}
              onPress={() => Actions.customerList({ params: { id: props.profile, type: 'myestimates' } })}
            />
            <Button
              title={'No Reply'}
              buttonStyle={MasterStyleSheet.estimateButtonStyle}
              onPress={() => Actions.customerList({ params: { id: props.profile, type: 'estimatefollowup' } })}
            />
            <Button
              title={'Estimate Complete'}
              buttonStyle={MasterStyleSheet.estimateCompleteButtonStyle}
              onPress={() => Actions.customerList({ params: { id: props.profile, type: 'estimatesent' } })}
            />
          </View>

);

const mapStateToProps = state => ({
  profile: state.profile,
});

const EstimatorHome = compose(
  graphql(getUserandCustomers, {
    options: ({ id }) => ({ variables: { id }, pollInterval: 5000 }),
  }),
  connect(mapStateToProps, null),
)(_EstimatorHome);

export default EstimatorHome;
