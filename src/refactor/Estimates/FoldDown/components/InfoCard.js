import React from 'react';
import { Icon, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-spinkit';

import generics from '../../../Estimates/generics';

import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  leftPane: {
    flex: 3,
    backgroundColor: '#CFFEF0',
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rightPane: {
    flex: 3,
    padding: 16,
    backgroundColor: '#EAFFEF',
  },
});


class _InfoCard extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (
      <View style={styles.container}>
        <Grid>
          <Row size={90} >
            <Col size={90} >
              { this.props.top ?
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  { this.props.second ? <View>
                    <Text h3 >Generics</Text>
                    <ScrollView>
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

    </ScrollView>            
                  </View> :
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                {this.props.ui.estimateSpinner ? <Spinner color={'#517fa4'} /> :
                <View
                   style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                >
               <Icon
                  name="photo-library"
                  color="#517fa4"
                  raised
                  reverse
                  size={32}
                  onPress={() => Actions.photoGalleryContainer()}
                />
                <Icon
                  name="picture-as-pdf"
                  color="#517fa4"
                  raised
                  reverse
                  size={32}
                  onPress={() => this.props.createPDFPreview()}
                />
                  <Icon
                    name="send"
                    color="#517fa4"
                    raised
                    reverse
                    size={32}
                    onPress={() => this.props.sendEstimate()}
                  />
                </View>
                }
           </View>
        }
            </View>
      : <View>
        <ScrollView>
          <Text
            style={{
              borderWidth: 2,
              borderRadius: 8,
              padding: 5,
              margin: 6,
            }}
          >{this.props.price.description}</Text>
          {this.props.price.option1.description ?
            <Text
              style={{
                borderWidth: 2,
                borderRadius: 8,
                padding: 5,
                margin: 6,
              }}
            > {this.props.price.option1.description}</Text> : null}
            
            {this.props.price.option2.description ?
            <Text
              style={{
                borderWidth: 2,
                borderRadius: 8,
                padding: 5,
                margin: 6,
              }}
            > {this.props.price.option2.description}</Text> : null}


            {this.props.price.option3.description ?
            <Text
              style={{
                borderWidth: 2,
                borderRadius: 8,
                padding: 5,
                margin: 6,
              }}
            > {this.props.price.option3.description}</Text> : null}

    {this.props.price.option4.description ?
            <Text
              style={{
                borderWidth: 2,
                borderRadius: 8,
                padding: 5,
                margin: 6,
              }}
            > {this.props.price.option4.description}</Text> : null}

            {this.props.price.option5.description ?
            <Text
              style={{
                borderWidth: 2,
                borderRadius: 8,
                padding: 5,
                margin: 6,
              }}
            > {this.props.price.option5.description}</Text> : null}
            
        </ScrollView>
      </View>}
        </Col>
        <Col
          size={30}
          style={{
            flex: 1,
            width: 500,
          }}
        />
        {this.props.top ?
          <View />
      : <View>
        <ScrollView>
          <Text
            style={{
              fontSize: 32,
              borderWidth: 2,
              borderRadius: 8,
              padding: 5,
              margin: 6,
            }}
          >${this.props.price.amount}</Text>
          {this.props.price.option1.description ? <Text
            style={{
              fontSize: 32,
              borderWidth: 2,
              borderRadius: 8,
              padding: 5,
              margin: 6,
            }}
          > $ {this.props.price.option1.amount}</Text> : null}

          {this.props.price.option2.description ? <Text
            style={{
              borderWidth: 2,
              borderRadius: 8,
              padding: 5,
              margin: 6,
              fontSize: 32,

            }}
          > $ {this.props.price.option2.amount}</Text> : null}

          {this.props.price.option3.description ? <Text
            style={{
              borderWidth: 2,
              borderRadius: 8,
              padding: 5,
              margin: 6,
              fontSize: 32,
            }}
          > ${this.props.price.option3.amount}</Text> : null}
          { this.props.price.option4.description ? <Text
            style={{
              borderWidth: 2,
              borderRadius: 8,
              padding: 5,
              margin: 6,
              fontSize: 32,

            }}
          > ${this.props.price.option4.amount}</Text> : null}
          {this.props.price.option5.description ? <Text
            style={{
              borderWidth: 2,
              borderRadius: 8,
              padding: 5,
              margin: 6,
              fontSize: 32,

            }}
          > ${this.props.price.option5.amount}</Text>
       : null}
        </ScrollView>
      </View>}
          </Row>
          <Row size={10} >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}
            >
              <Icon
               size={32}
                name={'expand-more'}
                onPress={this.props.onPress}
              />
            </View>
          </Row>
        </Grid>
      </View>);
  }
 }
const mapUiStateToProps = state => ({
  ui: state.ui,
});

const mapGenericStateToProps = state => ({
  generics: state.generics,
});

const InfoCard = compose(
connect(mapUiStateToProps),
connect(mapGenericStateToProps),
)(_InfoCard);

export default InfoCard;
