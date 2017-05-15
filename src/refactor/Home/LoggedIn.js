import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import codePush from 'react-native-code-push';
import Config from 'react-native-config';
import OneSignal from 'react-native-onesignal';
import RNCalendarEvents from 'react-native-calendar-events';
import UserHome from './UserHome';
import { acceptEstimate } from '../../graphql/mutations';

class _LoggedIn extends React.Component {
  static propTypes = {
    acceptEstimate: PropTypes.func.isRequired,
    profile: PropTypes.string.isRequired,
  }

  static defaultProps = {
    acceptEstimate: () => {},
    profile: '',
  }
  componentDidMount() {
    if (Config.PROD) {
      codePush.sync();
    }
    OneSignal.configure({});
    OneSignal.addEventListener('opened', this.onOpened);
    RNCalendarEvents.authorizeEventStore();
  }
  componentWillUnmount() {
    OneSignal.removeEventListener('opened', this.onOpened);
  }
  onOpened = (openResult) => {
    const customer = openResult.notification.payload.additionalData.customer;
    const action = openResult.notification.payload.additionalData.actionSelected;
    if (action === 'id1') {
      this.props.acceptEstimate({
        variables: {
          custid: customer,
          userid: this.props.profile,
          estimator: `${this.props.user.firstName} ${this.props.user.lastName}`
        },
      });
    }
  }

  render() {
    return (
      <UserHome
        id={this.props.profile}
      />
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile,
});

const mapUserStateToProps = state => ({
  user: state.user,
});

const LoggedIn = compose(
  connect(mapStateToProps, null),
  connect(mapUserStateToProps, null),
  graphql(acceptEstimate, { name: 'acceptEstimate' }),
)(_LoggedIn);

export default LoggedIn;
