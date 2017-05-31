import React from 'react';
import { connect } from 'react-redux';
import { Icon, Text } from 'react-native-elements';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { graphql, compose } from 'react-apollo';
import generics from '../../../Estimates/generics';

import {
 View,
 StyleSheet,
 ScrollView,
 AlertIOS,
} from 'react-native';

import { deletePrice } from '../../../../graphql/mutations';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    margin: 1,
    padding: 2,
  },
});

class _PhotoCard extends React.Component {
  deletePricefromDB = (description) => {
    AlertIOS.alert(
      'Are you sure?',
       'Price will be removed from estimate',
      [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Delete',
          onPress: () => {
            this.props.deletePriceFromServer({
              variables: {
                custid: this.props.currentCustomer,
                index: this.props.index,
                option: description,
              },
            }).then(() => {
              if (!this.props.price.description0) {
                this.props.onPress();
              }
            });
          },
        },
      ],
      );
  };

  render() {
    return (
      <View style={styles.card}>
        <ScrollView>
          { this.props.top ?
            <View>
              { this.props.second ? <View>
                {
      Object.keys(this.props.generics).map((item, index, value) => {
        if (this.props.generics[value[index]]) {
          return generics.map((generic) => {
            if (generic.prop === value[index]) {
              return generic.text();
            }
          });
        }
      })
    }
                {this.props.customText ?
                  <View>
                    <Text>{this.props.customText} </Text>
                  </View>


       : null}
              </View> : <View>


                { this.props.priceDetails.description0 ?

                  <Grid>
                    <Row
                      style={{
                        borderWidth: 1.5,
                        borderColor: 'grey',
                        borderRadius: 6,
                        flexDirection: 'row',
                        marginHorizontal: 10,
                      }}
                    >
                      <Col size={80}>
                        <Text h5>{this.props.priceDetails.description0}</Text>
                      </Col>
                      <Col size={18}>
                        <Text style={{
                          fontSize: 16
                        }} > ${this.props.priceDetails.amount0}</Text>
                      </Col>
                      <Col size={15}>
                        <Icon color={'red'} name={'close'} onPress={() => this.props.deletePrice('0')} />
                      </Col>

                    </Row>
                  </Grid>
       : null}

                { this.props.priceDetails.description1 ?

                  <Grid>
                    <Row
                      style={{
                        borderWidth: 1.5,
                        borderColor: 'grey',
                        borderRadius: 6,
                        flexDirection: 'row',
                        marginHorizontal: 10,
                      }}
                    >
                      <Col size={80}>
                        <Text h5>{this.props.priceDetails.description1}</Text>
                      </Col>
                      <Col size={18}>
                        <Text 
                           style={{
                          fontSize: 16
                        }}
                        > ${this.props.priceDetails.amount1}</Text>
                      </Col>
                      <Col size={10}>
                        <Icon color={'red'} name={'close'} onPress={() => this.props.deletePrice('1')} />
                      </Col>

                    </Row>
                  </Grid>
       : null}
                { this.props.priceDetails.description2 ?
                  <Grid>
                    <Text
                      style={{
                        alignSelf: 'center',
                      }}
                      h4
                    >OR</Text>
                    <Row
                      style={{
                        borderWidth: 1.5,
                        borderColor: 'grey',
                        borderRadius: 6,
                        flexDirection: 'row',
                        marginHorizontal: 10,
                      }}
                    >


                      <Col size={80}>
                        <Text h5>{this.props.priceDetails.description2}</Text>
                      </Col>
                      <Col size={19}>
                        <Text 
                           style={{
                          fontSize: 16
                        }}
                        > ${this.props.priceDetails.amount2}</Text>
                      </Col>
                      <Col size={10}>
                        <Icon color={'red'} name={'close'} onPress={() => this.props.deletePrice('2')} />
                      </Col>

                    </Row>
                  </Grid>
       : null}
                { this.props.priceDetails.description3 ?
                  <Grid>
                    <Text
                      style={{
                        alignSelf: 'center',
                      }}
                      h4
                    >OR</Text>
                    <Row
                      style={{
                        borderWidth: 1.5,
                        borderColor: 'grey',
                        borderRadius: 6,
                        flexDirection: 'row',
                        marginHorizontal: 10,
                      }}
                    >
                      <Col size={80}>
                        <Text h5>{this.props.priceDetails.description3}</Text>
                      </Col>
                      <Col size={19}>
                        <Text 
                           style={{
                          fontSize: 16
                        }}
                        > ${this.props.priceDetails.amount3}</Text>
                      </Col>
                      <Col size={10}>
                        <Icon color={'red'} name={'close'} onPress={() => this.props.deletePrice('3')} />
                      </Col>

                    </Row>
                  </Grid>
       : null}

                { this.props.priceDetails.description4 ?

                  <Grid>
                    <Text
                      style={{
                        alignSelf: 'center',
                      }}
                      h4
                    >OR</Text>
                    <Row
                      style={{
                        borderWidth: 1.5,
                        borderColor: 'grey',
                        borderRadius: 6,
                        flexDirection: 'row',
                        marginHorizontal: 10,
                      }}
                    >


                      <Col size={80}>
                        <Text h5>{this.props.priceDetails.description4}</Text>
                      </Col>
                      <Col size={19}>
                        <Text 
                           style={{
                          fontSize: 16
                        }}
                        > ${this.props.priceDetails.amount4}</Text>
                      </Col>
                      <Col size={10}>
                        <Icon color={'red'} name={'close'} onPress={() => this.props.deletePrice('4')} />
                      </Col>

                    </Row>
                  </Grid>
       : null}


                { this.props.priceDetails.description5 ?

                  <Grid>
                    <Text
                      style={{
                        alignSelf: 'center',
                      }}
                      h4
                    >OR</Text>
                    <Row
                      style={{
                        borderWidth: 1.5,
                        borderColor: 'grey',
                        borderRadius: 6,
                        flexDirection: 'row',
                        marginHorizontal: 10,
                      }}
                    >


                      <Col size={80}>
                        <Text h5>{this.props.priceDetails.description5}</Text>
                      </Col>
                      <Col size={19}>
                        <Text 
                           style={{
                          fontSize: 16
                        }}
                        > ${this.props.priceDetails.amount5}</Text>
                      </Col>
                      <Col size={10}>
                        <Icon color={'red'} name={'close'} onPress={() => this.props.deletePrice('5')} />
                      </Col>

                    </Row>
                  </Grid>
       : null}
              </View> }
            </View> : <View>
              { this.props.price.description ?
                <Grid>
                  <Row
                    style={{
                      borderWidth: 1.5,
                      borderColor: 'grey',
                      borderRadius: 6,
                      flexDirection: 'row',
                      marginHorizontal: 10,
                      marginVertical: 10,
                    }}
                  >
                    <Col size={80}>
                      <Text h5>{this.props.price.description}</Text>
                    </Col>
                    <Col size={18}>
                      <Text 
                         style={{
                          fontSize: 16
                        }}
                      > ${this.props.price.amount}</Text>
                    </Col>
                    <Col size={10}>
                      <Icon color={'red'} name={'close'} onPress={() => this.deletePricefromDB('option0')} />
                    </Col>

                  </Row>
                </Grid>
       : null}

              { this.props.price.option1.description ?
                <Grid>
                  <Text
                    style={{
                      alignSelf: 'center',
                    }}
                    h4
                  >OR</Text>
                  <Row
                    style={{
                      borderWidth: 1.5,
                      borderColor: 'grey',
                      borderRadius: 6,
                      flexDirection: 'row',
                      marginHorizontal: 10,
                    }}
                  >
                    <Col size={80}>
                      <Text h5>{this.props.price.option1.description}</Text>
                    </Col>
                    <Col size={18}>
                      <Text 
                         style={{
                          fontSize: 16
                        }}
                      > ${this.props.price.option1.amount}</Text>
                    </Col>
                    <Col size={10}>
                      <Icon color={'red'} name={'close'} onPress={() => this.deletePricefromDB('option1')} />
                    </Col>

                  </Row>
                </Grid>
       : null}

              { this.props.price.option2.description ?
                <Grid>
                  <Text
                    style={{
                      alignSelf: 'center',
                    }}
                    h4
                  >OR</Text>
                  <Row
                    style={{
                      borderWidth: 1.5,
                      borderColor: 'grey',
                      borderRadius: 6,
                      flexDirection: 'row',
                      marginHorizontal: 10,
                    }}
                  >
                    <Col size={80}>
                      <Text h5>{this.props.price.option2.description}</Text>
                    </Col>
                    <Col size={18}>
                      <Text 
                         style={{
                          fontSize: 16
                        }}
                      > ${this.props.price.option2.amount}</Text>
                    </Col>
                    <Col size={10}>
                      <Icon color={'red'} name={'close'} onPress={() => this.deletePricefromDB('option2')} />
                    </Col>

                  </Row>
                </Grid>
       : null}
              { this.props.price.option3.description ?
                <Grid>
                  <Text
                    style={{
                      alignSelf: 'center',
                    }}
                    h4
                  >OR</Text>
                  <Row
                    style={{
                      borderWidth: 1.5,
                      borderColor: 'grey',
                      borderRadius: 6,
                      flexDirection: 'row',
                      marginHorizontal: 10,
                    }}
                  >
                    <Col size={80}>
                      <Text h5>{this.props.price.option3.description}</Text>
                    </Col>
                    <Col size={18}>
                      <Text 
                         style={{
                          fontSize: 16
                        }}
                      > ${this.props.price.option3.amount}</Text>
                    </Col>
                    <Col size={10}>
                      <Icon color={'red'} name={'close'} onPress={() => this.deletePricefromDB('option3')} />
                    </Col>

                  </Row>
                </Grid>
       : null}
              { this.props.price.option4.description ?
                <Grid>
                  <Text
                    style={{
                      alignSelf: 'center',
                    }}
                    h4
                  >OR</Text>
                  <Row
                    style={{
                      borderWidth: 1.5,
                      borderColor: 'grey',
                      borderRadius: 6,
                      flexDirection: 'row',
                      marginHorizontal: 10,
                    }}
                  >
                    <Col size={80}>
                      <Text h5>{this.props.price.option4.description}</Text>
                    </Col>
                    <Col size={18}>
                      <Text 
                         style={{
                          fontSize: 16
                        }}
                      > ${this.props.price.option4.amount}</Text>
                    </Col>
                    <Col size={10}>
                      <Icon color={'red'} name={'close'} onPress={() => this.deletePricefromDB('option4')} />
                    </Col>

                  </Row>
                </Grid>
       : null}
              { this.props.price.option5.description ?
                <Grid>
                  <Text
                    style={{
                      alignSelf: 'center',
                    }}
                    h4
                  >OR</Text>
                  <Row
                    style={{
                      borderWidth: 1.5,
                      borderColor: 'grey',
                      borderRadius: 6,
                      flexDirection: 'row',
                      marginHorizontal: 10,
                    }}
                  >
                    <Col size={80}>
                      <Text h5>{this.props.price.option5.description}</Text>
                    </Col>
                    <Col size={18}>
                      <Text 
                         style={{
                          fontSize: 16
                        }}
                      > ${this.props.price.option5.amount}</Text>
                    </Col>
                    <Col size={10}>
                      <Icon color={'red'} name={'close'} onPress={() => this.deletePricefromDB('option5')} />
                    </Col>
                  </Row>
                </Grid>
       : null}
            </View> }
        </ScrollView>
      </View>
    );
  }
}

const mapActionToggleGeneric = dispatch => ({
  toggleGeneric(generic) {
    dispatch({ type: 'TOGGLE_GENERICS_SELECTION', payload: generic });
  },
});
const mapActionDeletePrice = dispatch => ({
  deletePrice(priceDetails) {
    dispatch({ type: 'DELETE_PRICE', payload: priceDetails });
  },
});

const mapGenericStateToProps = state => ({
  generics: state.generics,
});

const mapStateToProps = state => ({
  currentCustomer: state.currentCustomer,
});

const mapCustomStateToProps = state => ({
  customText: state.customText,
});

const mapActionSavePriceDetails = dispatch => ({
  savePriceDetails(priceDetails) {
    dispatch({ type: 'SAVE_PRICE_DETAILS', payload: priceDetails });
  },
});

const mapPriceDecriptionStateToProps = state => ({
  priceDetails: state.priceDetails,
});

const PhotoCard = compose(
  graphql(deletePrice, { name: 'deletePriceFromServer' }),
  connect(mapGenericStateToProps, mapActionToggleGeneric),
  connect(mapPriceDecriptionStateToProps, mapActionSavePriceDetails),
  connect(null, mapActionDeletePrice),
  connect(mapStateToProps),
  connect(mapCustomStateToProps),
)(_PhotoCard);

export default PhotoCard;
