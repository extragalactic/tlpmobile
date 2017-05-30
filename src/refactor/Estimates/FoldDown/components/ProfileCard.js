import React, {
  Component,
} from 'react';
import { connect } from 'react-redux';
import { Button, CheckBox } from 'react-native-elements';
import { graphql, compose } from 'react-apollo';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import generics from '../../../Estimates/generics';

import FoldView from 'react-native-foldview';
import {
        addPrice,
        addNewPrice,
        deletePrice,
        editPriceDescription,
        editPriceAmount,
       } from '../../../../graphql/mutations';

import ProfileDetailCard from './ProfileDetailCard';
import AdditionalInfoCard from './AdditionalInfoCard';
import MasterStyleSheet from '../../../../style/MainStyles';

class _Row extends Component {

  componentWillMount() {
    this.renderBackface = this.renderBackface.bind(this);
    this.renderInnerBackFace = this.renderInnerBackFace.bind(this);
  }

  submitPrice = () => {
    const payload = Object.assign({}, this.props.priceDetails, {
      custid: this.props.currentCustomer,
    });
    this.props.addNewPrice({
      variables: payload,
    })
    .then(() => this.props.clearPriceDetails({}));
  }

  renderBlankFace() {
    return (
      <View
        style={{
          backgroundColor: '#D6EFFF',
          flex: 1,
        }}
      />
    );
  }

  renderBackface() {
    const onPress = this.props.onPress;
    return (
      <View style={{ flex: 1 }}>

        <FoldView
          renderFrontface={this.renderBlankFace}
          renderBackface={this.renderInnerBackFace}
        >
          <AdditionalInfoCard refresh={this.props.refresh} second={this.props.second} onPress={onPress} />
        </FoldView>

      </View>
    );
  }

  renderInnerBackFace() {
    const onPress = this.props.onPress;
    return (
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: '#BDC2C9',
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
        }}
      >
        <View
          style={{
          //  backgroundColor: '#FFBD18',
            flex: 1,
            flexDirection: 'row',
           // margin: 14,
            borderRadius: 2,
          }}
        >

          <Button
            title={'Save'}
            buttonStyle={{
              width: 275,
              height: 86,
              backgroundColor: 'green',
              borderRadius: 10,
            }}
            onPress={this.submitPrice}
          />
          <Button
            title={'Close'}
            buttonStyle={{
              width: 275,
              height: 86,
              backgroundColor: 'red',
              borderRadius: 10,
            }}
            onPress={onPress}
          />
        </View>
      </View>
    );
  }
  render() {
    const onPress = this.props.onPress;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          flexDirection: 'column',
        }}
      >

        <View style={{ flex: 1 }} >
          <View
            style={{
              flex: 1,
              paddingBottom: 10,
              padding: 16,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

              }}
            >


              {!this.props.second ? <TextInput
                placeholder={'Work Description'}

                style={{
                  borderWidth: 1,
                  borderRadius: 20,
                  alignSelf: 'center',
                  width: 580,
                  height: 80,
                  padding: 10,
                  bottom: 10,
                }}
                multiline
                defaultValue={this.props.pricePicker}
                onChangeText={text => this.props.savePriceDescription(text)}
              /> :

null

      }

            </View>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <FoldView
            renderFrontface={this.renderBlankFace}
            renderBackface={this.renderBackface}
          >
            <ProfileDetailCard second={this.props.second} onPress={onPress} />
          </FoldView>
        </View>
      </View>
    );
  }
}

const mapActionSavePriceDecription = dispatch => ({
  savePriceDescription(priceDescription) {
    dispatch({ type: 'SAVE_PRICE_DESCRIPTION', payload: priceDescription });
  },
});

const mapActionSavePriceDetails = dispatch => ({
  clearPriceDetails(priceDetails) {
    dispatch({ type: 'CLEAR_PRICE_DETAILS', payload: priceDetails });
  },
});

const mapPriceDecriptionStateToProps = state => ({
  priceDescription: state.priceDescription,
});

const mapPricePickerStateToProps = state => ({
  pricePicker: state.pricePicker,
});

const mapPriceDetailsStateToProps = state => ({
  priceDetails: state.priceDetails,
});

const mapStateToProps = state => ({
  currentCustomer: state.currentCustomer,
});

const Row = compose(
  connect(mapStateToProps),
  connect(mapPricePickerStateToProps),
  connect(mapPriceDecriptionStateToProps, mapActionSavePriceDecription),
  connect(mapPriceDetailsStateToProps, mapActionSavePriceDetails),
  graphql(addNewPrice, { name: 'addNewPrice' }),
)(_Row);

export default Row;
