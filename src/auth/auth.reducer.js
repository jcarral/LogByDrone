import {
  START_LOGIN,
  ERROR_LOGIN,
  SUCCESS_LOGIN,
  ERROR_SIGNUP,
  START_SIGNUP,
  SUCCESS_SIGNUP,
  SUCCESS_GETUSER,
} from './auth.types';
const initialState = {
  isLoggedIn: false,
  isLogging: false,
  error: '',
  user: {},
  groupId: null,
};

export const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case START_LOGIN:
    case START_SIGNUP:
      return {
        ...state,
        isLogging: true,
        isLoggedIn: false,
        error: null,
      };
    case SUCCESS_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        isLogging: false,
        error: null,
        user: action.payload.user,
        groupId: action.payload.groupId,
      };
    case SUCCESS_SIGNUP:
    case SUCCESS_GETUSER:
      return {
        ...state,
        isLoggedIn: true,
        isLogging: false,
        user: action.payload.user,
        groupId: action.payload.groupId,
        error: null,
      };
    case ERROR_LOGIN:
    case ERROR_SIGNUP:
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
