import {
  START_LOGIN,
  ERROR_LOGIN,
  SUCCESS_LOGIN,
} from './auth.types';
import { Firebase } from '../utils';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: START_LOGIN,
    });
    await Firebase.logIn(email, password);
    //TODO: GET USER INFO
    return dispatch({
      type: SUCCESS_LOGIN,
    });
  } catch (error) {
    return dispatch({
      type: ERROR_LOGIN,
      payload: error,
    });
  }
};
