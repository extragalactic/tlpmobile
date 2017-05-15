import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

const surveyStyles = StyleSheet.create({
  standardView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customersListItem: {
    height: 90,
    bottom: 10,
    backgroundColor: '#FFFFFF',
  },
  actionButtonGroup: {
    flex: 1,
    top: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  surveyPicker: {
    flex: 1,
    width: window.width - 10,
  },
});

export default surveyStyles;
