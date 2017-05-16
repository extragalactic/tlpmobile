import React from 'react';
import PropTypes from 'prop-types';
import { View, WebView } from 'react-native';
import { Button } from 'react-native-elements';
import { width, height } from 'react-native-dimension';
import Spinner from 'react-native-spinkit';

import { MasterStyleSheet } from '../../style/MainStyles';

const styles = {
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
  },
  webview: {
    flex: 1,
    width: width(100),
    height: height(100),
  },
  spinner: {
    marginTop: 50,
  },
};
// const BASE_URL = 'http://localhost:8080';
const BASE_URL = 'https://tlpm.ca';

class PhotoEditorContainer extends React.Component {
  static propTypes = {
    custID: PropTypes.string.isRequired,
    docID: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  onLoadComplete = () => {
    this.setState({
      isLoaded: true,
    });
  }

  receiveMessage = () => {
    this.props.onBack();
  }

  render() {
    const custID = this.props.custID;
    const docID = this.props.docID;
    // const custID = '58dfbac55d535f2ecb726a83';
    // const docID = 'WVVHUZrulkKi';

    // console.log('custID = ' + custID);
    // console.log('docID = ' + docID);

    return (
      <View style={styles.view}>
        <Button
          icon={{ name: 'chevron-left' }}
          backgroundColor="#03A9F4"
          buttonStyle={MasterStyleSheet.mainButtonStyle}
          title="Back"
          onPress={this.props.onBack}
        />
        { !this.state.isLoaded &&
          <Spinner
            style={styles.spinner}
            type={'Wave'}
          />
        }
        <WebView
          style={styles.webview}
          contentInset={{ top: 10, left: 5, bottom: 5, right: 5 }}
          scalesPageToFit
          onLoad={this.onLoadComplete}
          source={{ uri: `${BASE_URL}/photoedit/${custID}/${docID}` }}
          onMessage={this.receiveMessage}
        />
      </View>
    );
  }
}

export default PhotoEditorContainer;
