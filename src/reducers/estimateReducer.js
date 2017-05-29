export const SAVE_CUSTOM_TEXT = 'SAVE_CUSTOM_TEXT';

export const estimateReducer = (state = '', action) => {
  switch (action.type) {
    case SAVE_CUSTOM_TEXT:
      return action.payload;
    default:
      return state;
  }
};
