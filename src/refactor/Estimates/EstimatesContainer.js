import React from 'react';
import { View, Image, Dimensions, ScrollView, AlertIOS, TouchableHighlight, TextInput, SegmentedControlIOS } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Text, Card, Button, CheckBox, ListItem, List, Icon, SwipeDeck } from 'react-native-elements';
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
      size: { width, height },

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
              size={80}
            >
              <View
                style={estimateStyles.surveyResultPhotosView}
              />
            </Row>

            <Row
              style={{
                // backgroundColor: 'blue'
              }}
              size={20}
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
                  id={this.props.id}
                  customer={this.props.data.customer}
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
