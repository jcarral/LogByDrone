import { combineReducers } from 'redux';
import { authReducer } from '../auth/auth.reducer';
import { hangarReducer } from '../hangar/hangar.reducer';

export default combineReducers({
  auth: authReducer,
  hangar: hangarReducer,
});
