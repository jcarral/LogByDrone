import {
  START_LOGIN,
  ERROR_LOGIN,
  SUCCESS_LOGIN,
} from './auth.types';
const initialState = {
  isLoggedIn: false,
  isLogging: false,
  error: '',
};

export const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case START_LOGIN:
      return {
        ...state,
        isLogging: true,
        isLoggedIn: false,
      };
    case SUCCESS_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        isLogging: false,
      };
    case ERROR_LOGIN:
      return {
        ...state,
        isLogging: false,
        isLoggedIn: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
