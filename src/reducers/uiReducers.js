export const TOGGLE_ESTIMATE_SPINNER = 'TOGGLE_ESTIMATE_SPINNER';
export const uiReducer = (state = {
  estimateSpinner: false,
}, action) => {
  switch (action.type) {
    case TOGGLE_ESTIMATE_SPINNER:
      return Object.assign({}, state, {
        estimateSpinner: !state.estimateSpinner,
      });
    default:
      return state;
  }
};
