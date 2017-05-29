import React from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { getPrices } from '../../../../graphql/queries';

import {
  View,
  StyleSheet,
  Text,
  PickerIOS,
 } from 'react-native';

const PickerItemIOS = PickerIOS.Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#BDC2C9',
  },
});

class _ProfileDetailCard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    if (this.props.data.loading) {
      return (
        <ActivityIndicator />
      );
    }
    return (
      <View style={styles.container}>
        <PickerIOS
          style={{
            bottom: 30,
          }}
          selectedValue={this.props.pricePicker}
          onValueChange={(value) => {
            this.props.savePricePicker(value);
            this.props.savePriceDescription('');
          }}
        >
          {this.props.data.getPrices.map((price, idx) => (
            <PickerItemIOS
              key={idx}
              value={price.description}
              label={price.description}
            />
        ))}


        </PickerIOS>
      </View>
    );
  }
}

const mapActionSavePriceDecription = dispatch => ({
  savePriceDescription(priceDescription) {
    dispatch({ type: 'SAVE_PRICE_DESCRIPTION', payload: priceDescription });
  },
});

const mapActionSavePricePicker = dispatch => ({
  savePricePicker(pricePicker) {
    dispatch({ type: 'SAVE_PRICE_PICKER', payload: pricePicker });
  },
});

const mapPricePickerStateToProps = state => ({
  pricePicker: state.pricePicker,
});

const mapPriceDecriptionStateToProps = state => ({
  priceDetails: state.priceDetails,
});

const ProfileDetailCard = compose(
    graphql(getPrices),
    connect(mapPricePickerStateToProps, mapActionSavePricePicker),
    connect(mapPriceDecriptionStateToProps, mapActionSavePriceDecription),
)(_ProfileDetailCard);

export default ProfileDetailCard;
