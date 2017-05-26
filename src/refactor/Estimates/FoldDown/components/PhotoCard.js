import React from 'react';
import { connect } from 'react-redux';
import { Icon, Text } from 'react-native-elements';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { graphql, compose } from 'react-apollo';


import {
  View,
  StyleSheet,
 ScrollView,
} from 'react-native';

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
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    setInterval(() => {
      this.setState(this.state);
    }, 1000);
  }

  deletePrice = (param) => {
    this.props.deletePrice(param);
    console.log(param);
  }

  render() {
    return (
      <View style={styles.card}>
        <ScrollView>


          { this.props.priceDetails.description0 ?
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
                  <Text h5>{this.props.priceDetails.description0}</Text>
                </Col>
                <Col size={18}>
                  <Text h4 > ${this.props.priceDetails.amount0}</Text>
                </Col>
                <Col size={10}>
                  <Icon color={'red'} name={'close'} onPress={() => this.props.deletePrice('0')} />
                </Col>

              </Row>
            </Grid>
       : null}

          { this.props.priceDetails.description1 ?

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
                  <Text h5>{this.props.priceDetails.description1}</Text>
                </Col>
                <Col size={18}>
                  <Text h4 > ${this.props.priceDetails.amount1}</Text>
                </Col>
                <Col size={10}>
                  <Icon color={'red'} name={'close'} />
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
                  <Text h4 > ${this.props.priceDetails.amount2}</Text>
                </Col>
                <Col size={10}>
                  <Icon color={'red'} name={'close'} />
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
                  <Text h4 > ${this.props.priceDetails.amount3}</Text>
                </Col>
                <Col size={10}>
                  <Icon color={'red'} name={'close'} />
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
                  <Text h4 > ${this.props.priceDetails.amount4}</Text>
                </Col>
                <Col size={10}>
                  <Icon color={'red'} name={'close'} />
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
                  <Text h4 > ${this.props.priceDetails.amount5}</Text>
                </Col>
                <Col size={10}>
                  <Icon color={'red'} name={'close'} />
                </Col>

              </Row>
            </Grid>
       : null}

        </ScrollView>
      </View>
    );
  }
}

const mapActionSavePriceDetails = dispatch => ({
  savePriceDetails(priceDetails) {
    dispatch({ type: 'SAVE_PRICE_DETAILS', payload: priceDetails });
  },
});


const mapActionDeletePrice = dispatch => ({
  deletePrice(priceDetails) {
    dispatch({ type: 'DELETE_PRICE', payload: priceDetails });
  },
});

const mapPriceDecriptionStateToProps = state => ({
  priceDetails: state.priceDetails,
});

const PhotoCard = compose(
  connect(mapPriceDecriptionStateToProps, mapActionSavePriceDetails),
  connect(null, mapActionDeletePrice),
)(_PhotoCard);

export default PhotoCard;
