import React, {
  Component,
} from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
} from 'react-native';

import FoldView from 'react-native-foldview';

import ProfileDetailCard from './ProfileDetailCard';
import AdditionalInfoCard from './AdditionalInfoCard';

class _Row extends Component {

  componentWillMount() {
    this.renderBackface = this.renderBackface.bind(this);
    this.renderInnerBackFace = this.renderInnerBackFace.bind(this);
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
          <AdditionalInfoCard refresh={this.props.refresh} onPress={onPress} />
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
            backgroundColor: '#FFBD18',
            flex: 1,
            margin: 14,
            borderRadius: 2,
          }}
        >
          <TouchableHighlight
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={onPress}
          >
            <Text>
              Close
            </Text>
          </TouchableHighlight>

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
              <TextInput
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
              />

            </View>


          </View>

        </View>

        <View style={{ flex: 1 }}>

          <FoldView
            renderFrontface={this.renderBlankFace}
            renderBackface={this.renderBackface}
          >
            <ProfileDetailCard onPress={onPress} />
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

const mapPriceDecriptionStateToProps = state => ({
  priceDescription: state.priceDescription,
});

const mapPricePickerStateToProps = state => ({
  pricePicker: state.pricePicker,
});

const Row = compose(
  connect(mapPricePickerStateToProps),
  connect(mapPriceDecriptionStateToProps, mapActionSavePriceDecription),
)(_Row);

export default Row;

