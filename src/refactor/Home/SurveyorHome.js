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

const _SurveyorHome = (props) => (
  <View 
   style={styles.container}
  >
        <Button
              title={'New Customers'}
              buttonStyle={MasterStyleSheet.homeButtonStyle}
              onPress={() => Actions.customerList({ params: { id: props.profile, type: 'newcustomers' } })}
            />
            <Button
              title={'Customers to Followup'}
              buttonStyle={MasterStyleSheet.homeButtonStyle}
              onPress={() => Actions.customerList({ params: { id: props.profile, type: 'followup' } })}

            />
            <Button
              title={'Appointments'}
              buttonStyle={MasterStyleSheet.homeButtonStyle}
              onPress={() => Actions.customerList({ params: { id: props.profile, type: 'onsite' } })}
            />
            <Button
              title={'Surveys'}
              buttonStyle={MasterStyleSheet.homeButtonStyle}
              onPress={() => Actions.customerList({ params: { id: props.profile, type: 'inprogress' } })}

            />
            <Button
              title={'Completed Surveys'}
              buttonStyle={MasterStyleSheet.homeButtonStyle}
              onPress={() => Actions.customerList({ params: { id: props.profile, type: 'surveycomplete' } })}
            />
          </View>

);

const mapStateToProps = state => ({
  profile: state.profile,
});

const SurveyorHome = compose(
  graphql(getUserandCustomers, {
    options: ({ id }) => ({ variables: { id }, pollInterval: 5000 }),
  }),
  connect(mapStateToProps, null),
)(_SurveyorHome);

export default SurveyorHome;
