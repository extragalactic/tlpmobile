import React from 'react';
import _ from 'lodash';
import { Button, Grid, Row, Col, Card, Text, Icon } from 'react-native-elements';
import { View, TextInput, ScrollView } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { estimateStyles } from '../Style/estimateStyle';
import { getCustomer } from '../../graphql/queries';
import {
        addPrice,
        addNewPrice,
        deletePrice,
        editPriceDescription,
        editPriceAmount,
       } from '../../graphql/mutations';

class _PricingDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      numPrices: [''],
      description0: '',
      description1: '',
      description2: '',
      description3: '',
      description4: '',
      description5: '',
      amount0: '',
      amount1: '',
      amount2: '',
      amount3: '',
      amount4: '',
      amount5: '',
      showInput: false,
      prices: [true],
      textInput: '',
      filteredData: [],
    };
  }

  handleKeyDownDescription = (e, index, option) => {
    if (e.nativeEvent.key === 'Enter') {
      this.props.editPriceDescription({
        variables: {
          index,
          option,
          text: this.props.priceDescription.text,
          custid: this.props.id,
        },
      })
      .then((res) => {
        // console.log(res);
      });
    }
  }

  handleKeyDownAmount = (e, index, option) => {
    console.log(option)
    if (e.nativeEvent.key === 'Enter') {
      this.props.editPriceAmount({
        variables: {
          index,
          option,
          amount: this.props.priceAmount.amount,
          custid: this.props.id,
        },
      })
      .then((res) => {

      });
    }
  }
  addPricetoState = () => {
    const NumPricesArray = this.state.prices;
    NumPricesArray.push(true);
    this.setState({ prices: NumPricesArray });
  };
  removePricefromState = (index) => {
    const NumPricesArray = this.state.prices;
    NumPricesArray.splice(index, 1);
    this.setState({
      prices: NumPricesArray,
      [`description${index}`]: '',
      [`amount${index}`]: '',
    });
  }
  addPricetoEstimate = () => {
    const variable = {};
    _.forIn(this.state, (value, key) => {
      if (value) {
        variable[key] = value;
      }
    });
    variable.custid = this.props.id;
    delete variable.numPrices;
    delete variable.prices;
    delete variable.filteredData;
    this.props.addNewPrice({
      variables: variable,
    }).then((data) => {
      this.setState({
        description0: '',
        description1: '',
        description2: '',
        description3: '',
        description4: '',
        description5: '',
        amount0: '',
        amount1: '',
        amount2: '',
        amount3: '',
        amount4: '',
        amount5: '',
        prices: [true],
      });
    });
  }
  deletePrice = (index, description) => {
    this.props.deletePrice({
      variables: {
        custid: this.props.id,
        index,
        option: description,
      },
    });
  };

  handleInputPriceDescription = (text) => {
    this.props.savePriceDescription({ text });
  }
  handleInputPriceAmount = (amount) => {
    console.log(amount)
    this.props.savePriceAmount({ amount });
  }
  selectPreviousDescription = (text, index) => {
    const descriptionIndex = `description${index}`;
    this.setState({
      [descriptionIndex]: text,
    });
  };
  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}
      >
        <Grid>
          <Row
            size={0.8}
            backgroundColor={'#CFCFC4'}
          >
            <View
              style={{ flex: 1, flexDirection: 'row', marginTop: 100, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text h1 >Add Prices to Estimate </Text>
            </View>
          </Row>
          <Col
            backgroundColor={'#e7e8ee'}
            size={3.5}
          >
            <View
              style={estimateStyles.scrollView}
            >

              <KeyboardAwareScrollView>
                <Card
                  containerStyle={estimateStyles.priceCard}
                >
                  <View
                    style={estimateStyles.priceInputView}
                  >
                    { this.state.prices.map((item, index) => {
                      const textIndex = `description${index}`;
                      const priceIndex = `amount${index}`;
                      return (
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                          }}
                        >
                          <View>
                            {index !== 0 ?
                              <Icon
                                raised
                                style={{
                               }}
                                size={16}
                                name="close"
                                color="red"
                                onPress={() => this.removePricefromState(index)}
                              /> : null}


                          </View>
                          <TextInput
                            style={estimateStyles.priceDescription}
                            multiline
                            placeholder="Work Description"
                            onChangeText={text => this.setState({ [textIndex]: text })}
                            value={this.state[textIndex]}
                          />

                          <TextInput
                            style={estimateStyles.pricePrice}
                            keyboardType={'numeric'}
                            placeholder="Dollar Amount"
                            onKeyPress={this.handleKeyDown}
                            onChangeText={price => this.setState({ [priceIndex]: price })}
                            value={this.state[priceIndex]}
                          />
                          <ModalDropdown
                            style={estimateStyles.modalDropDown}
                            defaultValue={'Choose from previous'}
                            textStyle={{
                              fontSize: 24,
                            }}
                            dropdownTextStyle={{
                              fontSize: 24,
                            }}
                            dropdownStyle={estimateStyles.dropDown}
                            options={this.props.data.getPrices ? this.props.data.getPrices.map(price => price.description) : []}
                            onSelect={(idx, text) => {
                              this.selectPreviousDescription(text, index);
                            }}
                          />
                        </View>
                      );
                    })}

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                      }}
                    >

                      <Button
                        raised
                        title={'OR'}
                        onPress={this.addPricetoState}
                        buttonStyle={estimateStyles.estimateAddPriceButton}
                      />
                      <Button
                        raised
                        title={'ADD'}
                        onPress={this.addPricetoEstimate}
                        buttonStyle={estimateStyles.estimateAddPriceButton}
                      />
                    </View>
                  </View>
                </Card>

                { this.props.data.customer ?
                  this.props.data.customer.prices.map((price, index) => (
                    <View>

                      <Card containerStyle={estimateStyles.savedPriceCard} >

                        { !price.option1.description ?
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'column',
                              justifyContent: 'flex-end',
                              alignItems: 'flex-end',
                            }}
                          >
                            <Icon
                              size={16}
                              name="close"
                              color="red"
                              onPress={() => this.deletePrice(index, 'option0')}
                            />
                          </View>
                         : null }
                        <TextInput
                          style={estimateStyles.priceDescription}
                          multiline
                          placeholder="Work Description"
                          defaultValue={price.description}
                          onChangeText={text => this.handleInputPriceDescription(text)}
                          onKeyPress={e => this.handleKeyDownDescription(e, index, 'option0')}

                        />
                        <TextInput
                          style={estimateStyles.pricePrice}
                          keyboardType={'numeric'}
                          placeholder="Dollar Amount"
                          defaultValue={`${price.amount}`}
                          onChangeText={amount => this.handleInputPriceAmount(amount)}
                          onKeyPress={e => this.handleKeyDownAmount(e, index, 'option0')}

                        />
                        { price.option1.description ?
                          <View>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                              }}
                            >
                              <Icon
                                size={16}
                                name="close"
                                color="red"
                                onPress={() => this.deletePrice(index, 'option1')}
                              />
                            </View>
                            <TextInput
                              style={estimateStyles.priceDescription}
                              multiline
                              placeholder="Work Description"
                              defaultValue={price.option1.description}
                              onChangeText={text => this.handleInputPriceDescription(text)}
                              onKeyPress={e => this.handleKeyDownDescription(e, index, 'option1')}

                            />
                            <TextInput
                              style={estimateStyles.pricePrice}
                              keyboardType={'numeric'}
                              placeholder="Dollar Amount"
                              defaultValue={`${price.option1.amount}`}
                              onChangeText={amount => this.handleInputPriceAmount(amount)}
                              onKeyPress={e => this.handleKeyDownAmount(e, index, 'option1')}

                            />
                          </View>
                     : null}
                        { price.option2.description ?
                          <View>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                              }}
                            >
                              <Icon
                                size={16}
                                name="close"
                                color="red"
                                onPress={() => this.deletePrice(index, 'option2')}
                              />
                            </View>
                            <TextInput
                              style={estimateStyles.priceDescription}
                              multiline
                              placeholder="Work Description"
                              defaultValue={price.option2.description}
                              onChangeText={text => this.handleInputPriceDescription(text)}
                              onKeyPress={e => this.handleKeyDownDescription(e, index, 'option2')}

                            />
                            <TextInput
                              style={estimateStyles.pricePrice}
                              keyboardType={'numeric'}
                              placeholder="Dollar Amount"
                              defaultValue={`${price.option2.amount}`}
                              onChangeText={amount => this.handleInputPriceAmount(amount)}
                              onKeyPress={e => this.handleKeyDownAmount(e, index, 'option2')}

                            />
                          </View>
                     : null}
                        { price.option3.description ?
                          <View>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                              }}
                            >
                              <Icon
                                size={16}
                                name="close"
                                color="red"
                                onPress={() => this.deletePrice(index, 'option3')}
                              />
                            </View>
                            <TextInput
                              style={estimateStyles.priceDescription}
                              multiline
                              placeholder="Work Description"
                              defaultValue={price.option3.description}
                              onChangeText={text => this.handleInputPriceDescription(text)}
                              onKeyPress={e => this.handleKeyDownDescription(e, index, 'option3')}
                            />
                            <TextInput
                              style={estimateStyles.pricePrice}
                              keyboardType={'numeric'}
                              placeholder="Dollar Amount"
                              defaultValue={`${price.option3.amount}`}
                              onChangeText={amount => this.handleInputPriceAmount(amount)}
                              onKeyPress={e => this.handleKeyDownAmount(e, index, 'option3')}
                            />
                          </View>
                     : null}
                        { price.option4.description ?
                          <View>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                              }}
                            >
                              <Icon
                                size={16}
                                name="close"
                                color="red"
                                onPress={() => this.deletePrice(index, 'option4')}
                              />
                            </View>
                            <TextInput
                              style={estimateStyles.priceDescription}
                              multiline
                              placeholder="Work Description"
                              defaultValue={price.option4.description}
                              onChangeText={text => this.handleInputPriceDescription(text)}
                              onKeyPress={e => this.handleKeyDownDescription(e, index, 'option4')}

                            />
                            <TextInput
                              style={estimateStyles.pricePrice}
                              keyboardType={'numeric'}
                              placeholder="Dollar Amount"
                              defaultValue={`${price.option4.amount}`}
                              onChangeText={amount => this.handleInputPriceAmount(amount)}
                              onKeyPress={e => this.handleKeyDownAmount(e, index, 'option4')}

                            />
                          </View>
                     : null}
                        { price.option5.description ?
                          <View>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                              }}
                            >
                              <Icon
                                size={16}
                                name="close"
                                color="red"
                                onPress={() => this.deletePrice(index, 'option5')}
                              />
                            </View>
                            <TextInput
                              style={estimateStyles.priceDescription}
                              multiline
                              placeholder="Work Description"
                              defaultValue={price.option5.description}
                              onChangeText={text => this.handleInputPriceDescription(text)}
                              onKeyPress={e => this.handleKeyDownDescription(e, index, 'option5')}
                            />
                            <TextInput
                              style={estimateStyles.pricePrice}
                              keyboardType={'numeric'}
                              placeholder="Dollar Amount"
                              defaultValue={`${price.option5.amount}`}
                              onChangeText={amount => this.handleInputPriceAmount(amount)}
                              onKeyPress={e => this.handleKeyDownAmount(e, index, 'option5')}
                            />
                          </View>
                     : null}
                      </Card>
                    </View>
                 ),
              ) : null}
              </KeyboardAwareScrollView>
            </View>
          </Col>
        </Grid>
      </View>
    );
  }
}

const mapActionSavePriceDecription = dispatch => ({
  savePriceDescription(priceDescription) {
    dispatch({ type: 'SAVE_PRICE_DESCRIPTION', payload: priceDescription });
  },
});

const mapActionSavePriceAmount = dispatch => ({
  savePriceAmount(priceAmount) {
    dispatch({ type: 'SAVE_PRICE_AMOUNT', payload: priceAmount });
  },
});

const mapPriceDecriptionStateToProps = state => ({
  priceDescription: state.priceDescription,
});
const mapPriceAmountStateToProps = state => ({
  priceAmount: state.priceAmount,
});

const PricingDetails = compose(
    graphql(getCustomer, {
      options: ({ id }) => ({ variables: { id }, pollInterval: 1000 }),
    }),
    graphql(addNewPrice, { name: 'addNewPrice' }),
    graphql(addPrice, { name: 'addPrice' }),
    graphql(deletePrice, { name: 'deletePrice' }),
    graphql(editPriceDescription, { name: 'editPriceDescription' }),
    graphql(editPriceAmount, { name: 'editPriceAmount' }),
    connect(mapPriceDecriptionStateToProps, mapActionSavePriceDecription),
    connect(mapPriceAmountStateToProps, mapActionSavePriceAmount),
)(_PricingDetails);

export default PricingDetails;
