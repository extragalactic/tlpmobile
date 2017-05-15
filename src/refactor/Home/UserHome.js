import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-spinkit';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import OneSignal from 'react-native-onesignal';
import Permissions from 'react-native-permissions';
import { getUserandCustomers } from '../../graphql/queries';
import { MasterStyleSheet } from '../../style/MainStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
});

class _UserHome extends React.Component {
  static propTypes = {
    profile: React.PropTypes.string,
    data: React.PropTypes.object,
  }
  static defaultProps = {
    profile: '',
    data: {},
  }
  componentDidMount() {
      Permissions.requestPermission('photo');
    setTimeout(() => {
      OneSignal.sendTags({
        userid: this.props.data.user._id,
        username: `${this.props.data.user.firstName}${this.props.data.user.lastName}`,
        estimator: this.props.data.user.estimator,
        surveyor: this.props.data.user.surveyor,
      });
    }, 5000);
  }
  render() {
    if (!this.props.data.user) {
      return (
        <Spinner />
      );
    }
    const user = this.props.data.user;
    return (
      <View
        style={styles.container}
      >
        <Text> Hey {this.props.data.user.firstName}! Choose an option below</Text>
        { user.surveyor ?
          <View>
            <Button
              title={'New Customers'}
              buttonStyle={MasterStyleSheet.homeButtonStyle}
              onPress={() => Actions.customerList({ params: { id: this.props.profile, type: 'newcustomers' } })}
            />
            <Button
              title={'Customers to Followup'}
              buttonStyle={MasterStyleSheet.homeButtonStyle}
              onPress={() => Actions.customerList({ params: { id: this.props.profile, type: 'followup' } })}

            />
            <Button
              title={'Appointments'}
              buttonStyle={MasterStyleSheet.homeButtonStyle}
              onPress={() => Actions.customerList({ params: { id: this.props.profile, type: 'onsite' } })}
            />
            <Button
              title={'Surveys'}
              buttonStyle={MasterStyleSheet.homeButtonStyle}
              onPress={() => Actions.customerList({ params: { id: this.props.profile, type: 'inprogress' } })}

            />
            <Button
              title={'Completed Surveys'}
              buttonStyle={MasterStyleSheet.homeButtonStyle}
              onPress={() => Actions.customerList({ params: { id: this.props.profile, type: 'surveycomplete' } })}
            />
          </View>
          : null}
        {user.estimator ?
          <View>
            <Button
              title={'Ready for Pricing'}
              buttonStyle={MasterStyleSheet.readyPricingButtonStyle}
              onPress={() => Actions.customerListContainerQueue({ params: { id: this.props.profile, type: 'estimatequeue' } })}
            />
            <Button
              title={'New Estimates'}
              buttonStyle={MasterStyleSheet.newEstimatesButtonStyle}
              onPress={() => Actions.customerList({ params: { id: this.props.profile, type: 'myestimates' } })}
            />
            <Button
              title={'Estimate Complete'}
              buttonStyle={MasterStyleSheet.estimateCompleteButtonStyle}
              onPress={() => Actions.customerList({ params: { id: this.props.profile, type: 'estimatesent' } })}
            />
          </View> : null}
        <Button
          title={'Search'}
          buttonStyle={MasterStyleSheet.searchButtonStyle}
          onPress={() => Actions.searchContainer()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

const UserHome = compose(
  graphql(getUserandCustomers, {
    options: ({ id }) => ({ variables: { id }, pollInterval: 5000 }),
  }),
  connect(mapStateToProps, null),
)(_UserHome);

export default UserHome;
