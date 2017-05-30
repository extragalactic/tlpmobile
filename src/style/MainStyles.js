import { StyleSheet, Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const window = Dimensions.get('window');

const MasterStyleSheet = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',

  },
  modalTouch: {
    backgroundColor: '#635DB7',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  cardStyle: {
    backgroundColor: '#CFCFC4',
    width: DeviceInfo.isTablet() ? window.width / 2.2 : window.width - 55,

  },
  ipadViewLeft: {
    marginTop: 45,
    height: window.height - 50,
  },
  ipadViewRight: {
    marginTop: 5,
    height: window.height - 10,
  },
  iphoneViewTop: {
    marginTop: 60,
    backgroundColor: '#635DB7',
    height: window.height / 1.75,

  },
  iphoneViewBottom: {
    backgroundColor: '#00CE9F',
  },
  iphoneViewBottomList: {
    right: 100,
  },
  mainList: {
    height: window.height - window.height + 80,
  },
  mainListView: {
    top: window.height - window.height + 45,
  },
  customersListView: {
    top: 10,
  },
  customersListContainer: {
    flex: 1,
  },
  list: {
    marginTop: 45,
  },
  iPhoneListScroll: {
    marginTop: 60,
    height: DeviceInfo.isTablet() ? window.height -60 : null
  },
  customersListItem: {
    height: 90,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 400,
    height: 400,
    marginLeft: 120,
  },
  modalIcon: {
    marginTop: 20,
    right: DeviceInfo.isTablet() ? window.width / 2.1 : window.width / 2.3,
  },
  modalView: {

  },
  modalFolloupView: {
    marginTop: 10,
  },
  modalFolloupScrollView: {
    marginTop: 10,
  },
  mainButtonStyle: {
    borderRadius: 15,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 7,
    backgroundColor: '#779ECB',
    //width: DeviceInfo.isTablet() ? window.width / 5 : window.width / 1.3,


  },
  homeButtonStyle: {
    borderRadius: 15,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 7,
    backgroundColor: '#779ECB',
    width: DeviceInfo.isTablet() ? window.width / 5 : window.width / 2,
  },

  estimateButtonStyle: {
    borderRadius: 15,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 7,
    backgroundColor: '#7789cb',
    width: DeviceInfo.isTablet() ? window.width / 5 : window.width / 2,
  },
  estimateCompleteButtonStyle: {
    borderRadius: 15,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 7,
    backgroundColor: '#89CB77',
    width: DeviceInfo.isTablet() ? window.width / 5 : window.width / 2,
  },
  readyPricingButtonStyle: {
    borderRadius: 15,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 7,
    backgroundColor:'#cb7789',
    width: DeviceInfo.isTablet() ? window.width / 5 : window.width / 2,
  },
  newEstimatesButtonStyle: {
    borderRadius: 15,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 7,
    backgroundColor: '#ffb347',
    width: DeviceInfo.isTablet() ? window.width / 5 : window.width / 2,
  },
  searchButtonStyle: {
    borderRadius: 15,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 7,
    backgroundColor: '#7098a3',
    width: DeviceInfo.isTablet() ? window.width / 5 : window.width / 2,
  },
  pricingCardView: {
    width: 260,
    borderColor: 'gray',
    borderWidth: 1,

  },
  customerCardMap: {
    backgroundColor: '#CFCFC4',
    height: 210,
    width: DeviceInfo.isTablet() ? window.width / 2.3 : window.width / 1.3,
  },
  constacCustomerContainerOne: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  constacCustomerContainerTwo: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surveyItemContainer: {
    height: DeviceInfo.isTablet() ? 660 : 300,
    width: window.width - 20,
    margin: 20,
    
  },
  surveyMainPicker: {
    top: 50,
    marginTop: 20,
  },
  surveyResultsTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  surveyDetailsList: {
    flex: 1
    
  },
  surveyMainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  surveyMainContainer: {
    top: 25,
    position: 'absolute',
    flexDirection: 'row',
    marginLeft: window.width - window.width + 60,

  },
  surveyMainButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 80,
    right: DeviceInfo.isTablet() ? 0 : 175,
    left: DeviceInfo.isTablet() ? 10 : null,
  },
  surveyCardTextInput: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 250,
    borderColor: 'gray',
    borderWidth: 2,
  },
  surveyCardPhoto: {
    flex: 1,
  },
  surveyCardPicker: {
    bottom: -10,
  },
  surveyCardPickerItem: {
    fontSize: 15,
  },
  surveyNotesInputContainer: {
    width: 300,

  },
  surveyNotesModal: {
    alignItems: 'center',
    justifyContent: 'center',
    height: DeviceInfo.isTablet() ? window.height / 3 : window.height / 3,
    marginTop: 80,
    width: DeviceInfo.isTablet() ? window.width / 1.6 : window.width - 20,
    borderRadius: 30,
    backgroundColor: '#CFCFC2',
  },
  surveyNotesCard: {
    flex: 1,
    borderRadius: 30,
    width: DeviceInfo.isTablet() ? window.width / 1.7 : window.width - 20,
    backgroundColor: '#779ECB',
    padding: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
  surveyNotesInputText: {
    height: 90,
    width: DeviceInfo.isTablet() ? 600 : 300,
    borderColor: 'gray',
    borderWidth: 2,
    margin: 8,
    alignItems: 'center',
    padding: 4,
    backgroundColor: 'white',

  },
  surveyPhotoCard: {
    marginTop: 0,
    height: DeviceInfo.isTablet() ? window.height / 1.8 : window.height / 1.56,
    top: DeviceInfo.isTablet() ? -15 : 0,

  },
  surveyNotesModalCard: {
    backgroundColor: '#FFFF66',
    alignItems: 'center',
    marginTop: 20,
    height: DeviceInfo.isTablet() ? window.height / 3.25 : window.height / 1.56,
    width: DeviceInfo.isTablet() ? window.width / 2 : window.width - 20,
  },
  surveyPhotoModalCard: {
    backgroundColor: '#FFFF66',
    alignItems: 'center',
    marginTop: 30,
    height: DeviceInfo.isTablet() ? window.height / 3.25 : window.height / 0.9,
    width: DeviceInfo.isTablet() ? window.width / 2 : window.width - 20,
  },

  surveyPhotoModal: {
    alignItems: 'center',
    height: DeviceInfo.isTablet() ? window.height / 3.25 : window.height / 1.56,
    top: 50,
    width: DeviceInfo.isTablet() ? window.width / 2 : window.width - 20,
  },
  surveyResultPhotosView: {
    flex: 1,
    alignItems: 'center',
    marginRight: 1,
   // marginBottom: 100,
  },
  surveyResultsButton: {
    flex: 1,
   
    alignSelf: 'center',
   // bottom: 56,
    width: window.width,
    right: 15,
    margin: 1,
  },
  surveyResultPricingView: {
    flex: 1,
    margin: 20,
    height: DeviceInfo.isTablet() ? window.height / 3 : window.height / 6,
  },
  surveyResultInsideView: {
  },
  surveyResultsText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  surveyResultPhotos: {
    width: window.width / 2.15,
    height: DeviceInfo.isTablet() ? window.height / 2 : window.height / 3.5,
  },
 surveyResultPhotosSurvey: {
    width: window.width / 1.2,
    height: DeviceInfo.isTablet() ? window.height / 2 : window.height / 3.5,
  },
  surveyResultsNotes: {
    width: DeviceInfo.isTablet() ? window.width / 3 : window.width / 1.1,
    height: DeviceInfo.isTablet() ? window.height / 3 : window.height / 4,
  },
  surveyResultsNotesView: {
  //  marginTop: 40,
   // backgroundColor: '#FFFACD',
  //  height: window.height / 3.4,


  },
  CustomerCardNotesButton: {
    padding: 10,
    margin: 4,
  },
  checkBox: {
    backgroundColor: '#8c92ac',
  },
  customText: {
    backgroundColor: '#8c92ac',
    width: window.width / 2.85,
    alignItems: 'center',
    marginLeft: 10,
  },
  EstimatePriceModal: {
    alignItems: 'center',
    height: DeviceInfo.isTablet() ? window.height / 3 : window.height / 1.60,
    width: window.width / 2,

  },
  PricingCard: {
    position: 'absolute',
    width: window.width / 2.1,
    alignSelf: 'center',
    borderRadius: 15,

  },
  AutoComplete: {},

  EstimateModalColLeft: {
    height: window.height,
    backgroundColor: '#CFCFC4',


  },
  EstimateModalColRight: {
    height: window.height,
    backgroundColor: '#CFCFC4',
    marginBottom: 200,
  },
  EstimatePreviewCard: {
    backgroundColor: '#e7e8ee',
    borderRadius: 15,
    flex: 1,
    marginTop: 70,
    marginHorizontal: 20,
    marginBottom: 20,
    height: DeviceInfo.isTablet() ? null : 100,
  },
  addEstimateButton: {
    width: window.width / 7,
    backgroundColor: '#8c92ac',
  },

  addEstimateButtonRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

  },
  EstimateMainSwipe: {
    marginBottom: 119,
  },
  EstimateGenerics: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 30,
    height: DeviceInfo.isTablet() ? window.height / 1.3 : window.height / 2.4,
  },
  photoCardPreview: {
    flex: 1,
    width: DeviceInfo.isTablet() ? window.width / 3 : window.width / 1.4,
    height: DeviceInfo.isTablet() ? window.height / 3 : window.height / 2,
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: 'grey',
    marginTop: 10,
    borderRadius: 20,
   },
});

export { MasterStyleSheet };
