export const EDIT_PRICE = 'EDIT_PRICE';

export const editPriceReducer = (state = {
  description: '',
  amount: '',
  option: '0',
}, action) => {
  switch (action.type) {
    case EDIT_PRICE:
      if (action.payload.description && action.payload.amount) {
        return Object.assign({}, state, {
          amount: action.payload.amount,
          description: action.payload.description,
        });
      }
      if (action.payload.description) {
        return Object.assign({}, state, {
          description: action.payload.description,
        });
      }
      return Object.assign({}, state, {
        amount: action.payload.amount,
      });
    default:
      return state;
  }
};
