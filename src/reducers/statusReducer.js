export const SAVE_GRAPHQL_STATUS = 'SAVE_GRAPHQL_STATUS';
export const SAVE_GRAPHQL_STATUS_COMPLETE = 'SAVE_GRAPHQL_STATUS_COMPLETE';
export const SAVE_AUTH_STATUS = 'SAVE_AUTH_STATUS';
export const SAVE_AUTH_STATUS_COMPLETE = 'SAVE_AUTH_STATUS_COMPLETE';

export const graphqlStatusReducer = (state = false, action) => {
  switch (action.type) {
    case SAVE_GRAPHQL_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export const authStatusReducer = (state = false, action) => {
  switch (action.type) {
    case SAVE_AUTH_STATUS:
      return action.payload;
    default:
      return state;
  }
};
