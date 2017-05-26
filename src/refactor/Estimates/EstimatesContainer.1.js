import React from 'react';
import { View, Image, Dimensions, ScrollView, AlertIOS, TouchableHighlight, TextInput, SegmentedControlIOS } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Text, Card, Button, CheckBox, ListItem, List, Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { graphql, compose } from 'react-apollo';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { generatePDF } from '../../graphql/mutations';
import { getFinishedSurvey } from '../../graphql/queries';
import { MasterStyleSheet } from '../../style/MainStyles';
import ZoomViewModal from '../../components/photoGallery/zoomViewModal';
import EstimatePreviewModal from '../../components/Modals/estimatePreviewModal';
import generics from './generics';
import { estimateStyles } from '../Style/estimateStyle';

const window = Dimensions.get('window');

class _EstimatesContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      pricingModal: false,
      galleryModal: false,
      customModal: false,
      estimatePreviewModal: false,
      priceText: false,
      watertest: false,
      concreteSteps: false,
      concreteCare: false,
      refacingSlices: false,
      refacingComplete: false,
      coping: false,
      flagstone: false,
      flashing: false,
      fwarranty: false,
      obc: false,
      nbc: false,
      chimney: false,
      pargeex: false,
      pwarranty: false,
      retaining: false,
      roof: false,
      sills: false,
      tuckpoint: false,
      custom: false,
      waterproofing: false,
      disclaimerA: false,
      disclaimerS: false,
      tuckpointUniform: false,
      surveyInvite: false,
      surveyInviteDave: false,
      customerClean: false,
      additionalWork: false,
      warrantyAsStated: false,
      existingConcrete: false,
      customText: '',
      zoomModal: false,
      currentSelection: '',
      loadingButton: false,
      estimateSelect: '',
      estimateUrl: '',
    };
  }
  previewEstimate = () => {
    if (this.props.data.customer.prices.length === 0) {
      AlertIOS.alert('No Prices!');
    } else {
      this.setState({ loadingButton: true });
      const gen = {
        watertest: this.state.watertest,
        concreteSteps: this.state.concreteSteps,
        concreteCare: this.state.concreteCare,
        refacingSlices: this.state.refacingSlices,
        refacingComplete: this.state.refacingComplete,
        coping: this.state.coping,
        flagstone: this.state.flagstone,
        flashing: this.state.flashing,
        fwarranty: this.state.fwarranty,
        chimney: this.state.chimney,
        obc: this.state.obc,
        nbc: this.state.nbc,
        pargeex: this.state.pargeex,
        pwarranty: this.state.pwarranty,
        retaining: this.state.retaining,
        roof: this.state.roof,
        sills: this.state.sills,
        tuckpoint: this.state.tuckpoint,
        custom: this.state.custom,
        waterproofing: this.state.waterproofing,
        disclaimerA: this.state.disclaimerA,
        disclaimerS: this.state.disclaimerS,
        tuckpointUniform: this.state.tuckpointUniform,
        surveyInvite: this.state.surveyInvite,
        surveyInviteDave: this.state.surveyInviteDave,
        customerClean: this.state.customerClean,
        additionalWork: this.state.additionalWork,
        warrantyAsStated: this.state.warrantyAsStated,
        existingConcrete: this.state.existingConcrete,
      };
      this.props.generatePDF({
        variables: {
          custid: this.props.currentCustomer,
          generics: gen,
          text: this.state.customText,
          preview: true,
          user: this.props.profile,
        },
      })
    .then((confirm) => {
      if (confirm.data.generatePDFEstimate) {
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
    const gen = {
      watertest: this.state.watertest,
      concreteSteps: this.state.concreteSteps,
      concreteCare: this.state.concreteCare,
      refacingSlices: this.state.refacingSlices,
      refacingComplete: this.state.refacingComplete,
      coping: this.state.coping,
      flagstone: this.state.flagstone,
      flashing: this.state.flashing,
      fwarranty: this.state.fwarranty,
      obc: this.state.obc,
      nbc: this.state.nbc,
      chimney: this.state.chimney,
      pargeex: this.state.pargeex,
      pwarranty: this.state.pwarranty,
      retaining: this.state.retaining,
      roof: this.state.roof,
      sills: this.state.sills,
      tuckpoint: this.state.tuckpoint,
      custom: this.state.custom,
      waterproofing: this.state.waterproofing,
      disclaimerA: this.state.disclaimerA,
      disclaimerS: this.state.disclaimerS,
      tuckpointUniform: this.state.tuckpointUniform,
      surveyInvite: this.state.surveyInvite,
      surveyInviteDave: this.state.surveyInviteDave,
      customerClean: this.state.customerClean,
      additionalWork: this.state.additionalWork,
      warrantyAsStated: this.state.warrantyAsStated,
      existingConcrete: this.state.existingConcrete,
    };
    AlertIOS.alert(
      'Are you sure?',
       'Estimate will be sent to customer',
      [{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Send to Customer',
          onPress: () => this.props.generatePDF({
            variables: {
              custid: this.props.currentCustomer,
              generics: gen,
              text: this.state.customText,
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
            <View
              style={estimateStyles.surveyResultPhotosView}
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
            </View>
          </Col>
          <Col
            size={45}
            style={MasterStyleSheet.EstimateModalColRight}
          >
            <View
              style={MasterStyleSheet.EstimatePreviewCard}
            >
              <Grid>
                <Row
                  size={30}
                  style={{
                    margin: 10,
                    flex: 1,
                  }}
                />
                <SegmentedControlIOS
                  style={{
                    marginHorizontal: 20,
                  }}
                  values={['Preview', 'Sent']}
                  onValueChange={estimateSelect => this.setState({ estimateSelect })}
                />
                <Card
                  containterStyle={{
                    height: 100,
                  }}
                  title={'Estimates'}
                >
                  <View
                    style={{
                      height: 100,
                    }}
                  >
                    <ScrollView>
                      <List
                        containerStyle={{
                          marginTop: 0,
                        }}
                      >
                        {this.state.estimateSelect === 'Preview' && this.props.data.customer.previewHistory.length > 0 ?
                          this.props.data.customer.previewHistory.map(preview => (
                            <ListItem
                              title={preview.timestamp}
                              onPress={() => this.setState({
                                estimateUrl: preview.url,
                                estimatePreviewModal: true,
                              })}
                            />
                ))
                : null}
                        {this.state.estimateSelect === 'Sent' && this.props.data.customer.estimateHistory.length > 0 ?
                this.props.data.customer.estimateHistory.map(preview => (
                  <ListItem
                    title={preview.timestamp}
                    onPress={() => this.setState({
                      estimateUrl: preview.url,
                      estimatePreviewModal: true,
                    })}
                  />
                ))
                : null}

                      </List>
                    </ScrollView>
                  </View>
                </Card>
                <Row
                  size={60}
                  style={{
                    margin: 10,
                  }}
                >
                  <ScrollView>
                    { generics.map(generic => (
                      <CheckBox
                        key={generic.prop}
                        title={generic.des}
                        onPress={() => this.setState({ [generic.prop]: !this.state[generic.prop] })}
                        checked={this.state[generic.prop]}
                        containerStyle={MasterStyleSheet.checkBox}
                      />
                     ))}

                  </ScrollView>

                </Row>
                <Row
                  size={40}
                  style={{
                    margin: 10,
                  }}
                >
                  <Card
                    title={'Custom Text'}
                    containerStyle={{
                      width: window.width / 2.5,
                      marginBottom: 10,
                      margin: 10,
                      borderRadius: 20,

                    }}
                  >
                    <TextInput
                      style={{ marginBottom: 40, height: 65, borderRadius: 20, padding: 4, borderColor: 'gray', borderWidth: 1 }}
                      onChangeText={price => this.updateCustomInput(price)}
                      value={this.state.customText}
                      multiline
                    />

                  </Card>

                </Row>
                <Row
                  size={20}
                  style={{
                    margin: 10,
                    justifyContent: 'center',
                  }}
                >
                  <View
                    style={MasterStyleSheet.addEstimateButtonRow1}
                  >
                    <Icon
                      name="monetization-on"
                      color="#517fa4"
                      size={32}
                      raised
                      onPress={() => Actions.pricingContainer()}
                    />
                    <Icon
                      name="photo-library"
                      color="#517fa4"
                      raised
                      size={32}

                      onPress={() => Actions.photoGalleryContainer()}
                    />
                    <Icon
                      name="picture-as-pdf"
                      color={this.state.loadingButton ? 'green' : '#517fa4'}
                      raised
                      size={32}

                      onPress={() => this.previewEstimate(this.state)}
                    />

                    <Icon
                      name="send"
                      color="#517fa4"
                      raised
                      size={32}
                      onPress={this.sendEstimate}
                    />
                  </View>
                </Row>
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
const mapStateToProps = state => ({
  currentCustomer: state.currentCustomer,
});

const mapProfileStateToProps = state => ({
  profile: state.profile,
});


const EstimatesContainer = compose(
    graphql(generatePDF, { name: 'generatePDF' }),
    connect(mapStateToProps, null),
    connect(mapProfileStateToProps, null),
    graphql(getFinishedSurvey, {
      options: ({ id }) => ({ variables: { id }, pollInterval: 2000 }),
    }),
)(_EstimatesContainer);

export default EstimatesContainer;
