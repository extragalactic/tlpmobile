export const TOGGLE_GENERICS_SELECTION = 'TOGGLE_GENERICS_SELECTION';
export const genericsReducer = (state = {
  watertest: false,
  concreteSteps: false,
  concreteCare: false,
  refacingSlices: false,
  refacingComplete: false,
  coping: false,
  flagstone: false,
  flashing: false,
  fwarranty: false,
  obc: false,
  nbc: false,
  chimney: false,
  pargeex: false,
  pwarranty: false,
  retaining: false,
  roof: false,
  sills: false,
  tuckpoint: false,
  custom: false,
  waterproofing: false,
  disclaimerA: false,
  disclaimerS: false,
  tuckpointUniform: false,
  surveyInvite: false,
  surveyInviteDave: false,
  customerClean: false,
  additionalWork: false,
  warrantyAsStated: false,
  existingConcrete: false,
}, action) => {
  switch (action.type) {
    case TOGGLE_GENERICS_SELECTION:
      return Object.assign({}, state, {
        [action.payload]: !state[action.payload],
      });
    default:
      return state;
  }
};
