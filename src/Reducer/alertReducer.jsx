//  Forgot Email Reducer
export const ShowAlertReducer = (state = {}, action) => {
  switch (action.type) {
    case "ShowAlert":
      return {
        ...state,
        alertData: action.payload,
      };
    case "ClearAlert":
      return {};

    default:
      return {
        ...state,
      };
  }
};
