export const SAVE_SURVEY_SELECTION = 'SAVE_SURVEY_SELECTION';
export const SAVE_SURVEY_SELECTION_COMPLETE = 'SAVE_SURVEY_SELECTION_COMPLETE';

export const surveyReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_SURVEY_SELECTION:
      return action.payload;
    default:
      return state;
  }
};
