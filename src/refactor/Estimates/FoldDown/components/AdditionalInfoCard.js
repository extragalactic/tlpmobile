import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';

class _AdditionalInfoCard extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  getDescription = () => {
    if (this.props.priceDescription) {
      return this.props.priceDescription;
    }
    return this.props.pricePicker;
  }

  handleKeyDownAmount = (e) => {
    if (e.nativeEvent.key === 'Enter') {
      this.props.savePriceDetails({ amount: this.props.priceAmount, description: this.getDescription() });
      this.props.refresh();
      this.props.savePriceAmount('');
    }
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 10,
          paddingHorizontal: 16,
          flexDirection: 'row',

          backgroundColor: '#FFFFFF',
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: '#BDC2C9',
        }}
      >
        <TextInput
          keyboardType={'numeric'}

          autoFocus
          enablesReturnKeyAutomatically
          onKeyPress={e => this.handleKeyDownAmount(e)}
          placeholder={'Dollar Amount'}
          value={this.props.priceAmount}
          onChangeText={text => this.props.savePriceAmount(text)}
          style={{
            borderWidth: 1,
            borderRadius: 20,
            alignSelf: 'center',
            width: 580,
            height: 80,
            padding: 10,
            bottom: 10,
            fontSize: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </View>
    );
  }

}
const mapPriceAmountStateToProps = state => ({
  priceAmount: state.priceAmount,
});
const mapPriceDecriptionStateToProps = state => ({
  priceDescription: state.priceDescription,
});

const mapPricePickerStateToProps = state => ({
  pricePicker: state.pricePicker,
});
const mapActionSavePriceAmount = dispatch => ({
  savePriceAmount(priceAmount) {
    dispatch({ type: 'SAVE_PRICE_AMOUNT', payload: priceAmount });
  },
});

const mapActionSavePriceDetails = dispatch => ({
  savePriceDetails(priceDetails) {
    dispatch({ type: 'SAVE_PRICE_DETAILS', payload: priceDetails });
  },
});

const AdditionalInfoCard = compose(
  connect(mapPriceAmountStateToProps, mapActionSavePriceAmount),
  connect(null, mapActionSavePriceDetails),
  connect(mapPriceDecriptionStateToProps),
  connect(mapPricePickerStateToProps),
)(_AdditionalInfoCard);


export default AdditionalInfoCard;

