import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const { height, width } = Dimensions.get('window');
export const TOGGLE_ESTIMATE_SPINNER = 'TOGGLE_ESTIMATE_SPINNER';

export const TOGGLE_CONTACT_MODAL = 'TOGGLE_CONTACT_MODAL';


export const uiReducer = (state = {
  estimateSpinner: false,
  iPadContactModal: false,
  model: DeviceInfo.getModel(),
  isTablet: DeviceInfo.isTablet(),
  isEmulator: DeviceInfo.isEmulator(),
  height,
  width,
}, action) => {
  switch (action.type) {
    case TOGGLE_ESTIMATE_SPINNER:
      return Object.assign({}, state, {
        estimateSpinner: !state.estimateSpinner,
      });
    case TOGGLE_CONTACT_MODAL:
      console.log('redicer');

      return Object.assign({}, state, {
        iPadContactModal: !state.iPadContactModal,
      });

    default:
      return state;
  }
};
