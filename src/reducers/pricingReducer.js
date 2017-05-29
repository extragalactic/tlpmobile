export const SAVE_PRICE_DESCRIPTION = 'SAVE_PRICE_DESCRIPTION';
export const SAVE_PRICE_DESCRIPTION_COMPLETE = 'SAVE_PRICE_DESCRIPTION_COMPLETE';

export const priceDescriptionReducer = (state = '', action) => {
  switch (action.type) {
    case SAVE_PRICE_DESCRIPTION:
      return action.payload;
    default:
      return state;
  }
};


export const SAVE_PRICE_AMOUNT = 'SAVE_PRICE_AMOUNT';
export const SAVE_PRICE_AMOUNT_COMPLETE = 'SAVE_PRICE_AMOUNT_COMPLETE';

export const priceAmountReducer = (state = '', action) => {
  switch (action.type) {
    case SAVE_PRICE_AMOUNT:
      return action.payload;
    default:
      return state;
  }
};

export const SAVE_PRICE_PICKER = 'SAVE_PRICE_PICKER';
export const SAVE_PRICE_PICKER_COMPLETE = 'SAVE_PRICE_PICKER_COMPLETE';

export const pricePickerReducer = (state = '', action) => {
  switch (action.type) {
    case SAVE_PRICE_PICKER:
      return action.payload;
    default:
      return state;
  }
};

const initialState = {
        description0: '',
        description1: '',
        description2: '',
        description3: '',
        description4: '',
        description5: '',
        amount0: '',
        amount1: '',
        amount2: '',
        amount3: '',
        amount4: '',
        amount5: '',
};

export const SAVE_PRICE_DETAILS = 'SAVE_PRICE_DETAILS';
export const DELETE_PRICE = 'DELETE_PRICE';
export const SAVE_PRICE_DETAILS_COMPLETE = 'SAVE_PRICE_DETAILS_COMPLETE';

export const priceDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PRICE_DETAILS:
      if (state.amount0 && state.amount1 && state.amount2 && state.amount3 && state.amount4) {
        return Object.assign({}, state, {
          amount5: action.payload.amount,
          description5: action.payload.description,
        });

     } else if (state.amount0 && state.amount1 && state.amount2 && state.amount3) {
        return Object.assign({}, state, {
          amount4: action.payload.amount,
          description4: action.payload.description,
        });
     } else if (state.amount0 && state.amount1 && state.amount2 ) {
      return Object.assign({}, state, {
          amount3: action.payload.amount,
          description3: action.payload.description,
        });
     }  else if (state.amount0 && state.amount1 ) {
     return Object.assign({}, state, {
          amount2: action.payload.amount,
          description2: action.payload.description,
        });
    
     } else if (state.amount0 ) {
         return Object.assign({}, state, {
          amount1: action.payload.amount,
          description1: action.payload.description,
        });
     } 
      return Object.assign({}, state, {
          amount0: action.payload.amount,
          description0: action.payload.description,
        });
     case DELETE_PRICE: 
   return Object.assign({}, state, {
     [`amount${action.payload}`]: '',
     [`description${action.payload}`]: ''
   })
    default:
      return state;
  }
};

