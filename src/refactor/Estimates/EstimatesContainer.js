import React from 'react';
import { View, Image, Dimensions, ScrollView, AlertIOS, TouchableHighlight } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Text, Card } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { generatePDF } from '../../graphql/mutations';
import { getFinishedSurvey } from '../../graphql/queries';
import { MasterStyleSheet } from '../../style/MainStyles';
import ZoomViewModal from '../../components/photoGallery/zoomViewModal';
import EstimatePreviewModal from '../../components/Modals/estimatePreviewModal';
import PriceList from './FoldDown/PriceList';

const window = Dimensions.get('window');
const { width, height } = Dimensions.get('window');

class _EstimatesContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      pricingModal: false,
      galleryModal: false,
      customModal: false,
      estimatePreviewModal: false,
      priceText: false,
      customText: '',
      zoomModal: false,
      currentSelection: '',
      loadingButton: false,
      estimateSelect: '',
      estimateUrl: '',
      size: { width, height },

    };
  }
  previewEstimate = () => {
    if (this.props.data.customer.prices.length === 0) {
      AlertIOS.alert('No Prices!');
    } else {
      this.props.toggleEstimateSpinner();
      this.props.generatePDF({
        variables: {
          custid: this.props.currentCustomer,
          generics: this.props.generics,
          text: this.props.customText,
          preview: true,
          user: this.props.profile,
        },
      })
    .then((confirm) => {
      if (confirm.data.generatePDFEstimate) {
        this.props.toggleEstimateSpinner();
        this.setState({
          loadingButton: false,
          estimateUrl: confirm.data.generatePDFEstimate.pdfUrl,
        });
        AlertIOS.alert(
        'Estimate Created',
        'What do you want to do?',
          [
          { text: 'View', onPress: () => this.setState({ estimatePreviewModal: true }) },
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          ],
      );
      }
    });
    }
  };

  sendEstimate = () => {
    if (this.props.data.customer.estimateHistory.length > 1) {
      AlertIOS.alert(
      'ESTIMATE ALREADY SENT!',
       'An estimate has beem sent to this customer, Do you really want to send again?',
        [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'Send to Customer',
            onPress: () => this.props.generatePDF({
              variables: {
                custid: this.props.currentCustomer,
                generics: this.props.generics,
                text: this.props.customText,
                preview: false,
                user: this.props.profile,
              },
            }).then((res) => {
             // console.log(res)
            }),
          },
        ],
    );
    } else {
      AlertIOS.alert(
      'Are you sure?',
       'Estimate will be sent to customer',
        [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'Send to Customer',
            onPress: () => this.props.generatePDF({
              variables: {
                custid: this.props.currentCustomer,
                generics: this.props.generics,
                text: this.props.customText,
                preview: false,
                user: this.props.profile,
              },
            }).then((res) => {
             // console.log(res)
            }),
          },
        ],
    );
    }
  }

  selectImage = (image) => {
    this.setState({
      currentSelection: image,
      zoomModal: true,
    });
  }

  selectPhoto = (index) => {
    this.props.selectSurveyPhotos({
      variables: {
        custid: this.props.currentCustomer,
        index,
      },
    });
  };

  updateCustomInput = (customText) => {
    this.setState({ customText, custom: true });
  };
  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  }


  render() {
    if (!this.props.data.getFinishedSurveyQuery) {
      return (
        <Text> No Survey </Text>
      );
    }
    return (
      <View>
        <Grid>
          <Col
            size={53}
            style={MasterStyleSheet.EstimateModalColLeft}
          >
            <Row
              size={75}
            >
              <Swiper
                showsButtons
                style={MasterStyleSheet.EstimateMainSwipe}
                width={window.width / 2}
              >
                { this.props.data.getFinishedSurveyQuery.map((survey, idx) => (
                  <View
                    key={idx}
                  >
                    <Card
                      title={survey.heading}
                      containerStyle={{
                        borderRadius: 15,
                        height: window.height / 1.15,
                        width: window.width / 2.060,
                      }}
                    >
                      <Swiper
                        width={window.width / 2}
                        height={window.height / 2}
                      >
                        {survey.photos.map((photo, idx) => (
                          <View
                            key={idx}
                            style={MasterStyleSheet.surveyResultInsideView}
                          >
                            <TouchableHighlight
                              onPress={() => this.selectImage(photo.url)}
                            >
                              <Image
                                style={MasterStyleSheet.surveyResultPhotos}
                                source={{ uri: photo.url }}
                              />
                            </TouchableHighlight>
                          </View>
          ))}
                      </Swiper>
                      <Card
                        containerStyle={{
                          backgroundColor: '#FFFFA5',
                          width: window.width / 2.2,
                          height: window.height / 3.7,
                          borderRadius: 15,
                        }}
                      >
                        <ScrollView
                          contentContainerStyle={MasterStyleSheet.surveyResultsNotesView}
                        >
                          { survey.notes.map((note, idx) => (
                            <View key={idx}>
                              <Text h3> {note.description}</Text>
                              <Text h4> {note.text}</Text>
                            </View>
                ))}
                        </ScrollView>
                      </Card>
                    </Card>

                  </View>
        ))}
              </Swiper>
            </Row>

            <Row
              size={16}
            />
          </Col>
          <Col
            size={55}
            style={MasterStyleSheet.EstimateModalColRight}
          >
            <View
              style={MasterStyleSheet.EstimatePreviewCard}
            >
              <Grid>
                <PriceList
                  sendEstimate={this. sendEstimate}
                  createPDFPreview={this.previewEstimate}
                  id={this.props.id}
                  customer={this.props.data.customer}
                  prices={this.props.data.customer.prices}
                />
              </Grid>
            </View>
          </Col>
        </Grid>
        <EstimatePreviewModal
          url={this.state.estimateUrl}
          open={this.state.estimatePreviewModal}
          close={() => this.setState({ estimatePreviewModal: false })}
          customer={this.props.data.customer}
        />
        <ZoomViewModal
          open={this.state.zoomModal}
          close={() => { this.setState({ zoomModal: false }); }}
          photo={this.state.currentSelection}
        />
      </View>
    );
  }
}
const mapGenericStateToProps = state => ({
  generics: state.generics,
});

const mapCustomStateToProps = state => ({
  customText: state.customText,
});

const mapStateToProps = state => ({
  currentCustomer: state.currentCustomer,
});

const mapProfileStateToProps = state => ({
  profile: state.profile,
});
const mapUIStateToProps = state => ({
  ui: state.ui,
});

const mapActionToggleEstimateSpinner = dispatch => ({
  toggleEstimateSpinner() {
    dispatch({ type: 'TOGGLE_ESTIMATE_SPINNER' });
  },
});

const EstimatesContainer = compose(
    graphql(generatePDF, { name: 'generatePDF' }),
    connect(mapUIStateToProps, mapActionToggleEstimateSpinner),
    connect(mapStateToProps, null),
    connect(mapGenericStateToProps),
    connect(mapCustomStateToProps),
    connect(mapProfileStateToProps, null),
    graphql(getFinishedSurvey, {
      options: ({ id }) => ({ variables: { id }, pollInterval: 2000 }),
    }),
)(_EstimatesContainer);

export default EstimatesContainer;
