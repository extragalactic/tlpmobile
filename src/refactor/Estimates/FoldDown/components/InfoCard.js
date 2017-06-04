import React from 'react';
import { Icon, Text, ListItem, List } from 'react-native-elements';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-spinkit';

import generics from '../../../Estimates/generics';
import { getEmailStatus } from '../../../../graphql/queries';
import EstimatePreviewModal from '../../../../components/Modals/estimatePreviewModal';

import {
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  SegmentedControlIOS,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginBottom: 3,
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
    this.state = { estimateSelect: '', estimateUrl: '', estimatePreviewModal: false };
  }

  renderStatus = () => {
    if(this.props.data.getStatus){
    if(this.props.data.getStatus.clicks) {
       return(
        <View><Text h4  style={{
          alignSelf: 'center'
        }} >Estimate has been opened</Text></View>
      )
    }
    if(this.props.data.getStatus.views) {
      return(
        <View><Text>Email has been viewed</Text></View>
      )
    }
      if(this.props.data.getStatus.delivery){
      return(
        <View><Text>Email has been delivered</Text></View>
      )
    }

    return (
           <View><Text>No Estimate has been sent</Text></View>
   )
  }
    }

  render() {
  //    console.log('email status', this)
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
                  <Grid>
      <Row style={{
          //  backgroundColor: 'blue'
          }} size={40}>
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
          </Row>

                <Row style={{
            //backgroundColor: 'green'
          }} size={50}>
      <View
        style={{
          flex: 1, 
          flexDirection: 'column',
        }}
      >
  <Row
    size={8}
    style={{
     // backgroundColor: 'green'
    }}
  >
  <View
    style={{
      flex: 1,
      alignItems: 'center',
    //  justifyContent: 'center'
    }}
  >
 <SegmentedControlIOS
                  style={{
                    marginHorizontal: 2,
                    width: 400,
                  }}
                  values={['Preview', 'Sent']}
                  onValueChange={estimateSelect => this.setState({ estimateSelect })}
                />

                <ScrollView
                  style={{
                    flex: 1,
                    marginBottom: 20,
                    width: 320,
                  }}
                >
                 
                        {this.state.estimateSelect === 'Preview' && this.props.customer.previewHistory.length > 0 ?
                          this.props.customer.previewHistory.map(preview => (
                            <ListItem
                              title={preview.timestamp}
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
                    title={preview.timestamp}
                    onPress={() => this.setState({
                      estimateUrl: preview.url,
                      estimatePreviewModal: true,
                    })}
                  />
                ))
                : null}

                    </ScrollView>
  </View>
  
  </Row>
   <Row
    size={3}
  
  >
  <View
  style={{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }}
  >
  {this.renderStatus()}

  </View>
  
  </Row>
          
           </View>
          </Row>
                  </Grid>
                  
                  
                
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
        
          <Row size={15} >
           <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}
            >
          
              <Icon
                style={{

                 // bottom: this.props.top && !this.props.second ? 16 : 5,
                }}
                size={32}
                name={'expand-more'}
                onPress={this.props.onPress}
              />
            </View>
          </Row>
        </Grid>
           <EstimatePreviewModal
          url={this.state.estimateUrl}
          open={this.state.estimatePreviewModal}
          close={() => this.setState({ estimatePreviewModal: false })}
          customer={this.props.customer}
        />
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
  graphql(getEmailStatus, {
    options: ({ customer }) => ({ variables: { custid: customer.id } }),
  }),
)(_InfoCard);

export default InfoCard;
