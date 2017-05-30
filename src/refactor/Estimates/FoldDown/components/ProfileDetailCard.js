import React from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { getPrices } from '../../../../graphql/queries';
import { Button, CheckBox } from 'react-native-elements';
import generics from '../../../Estimates/generics';
import { MasterStyleSheet } from '../../../../style/MainStyles';

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
  //  console.log(this)
    if (this.props.data.loading) {
      return (
        <ActivityIndicator />
      );
    }
    return (
      <View style={styles.container}>
        {!this.props.second ? 
          
          <PickerIOS
          style={{
            bottom: 30,
            width: this.props.ui.width / 2.4,
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
        </PickerIOS> :

        <ScrollView>
          { generics.map(generic => (
            <CheckBox
              key={generic.prop}
              title={generic.des}
              onPress={() => this.props.toggleGeneric(generic.prop)}
              checked={this.props.generics[generic.prop]}
            />
                     ))}
        </ScrollView>
  }

      </View>
    );
  }
}

const mapActionSavePriceDecription = dispatch => ({
  savePriceDescription(priceDescription) {
    dispatch({ type: 'SAVE_PRICE_DESCRIPTION', payload: priceDescription });
  },
});

const mapActionToggleGeneric = dispatch => ({
  toggleGeneric(generic) {
    dispatch({ type: 'TOGGLE_GENERICS_SELECTION', payload: generic });
  },
});
const mapGenericStateToProps = state => ({
  generics: state.generics,
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

const mapUiStateToProps = state => ({
  ui: state.ui,
});


const ProfileDetailCard = compose(
    graphql(getPrices),
    connect(mapGenericStateToProps, mapActionToggleGeneric),
    connect(mapPricePickerStateToProps, mapActionSavePricePicker),
    connect(mapPriceDecriptionStateToProps, mapActionSavePriceDecription),
    connect(mapUiStateToProps),
)(_ProfileDetailCard);

export default ProfileDetailCard;
