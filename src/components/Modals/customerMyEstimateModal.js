import React from 'react';
import { Modal, View, Image, Dimensions, ScrollView, AlertIOS, TouchableHighlight } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { Icon, Text, Card, Button, CheckBox, ListItem } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { graphql, compose } from 'react-apollo';
import Swipeout from 'react-native-swipeout';

import { generatePDF } from '../../graphql/mutations';

import { MasterStyleSheet } from '../../style/MainStyles';
import ZoomViewModal from '../photoGallery/zoomViewModal';

import EstimatePriceModal from './estimatePriceModal';
import PhotoGalleryEstimates from '../photoGallery/photoGalleryEstimates';
import CustomGenericsModal from './customGenericsModal';
import EstimatePreviewModal from './estimatePreviewModal';
import generics from '../Estimates/generics';

const window = Dimensions.get('window');

class _MyEstimateModal extends React.Component {
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
      refacingSlice: false,
      refacingComplete: false,
      coping: false,
      flagstone: false,
      flashing: false,
      fwarranty: false,
      obc: false,
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

    };
  }

  previewEstimate = (generic) => {
    const gen = {
      watertest: this.state.watertest,
      concreteSteps: this.state.concreteSteps,
      concreteCare: this.state.concreteCare,
      refacingSlice: this.state.refacingSlice,
      refacingComplete: this.state.refacingComplete,
      coping: this.state.coping,
      flagstone: this.state.flagstone,
      flashing: this.state.flashing,
      fwarranty: this.state.fwarranty,
      obc: this.state.obc,
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
        custid: this.props.customer.id,
        generics: gen,
        text: this.state.customText,
        preview: true,
      },
    })
    .then((confirm) => {
      if (confirm.data.generatePDFEstimate) {
        this.setState({
          estimatePreviewModal: true,
        });
      }
    });
  };

  sendEstimate = () => {
    const gen = {
      watertest: this.state.watertest,
      concreteSteps: this.state.concreteSteps,
      concreteCare: this.state.concreteCare,
      refacingSlice: this.state.refacingSlice,
      refacingComplete: this.state.refacingComplete,
      coping: this.state.coping,
      flagstone: this.state.flagstone,
      flashing: this.state.flashing,
      fwarranty: this.state.fwarranty,
      obc: this.state.obc,
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
              custid: this.props.customer.id,
              generics: gen,
              text: this.state.customText,
              preview: false,
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
        custid: this.props.customer.id,
        index,
      },
    });
  };

  updateCustomInput = (customText) => {
    this.setState({ customText, custom: true });
  };

  render() {
    if (!this.props.finishedSurvey) {
      return (
        <Text> No Survey </Text>
      );
    }
    return (
      <View
        style={MasterStyleSheet.modalView}

      >
        <Modal
          animationType={'slide'}
          visible={this.props.modal}
        >
          <Icon
            name={'chevron-left'}
            iconStyle={MasterStyleSheet.modalIcon}
            onPress={this.props.close}
            size={38}
            color={'blue'}
          />
          <Grid>
            <Col
              size={50}
              style={MasterStyleSheet.EstimateModalColLeft}
            >
              <View
                style={MasterStyleSheet.surveyResultPhotosView}
              >
                <Swiper
                  showsButtons
                  style={MasterStyleSheet.EstimateMainSwipe}
                  width={window.width / 2}
                >
                  { this.props.finishedSurvey.map((survey, idx) => (
                    <View
                      key={idx}
                    >
                      <Text
                        h3
                      >{survey.heading}</Text>
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
                      <ScrollView
                        contentContainerStyle={MasterStyleSheet.surveyResultsNotesView}
                      >
                        { survey.notes.map((note, idx) => (
                          <View key={idx}>
                            <Text h4> {note.description}</Text>
                            <Text h5> {note.text}</Text>
                          </View>
                ))}
                      </ScrollView>
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
                style={MasterStyleSheet.surveyResultPricingView}
              >
                <Card
                  title={'3LP Estimate'}
                  containerStyle={MasterStyleSheet.EstimatePreviewCard}
                >
                  <ScrollView>
                    { this.props.estimate.prices ? this.props.estimate.prices.map((price, idx) => (
                      <Swipeout
                        right={[{
                          text: 'Delete',
                          onPress: () => this.props.deletePrice(idx),
                          backgroundColor: 'red',
                        }]}
                        autoClose
                      >
                        <ListItem
                          title={price.description}
                          badge={{ value: `$${price.price}.00`, badgeTextStyle: { color: 'white' }, badgeContainerStyle: { marginTop: -1 } }}
                        />
                      </Swipeout>
                )) : null }
                  </ScrollView>
                  <View
                    style={MasterStyleSheet.EstimateGenerics}
                  >
                    <ScrollView>
                      { generics.map(generic => (
                        <CheckBox
                          title={generic.des}
                          onPress={() => this.setState({ [generic.prop]: !this.state[generic.prop] })}
                          checked={this.state[generic.prop]}
                          containerStyle={MasterStyleSheet.checkBox}
                        />
                     ))}
                      <ListItem
                        raised
                        containerStyle={MasterStyleSheet.customText}
                        title="Custom Text"
                        onPress={() => this.setState({ customModal: true })}
                      />
                    </ScrollView>
                    <View
                      style={MasterStyleSheet.addEstimateButtonRow1}
                    >
                      <Button
                        raised
                        buttonStyle={MasterStyleSheet.addEstimateButton}
                        title="Price"
                        onPress={() => this.setState({ pricingModal: true })}
                      />
                      <Button
                        raised
                        buttonStyle={MasterStyleSheet.addEstimateButton}
                        onPress={() => this.setState({ galleryModal: true })}
                        title="Photos"
                      />
                    </View>
                    <View
                      style={MasterStyleSheet.addEstimateButtonRow1}
                    >
                      <Button
                        raised
                        buttonStyle={MasterStyleSheet.addEstimateButton}
                        title="Preview"
                        onPress={() => this.previewEstimate(this.state)}
                      />
                      <Button
                        raised
                        buttonStyle={MasterStyleSheet.addEstimateButton}
                        title="Send"
                        onPress={this.sendEstimate}
                      />
                    </View>
                  </View>
                </Card>
              </View>
            </Col>
          </Grid>
          <PhotoGalleryEstimates
            user={this.props.user}
            customer={this.props.customer}
            open={this.state.galleryModal}
            close={() => this.setState({ galleryModal: false })}
            photos={this.props.customer.survey.photos}
            selectPhoto={this.selectPhoto}
          />
          <EstimatePriceModal
            addPrice={this.props.addPrice}
            customer={this.props.customer}
            estimate={this.props.estimate}
            open={this.state.pricingModal}
            close={() => this.setState({ pricingModal: false })}
          />
          <CustomGenericsModal
            open={this.state.customModal}
            close={() => this.setState({ customModal: false })}
            updateCustomInput={this.updateCustomInput}
            value={this.state.customText}
          />
          <EstimatePreviewModal
            open={this.state.estimatePreviewModal}
            close={() => this.setState({ estimatePreviewModal: false })}
            customer={this.props.customer}
          />
          <ZoomViewModal
            open={this.state.zoomModal}
            close={() => { this.setState({ zoomModal: false }); }}
            photo={this.state.currentSelection}
          />
        </Modal>
      </View>
    );
  }
}

const MyEstimateModal = compose(
    graphql(generatePDF, { name: 'generatePDF' }),
)(_MyEstimateModal);

export default MyEstimateModal;

