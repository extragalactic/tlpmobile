import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { CheckBox } from 'react-native-elements';
import {
  View,
  StyleSheet,
  PickerIOS,
  ActivityIndicator,
  ScrollView,
  TextInput,
 } from 'react-native';

import { getPrices } from '../../../../graphql/queries';
import generics from '../../../Estimates/generics';
import { editPriceDescription } from '../../../../graphql/mutations';

const PickerItemIOS = PickerIOS.Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#BDC2C9',
    borderWidth: 2,
    borderColor: 'grey',
  },
});

class _ProfileDetailCard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  submitNewDescription = () => {
    const index = this.props.index;
    const option = 'option0';
    this.props.editPriceDescription({
      variables: {
        index,
        option,
        text: this.props.editPrice.description,
        custid: this.props.customer.id,
      },
    })
}
  render() {
    if (this.props.data.loading) {
      return (
        <ActivityIndicator />
      );
    }
    return (
      <View style={styles.container}>
        {!this.props.second ?
          <View >
            {this.props.top ?
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <PickerIOS
                  style={{
                    marginTop: 27,
                    bottom: 30,
                    width: this.props.ui.width / 2.3,
                    height: this.props.ui.height / 5.5,
                    //backgroundColor: '#dcdcdc',
                  }}
                  selectedValue={this.props.pricePicker.description}
                  onValueChange={(description, item) => {
                    this.props.savePricePicker({ description, id: this.props.data.getPrices[item]._id });
                    this.props.savePriceDescription('');
                  }}
                >
                
                  {this.props.data.getPrices.map((price) => (
                    <PickerItemIOS
                      key={price._id}
                      value={price.description}
                      label={price.description}
                    />
        ))}
                </PickerIOS>
              </View>

            : <View
              style={{
                marginTop: 84,
                bottom: this.props.ui.height / 4.6,
                width: this.props.ui.width / 2.24,
                height: this.props.ui.height / 3.1,
                backgroundColor: '#dcdcdc',
                alignItems: 'center',
                justifyContent: 'center',
               borderWidth: 3,

              }}
            >
              <TextInput
                autoCorrect
                onChangeText={description => this.props.editPriceAction({ description, option: this.props.editPrice.option})}
                defaultValue={this.props.editPrice.description}
                multiline
                style={{
                 // borderWidth: 3,
                  paddingHorizontal: 20,
                  paddingTop: 20,
                  fontSize: 24,
                  padding: 30,
                  height: this.props.ui.height / 2.8,
                }}
              />
            </View>
      }
          </View> :
          <View
            style={{
              marginTop: 85,
              bottom: this.props.ui.height / 4.6,
              width: this.props.ui.width / 2.24,
              height: this.props.ui.height / 3.7,
              backgroundColor: '#dcdcdc',
              borderRadius:6,
              borderWidth: 5,
              borderColor: 'grey'

            }}
          >
            <ScrollView
              style={{
                borderWidth: 2,
                borderColor: 'grey',
                borderRadius: 2,
              }}
            >
              { generics.map(generic => (
                <CheckBox
                  key={generic.prop}
                  title={generic.des}
                  onPress={() => this.props.toggleGeneric(generic.prop)}
                  checked={this.props.generics[generic.prop]}
                />
                     ))}
            </ScrollView>
          </View>
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

const mapActionEditPrice = dispatch => ({
  editPriceAction(price) {
    dispatch({ type: 'EDIT_PRICE', payload: price });
  },
});

const mapPricePickerStateToProps = state => ({
  pricePicker: state.pricePicker,
});
const mapEditPriceState = state => ({
  editPrice: state.editPrice,
});
const mapPriceDecriptionStateToProps = state => ({
  priceDetails: state.priceDetails,
});

const mapUiStateToProps = state => ({
  ui: state.ui,
});


const ProfileDetailCard = compose(
    graphql(editPriceDescription, { name: 'editPriceDescription' }),
    graphql(getPrices, {
      options: { pollInterval: 5000 },
    }),
    connect(mapGenericStateToProps, mapActionToggleGeneric),
    connect(mapPricePickerStateToProps, mapActionSavePricePicker),
    connect(mapPriceDecriptionStateToProps, mapActionSavePriceDecription),
    connect(mapEditPriceState, mapActionEditPrice),
    connect(mapUiStateToProps),
)(_ProfileDetailCard);

export default ProfileDetailCard;
