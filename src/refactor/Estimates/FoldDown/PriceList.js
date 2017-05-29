import React from 'react';

import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import Row from './Row';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#4A637D',
    flex: 1,
    padding: 10,
    paddingTop: STATUSBAR_HEIGHT,
  },
});


class PriceList extends React.Component {
  constructor() {
    super();
    this.count = 90;
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <ScrollView
          style={styles.scrollView}
        >
          <Row zIndex={100} top createPDFPreview={this.props.createPDFPreview}  sendEstimate={this.props.sendEstimate}/>
          <Row zIndex={90} top second />
          {this.props.prices.map((price, idx) => (
            <Row zIndex={this.count = this.count - 10} top={false} second={false} price={price} index={idx} />),
      )}
        </ScrollView>
      </View>
    );
  }
}

export default PriceList;
