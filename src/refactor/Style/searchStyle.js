import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

const searchStyles = StyleSheet.create({
  standardView: {
    flex: 1,
    marginTop: 60,
    justifyContent: 'flex-start',
  },
  customersListItem: {
    height: 90,
    bottom: 10,
    backgroundColor: '#FFFFFF',
  },
});

export default searchStyles;
