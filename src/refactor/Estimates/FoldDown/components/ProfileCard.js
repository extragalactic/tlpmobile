import React, {
  Component,
} from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { graphql, compose } from 'react-apollo';
import {
  View,
  StyleSheet,
  TextInput,
  AlertIOS,
} from 'react-native';

import FoldView from 'react-native-foldview';
import { addNewPrice } from '../../../../graphql/mutations';
import ProfileDetailCard from './ProfileDetailCard';
import AdditionalInfoCard from './AdditionalInfoCard';

class _Row extends Component {
  constructor() {
    super();
    this.state = {
      estimateSelect: '',
      estimateUrl: '',
    };
  }
  componentWillMount() {
    this.renderBackface = this.renderBackface.bind(this);
    this.renderInnerBackFace = this.renderInnerBackFace.bind(this);
  }

  submitPrice = () => {
    if (this.props.priceDetails.amount0 == "" )  {
    
      AlertIOS.alert("No Price Selected!");

     } else {
    const payload = Object.assign({}, this.props.priceDetails, {
      custid: this.props.currentCustomer,
    });
    this.props.addNewPrice({
      variables: payload,
    })
    .then(() => {
      this.props.clearPriceDetails({});
      AlertIOS.alert(
      'Price Submited',
       'Do you want to add another',
      [{ text: 'YES', onPress: () => console.log('YES') },
        { text: 'NO',
          onPress: () => this.props.onPress(),
        },
      ],
      );

    });
     }
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
          <AdditionalInfoCard index={this.props.index} customer={this.props.customer} top={this.props.top} refresh={this.props.refresh} second={this.props.second} onPress={onPress} />
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
            flex: 1,
            backgroundColor: '#dcdcdc',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2,
          }}
        >
         
    {this.props.top && !this.props.second  ? 
      <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
            }}
          >

            <Button
              title={'Save'}
              buttonStyle={{
                width: this.props.ui.width / 5.5,
                height: 86,
                backgroundColor: 'green',
                borderRadius: 10,
              }}
              onPress={this.submitPrice}
            />
            <Button
              title={'Close'}
              buttonStyle={{
                width: this.props.ui.width / 5,
                height: 86,
                backgroundColor: 'red',
                borderRadius: 10,
              }}
              onPress={onPress}
            />
      
      </View> : null}
     {this.props.second ? 
      <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
            }}
          >
            <Button
              title={'Close'}
              buttonStyle={{
                width: this.props.ui.width / 3,
                height: 86,
                backgroundColor: 'red',
                borderRadius: 10,
              }}
              onPress={onPress}
            />

          </View>      
       : null}

    {!this.props.top && !this.props.second ?     <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
            }}
          >

            <Button
              title={'Update'}
              buttonStyle={{
                width: this.props.ui.width / 5.5,
                height: 86,
                backgroundColor: 'blue',
                borderRadius: 10,
              }}
              //onPress={this.submitPrice}
            />
            <Button
              title={'Close'}
              buttonStyle={{
                width: this.props.ui.width / 5,
                height: 86,
                backgroundColor: 'red',
                borderRadius: 10,
              }}
              onPress={onPress}
            />
      
      </View> : null}



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
          borderWidth: 2,

        }}
      >
        <View style={{ flex: 1 }} >
          <View
            style={{
              flex: 1,
              paddingBottom: 10,
              padding: 3,
              borderWidth: 2,
              borderColor: 'grey',
            }}
          >
            {this.props.top || this.props.second ?
              <View>
                {!this.props.second ?
                  <View
                    style={{
                      backgroundColor: '#f5f5f5',

                    }}
                  >
                    <TextInput
                      autoCorrect
                      placeholder={'Work Description'}
                      style={{
                        marginTop: 10,
                        alignSelf: 'center',
                        width: this.props.ui.width / 2.4,
                        height: this.props.ui.height / 6,
                        padding: 3,
                        bottom: 10,
                      }}
                      multiline
                      defaultValue={this.props.pricePicker}
                      onChangeText={text => this.props.savePriceDescription(text)}
                    />
                  </View> :
                  <View
                    style={{
                      flex: 1,
                      height: this.props.ui.height / 5.6,
                    }}
                  />
      }
              </View>
                : null}

          </View>
        </View>
        <View style={{ flex: 1 }}>
          <FoldView
            renderFrontface={this.renderBlankFace}
            renderBackface={this.renderBackface}
          >
            <ProfileDetailCard index={this.props.index} top={this.props.top} customer={this.props.customer} second={this.props.second} onPress={onPress} />
          </FoldView>
        </View>
      </View>
    );
  }
}

const mapActionEditPrice = dispatch => ({
  editPriceAction(price) {
    dispatch({ type: 'EDIT_PRICE', payload: price });
  },
});


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
const mapEditPriceState = state => ({
  editPrice: state.editPrice,
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

const mapUiStateToProps = state => ({
  ui: state.ui,
});

const Row = compose(
  connect(mapStateToProps),
  connect(mapPricePickerStateToProps),
  connect(mapPriceDecriptionStateToProps, mapActionSavePriceDecription),
  connect(mapPriceDetailsStateToProps, mapActionSavePriceDetails),
  connect(mapEditPriceState, mapActionEditPrice),
  graphql(addNewPrice, { name: 'addNewPrice' }),
  connect(mapUiStateToProps),
)(_Row);

export default Row;
/*

         {this.props.top ? <View><Text>top</Text></View> : 
         
        
      }
          {this.props.second ? <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
            }}
          >
            <Button
              title={'Close'}
              buttonStyle={{
                width: this.props.ui.width / 3,
                height: 86,
                backgroundColor: 'red',
                borderRadius: 10,
              }}
              onPress={onPress}
            />

          </View> : <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
            }}
          >

            <Button
              title={'Save'}
              buttonStyle={{
                width: this.props.ui.width / 5.5,
                height: 86,
                backgroundColor: 'green',
                borderRadius: 10,
              }}
              onPress={this.submitPrice}
            />
            <Button
              title={'Close'}
              buttonStyle={{
                width: this.props.ui.width / 5,
                height: 86,
                backgroundColor: 'red',
                borderRadius: 10,
              }}
              onPress={onPress}
            />
          </View>}

  connect(mapEditPriceState, )

   <View
              style={{
                flex: 1,
                height: this.props.ui.height / 5.6,
                backgroundColor: 'blue'
              }}

              >
                <SegmentedControlIOS
                  values={['Preview', 'Sent']}
                  onValueChange={estimateSelect => this.setState({ estimateSelect })}
                />
                <ScrollView
                  style={{
                    backgroundColor: 'green'
                  }}
                >

                </ScrollView>
              </View>


                  <SegmentedControlIOS
                  values={['Preview', 'Sent']}
                  onValueChange={estimateSelect => this.setState({ estimateSelect })}
                />
                <ScrollView
                >

                    {this.state.estimateSelect === 'Preview' && this.props.customer.previewHistory.length > 0 ?
                            this.props.customer.previewHistory.map(preview => (
                              <ListItem
                                titleStyle={{
                                  fontSize: 12,
                                }}
                                containerStyle={{
                                 // height: 30,
                                  width: window.width - 8,
                                }}
                                title={`Preview Created @ ${preview.timestamp}`}
                                onPress={() => this.setState({
                                  estimateUrl: preview.url,
                                  estimatePreviewModal: true,
                                })}
                              />
                  ))
                  : null}
                    {this.state.estimateSelect === 'Sent' && this.props.customer.estimateHistory.length > 0 ?
                  this.props.customer.estimateHistory.map(preview => (
                    <ListItem
                      titleStyle={{
                        fontSize: 12,
                      }}
                      title={preview.timestamp}
                      onPress={() => this.setState({
                        estimateUrl: preview.url,
                        estimatePreviewModal: true,
                      })}
                    />
                  ))
                  : null}


                </ScrollView>


*/
