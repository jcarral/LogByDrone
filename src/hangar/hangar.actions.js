import {
  ERROR_CREATE_PILOT,
  START_CREATE_PILOT,
  SUCCESS_CREATE_PILOT,
  START_GET_HANGAR,
  ERROR_GET_HANGAR,
  SUCCESS_GET_HANGAR,
  EROR_CREATE_DRONE,
  SUCCESS_CREATE_DRONE,
  START_CREATE_DRONE,
  START_PARSE_FLIGHT,
  ERROR_PARSE_FLIGHT,
  SUCCESS_PARSE_FLIGHT,
  ERROR_DELETE_ITEM,
  START_DELETE_ITEM,
  SUCCESS_DELETE_ITEM_FLIGHT,
  SUCCESS_DELETE_ITEM_DRONE,
  SUCCESS_DELETE_ITEM_PILOT,
} from './hangar.types';
import { Firebase, Parser } from '../utils';

export const addPilot = (pilotData, groupId) => async (dispatch) => {
  try{
    dispatch({
      type: START_CREATE_PILOT,
    });
    const pilot = await Firebase.addPilot(pilotData, groupId);
    dispatch({
      type: SUCCESS_CREATE_PILOT,
      payload: pilot,
    });
  } catch (e) {
    console.error(e);
    dispatch({
      type: ERROR_CREATE_PILOT,
      payload: 'Piloto existente, prueba con otro nombre',
    })
  }
};

export const addDrone = (droneData, groupId) => async (dispatch) => {
  try{
    dispatch({
      type: START_CREATE_DRONE,
    });
    const drone = await Firebase.addDrone(droneData, groupId);
    dispatch({
      type: SUCCESS_CREATE_DRONE,
      payload: drone,
    });
  } catch (e){
    dispatch({
      type: EROR_CREATE_DRONE,
      payload: 'Drone existente, prueba con otro nombre',
    });
  }
};

export const getHangar = (groupId) => async (dispatch) => {
  try{
    dispatch({
      type: START_GET_HANGAR,
    });
    const group = await Firebase.getGroupHangar(groupId);

    dispatch({
      type: SUCCESS_GET_HANGAR,
      payload: group,
    }); 

  } catch (e){
    dispatch({
      type: ERROR_GET_HANGAR,
      payload: e,
    })
  }
};

export const parseFlight = (file, data) => async (dispatch, getState) => {
  try{
    const { groupId } = getState().auth;
    dispatch({
      type: START_PARSE_FLIGHT,
    });
    const flightLog = await Parser.parse(file);
    console.log(data)
    const flight = await Firebase.addFlight({
      flight: flightLog,
      name: (data.name || file.name) || '',
      drone: {
        key: data.drone.key || '',
        name: data.drone.name || '',
      },
      pilot: {
        key: data.pilot.key,
        name: data.pilot.name,
      },
    }, groupId);

    dispatch({
      type: SUCCESS_PARSE_FLIGHT,
      payload: flight,
    });
  } catch (e) {
    dispatch({
      type: ERROR_PARSE_FLIGHT,
      payload: e,
    });
  }
};

export const deleteItem = (type, key) => async (dispatch, getState) => {
  try{
    const { groupId } = getState().auth;
    let actionType;
    if( type === 'flights') actionType = SUCCESS_DELETE_ITEM_FLIGHT;
    else if ( type === 'drones') actionType = SUCCESS_DELETE_ITEM_DRONE;
    else if (type === 'pilots') actionType = SUCCESS_DELETE_ITEM_PILOT;
    else return dispatch({
      type: ERROR_DELETE_ITEM,
      payload: 'Tipo de elemento a borrar incorrecto',
    });
    dispatch({
      type: START_DELETE_ITEM,
    });
    await Firebase.deleteItem(type, key, groupId);
    dispatch({
      type: actionType,
      payload: key,
    });
  } catch (e) {
    dispatch({
      type: ERROR_DELETE_ITEM,
      payload: e,
    });
  }
};
