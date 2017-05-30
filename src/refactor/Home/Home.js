import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, Button } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { compose, graphql } from 'react-apollo';
import Auth0Lock from 'react-native-lock';
import Config from 'react-native-config';
import { checkUserLogin, getuserId, saveProfile } from '../LocalStore/StoreCreds';
import { getUser, checkConnection } from '../../graphql/mutations';



class _Home extends Component {
  static propTypes = {
    saveProfile: PropTypes.func.isRequired,
    saveUserObject: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    checkConnection: PropTypes.func.isRequired,
    setGraphqlConnectionStatus: PropTypes.func.isRequired,
    setAuthConnectionStatus: PropTypes.func.isRequired,
  }

  static defaultProps = {
    saveProfile: () => {},
    getUser: () => {},
    saveUserObject: () => {},
  }

  constructor() {
    super();
    this.lock = new Auth0Lock({ clientId: Config.AUTH0_ID, domain: Config.AUTH0_DOMAIN }, {});
  }
  componentDidMount() {
    this.logIn();
    this.checkGraphqlConnection();
    this.checkUserLogin();
    setInterval(() => {
      this.checkGraphqlConnection();
    }, 1000);
    setInterval(() => {
      this.checkUserLogin();
    }, 1000);
  }
  logIn = () => {
    this.lock.show({}, (err, profile, token) => {
      saveProfile(token.idToken, profile.identities[0].userId);
    });
  };
  checkGraphqlConnection = () => this.props.checkConnection()
      .then((res) => {
        if (res.data.checkConnection) {
          this.props.setGraphqlConnectionStatus(true);
        } else {
          this.props.setGraphqlConnectionStatus(false);
        }
      })
      .catch(() => this.props.setGraphqlConnectionStatus(false))
  checkUserLogin = () => {
    checkUserLogin()
    .then((status) => {
      if (status) {
        getuserId()
        .then((user) => {
          this.props.setAuthConnectionStatus(!!user.match(/^[0-9a-fA-F]{24}$/));
          this.props.getUser({
            variables: {
              id: user,
            },
          }).then(res => this.props.saveUserObject(res.data.getUser))
          .then(() => this.props.saveProfile(user));
        });
      }
    });
  }
  render() {
    return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
    <Text> Build # {DeviceInfo.getBuildNumber()} </Text>
      <Image
        style={{width: 300, height: 300, right: 12}}
        source={{uri: 'https://s3.ca-central-1.amazonaws.com/3lpm/webfiles/3lplogo.png'}}
      />
    { this.props.authStatus ? <View><Text>
      You are authenticated!
      </Text></View> :<View>
      <Text> You have not been authenticated </Text>
        <Button
       title={"login"}
       onPress={()=> this.logIn()}
      
       />
       </View>}

  { this.props.graphqlStatus ? <View><Text>
      You are connected!
      </Text></View> :<View>
      <Text> You are not connected </Text>
    
       </View>}

  </View>
  

    )

  }
}

const mapUserProfileToProps = state => ({
  profile: state.profile,
});

const mapGraphqlStatusToProps = state => ({
  graphqlStatus: state.graphqlStatus,
});

const mapAuthStatuseToProps = state => ({
  authStatus: state.authStatus,
});

const mapActionSaveUserIdToProps = dispatch => ({
  saveProfile(profile) {
    dispatch({ type: 'SAVE_PROFILE', payload: profile });
  },
});

const mapActionSaveGraphqlStatusToProps = dispatch => ({
  setGraphqlConnectionStatus(status) {
    dispatch({ type: 'SAVE_GRAPHQL_STATUS', payload: status });
  },
});
const mapActionSaveAuthStatusToProps = dispatch => ({
  setAuthConnectionStatus(status) {
    dispatch({ type: 'SAVE_AUTH_STATUS', payload: status });
  },
});


const mapActionSaveUserObjectToProps = dispatch => ({
  saveUserObject(user) {
    dispatch({ type: 'SAVE_USER', payload: user });
  },
});

const Home = compose(
  connect(mapUserProfileToProps, mapActionSaveUserIdToProps),
  connect(mapAuthStatuseToProps, mapActionSaveUserObjectToProps),
  connect(mapGraphqlStatusToProps, mapActionSaveGraphqlStatusToProps),
  connect(null, mapActionSaveAuthStatusToProps),
  graphql(getUser, { name: 'getUser' }),
  graphql(checkConnection, { name: 'checkConnection' }),
)(_Home);

export default Home;

/*
  if (this.props.authStatus && this.props.graphqlStatus) {
      return (
        <LoggedIn />
      );
    }
    return (
      <NoLogin
        serverIsOnline={this.props.graphqlStatus}
       /> 
    );


*/