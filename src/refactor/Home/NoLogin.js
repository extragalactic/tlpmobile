import React, { PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-spinkit';
import Auth0Lock from 'react-native-lock';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { saveProfile } from '../LocalStore/StoreCreds';
import { MasterStyleSheet } from '../../style/MainStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
});

class _NoLogin extends React.Component {
  static propTypes = {
    serverIsOnline: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    serverIsOnline: false,
  }
  constructor() {
    super();
    this.lock = new Auth0Lock({ clientId: Config.AUTH0_ID, domain: Config.AUTH0_DOMAIN }, {});
  }

  logIn = () => {
    this.lock.show({}, (err, profile, token) => {
      saveProfile(token.idToken, profile.identities[0].userId);
    });
  };

  render() {
    return (
      <View
        style={styles.container}
      >
        { this.props.serverIsOnline ? <Button
          icon={{ name: 'lock-outline' }}
          backgroundColor="#03A9F4"
          title="Login"
          buttonStyle={MasterStyleSheet.mainButtonStyle}
          onPress={() => this.logIn()}
        /> :

        <View style={styles.container} >
          <Text>
          Cant Connect to Server!
          </Text>
          <Spinner />
        </View>
      }
      </View>
    );
  }
}

const mapActionsToProps = dispatch => ({
  saveProfile(profile) {
    dispatch({ type: 'SAVE_PROFILE', payload: profile });
  },
});

const NoLogin = connect(null, mapActionsToProps)(_NoLogin);

export default NoLogin;
