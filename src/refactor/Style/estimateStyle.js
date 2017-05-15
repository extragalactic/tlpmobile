import { StyleSheet, Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const window = Dimensions.get('window');

const estimateStyles = StyleSheet.create({
  estimateAddPriceView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  estimateAddPriceButton: {
    width: window.width / 12,
    margin: 2,
  },
  estimatePreviousButton: {
    width: window.width / 6,
    margin: 8,
  },
  priceInputView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceDescription: {
    padding: 5,
    margin: 20,
    alignSelf: 'center',
    fontSize: 16,
    width: DeviceInfo.isTablet() ? window.width / 3 : window.width - 150,
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 50,
    marginTop: 10,
    color: 'blue',
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    backgroundColor: '#eee9e9',
  },
  pricePrice: {
    alignSelf: 'center',
    padding: 5,
    height: 50,
    fontSize: 38,
    width: DeviceInfo.isTablet() ? window.width / 4 : window.width - 150,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 50,
    marginBottom: 20,
    backgroundColor: '#eee9e9',

  },
  surveyResultPhotosView: {
    flex: 1,
    marginTop: 100,
    marginLeft: 30,
    backgroundColor: '#CFCFC4',
    alignItems: 'center',
  },
  priceCard: {
    width: DeviceInfo.isTablet() ? window.width / 2.5 : window.width /1.2 ,
    alignSelf: 'center',
    borderRadius: 30,
    borderWidth: 6,
    padding: 2,
    backgroundColor: '#779ECB',


  },
  savedPriceCard: {
    width: DeviceInfo.isTablet() ? window.width / 2.5 : window.width /1.2 ,
    alignSelf: 'center',
    borderRadius: 30,
    backgroundColor: '#CFCFC4',
    borderWidth: 6,


  },
  estimateButton: {
    borderRadius: 15,
    borderWidth: 6,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 50,
    backgroundColor: '#779ECB',
    width: DeviceInfo.isTablet() ? window.width / 5 : window.width -20,
    marginBottom: 20,
    bottom: 30,

  },
  inputStyle: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Cochin',
    height: 60,
  },
  scrollView: {
    height: window.height - 120,
  },
  closeIcon: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalDropDown: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  dropDown: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: DeviceInfo.isTablet() ? window.width / 4 : window.width - 120,
    height: 200,
  },

});

export { estimateStyles };
