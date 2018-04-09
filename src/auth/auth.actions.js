import {
  START_LOGIN,
  ERROR_LOGIN,
  SUCCESS_LOGIN,
  ERROR_SIGNUP,
  SUCCESS_SIGNUP,
  SUCCESS_GETUSER,
  START_SIGNUP,
  ERROR_GETUSER,
  ERROR_LOGOUT,
  START_LOGOUT,
  SUCCESS_LOGOUT,
} from './auth.types';
import { Firebase } from '../utils';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: START_LOGIN,
    });
    const user = await Firebase.logIn(email, password);
    localStorage.setItem('user', JSON.stringify(user));
    //TODO: GET USER INFO
    return dispatch({
      type: SUCCESS_LOGIN,
      payload: user,
    });
  } catch (error) {
    return dispatch({
      type: ERROR_LOGIN,
      payload: error,
    });
  }
};

export const signup = (data) => async (dispatch) => {
  try {
    dispatch({
      type: START_SIGNUP,
    });
    const user = await Firebase.signUp(data.email, data.password, data.name);
    const groupId = await Firebase.createGroup(data.groupName, user.uid);
    localStorage.setItem('user', JSON.stringify({
      user: user,
      groupId,
      })
    );
    dispatch({
      type: SUCCESS_SIGNUP,
      payload: {
        user,
        groupId,
      }
    });
  } catch (e) {
    dispatch({
      type: ERROR_SIGNUP,
      payload: e,
    })
  }
};

export const getUser = () => {
  let res = localStorage.getItem('user');
  res = JSON.parse(res);
  if (res
    && res.user
    && res.groupId
    && res.user.hasOwnProperty('uid')
    && res.user.hasOwnProperty('email')
    && res.user.hasOwnProperty('displayName')
  ) {
    return {
      type: SUCCESS_GETUSER,
      payload: res,
    };
  }
  else {
    return {
      type: ERROR_GETUSER,
    }
  }
}

export const logout = () => async (dispatch) => {
  try{
    dispatch({
      type: START_LOGOUT,
    });
    await Firebase.logOut();
    localStorage.removeItem('user');
    dispatch({
      type: SUCCESS_LOGOUT,
    });
  } catch (e) {
    dispatch({
      type: ERROR_LOGOUT,
      payload: e,
    })
  }
};
