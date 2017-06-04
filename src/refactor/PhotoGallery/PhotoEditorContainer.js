import React from 'react';
import PropTypes from 'prop-types';
import { View, WebView } from 'react-native';
import { width, height } from 'react-native-dimension';
import Spinner from 'react-native-spinkit';

const styles = {
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 0,
    marginTop: 10,
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

    // console.log('custID = ' + custID);
    // console.log('docID = ' + docID);

    return (
      <View style={styles.view}>
        { !this.state.isLoaded &&
          <Spinner
            style={styles.spinner}
            type={'Wave'}
          />
        }
        <WebView
          style={styles.webview}
          contentInset={{ top: 10, left: 0, bottom: 0, right: 0 }}
          scalesPageToFit={false}
          onLoad={this.onLoadComplete}
          source={{ uri: `${BASE_URL}/photoedit/${custID}/${docID}` }}
          onMessage={this.receiveMessage}
        />
      </View>
    );
  }
}

export default PhotoEditorContainer;
