import { SET_ERRORS, SET_LOADING, SET_EMAIL_SENT } from "../types";

const initialState = {
  errors: {},
  isLoading: false,
    emailSent: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_EMAIL_SENT:
        return {
            ...state,
            emailSent: action.payload,
        }


    default:
      return state;
  }
}