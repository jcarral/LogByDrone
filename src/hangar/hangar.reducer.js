import {
  ERROR_CREATE_PILOT,
  START_CREATE_PILOT,
  SUCCESS_CREATE_PILOT,
  START_GET_HANGAR,
  SUCCESS_GET_HANGAR,
  ERROR_GET_HANGAR,
  START_CREATE_DRONE,
  SUCCESS_CREATE_DRONE,
  EROR_CREATE_DRONE,
  START_PARSE_FLIGHT,
  SUCCESS_PARSE_FLIGHT,
  ERROR_PARSE_FLIGHT,
  START_DELETE_ITEM,
  SUCCESS_DELETE_ITEM_DRONE,
  SUCCESS_DELETE_ITEM_FLIGHT,
  SUCCESS_DELETE_ITEM_PILOT,
  ERROR_DELETE_ITEM,
} from './hangar.types';
const defaultState = {
  pilots: [],
  drones: [],
  flights: [],
  loading: false,
  updateErrors: {
    pilots: null,
    drones: null,
    flights: null,
  },
  error: null,
};

export const hangarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case START_PARSE_FLIGHT:
      return {
        ...state,
        loading: true,
        error: null,
        updateErrors: {
          ...state.updateErrors,
          flights: null,
        },
      };
    case START_CREATE_PILOT:
      return {
        ...state,
        loading: true,
        error: null,
        updateErrors: {
          ...state.updateErrors,
          pilots: null,
        },
      };
    case START_CREATE_DRONE:
      return {
        ...state,
        loading: true,
        error: null,
        updateErrors: {
          ...state.updateErrors,
          drones: null,
        },
      };
    case START_GET_HANGAR:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case START_DELETE_ITEM:
      return {
        ...state,
        loading: true,
        error: null,
        updateErrors: {
          pilots: null,
          flights: null,
          drones: null,
        }
      };
    case SUCCESS_GET_HANGAR:
      return {
        ...state,
        pilots: action.payload.pilots,
        drones: action.payload.drones,
        flights: action.payload.flights,
        name: action.payload.name,
        loading: false,
        error: null,
        updateErrors: {
          pilots: null,
          drones: null,
          flights: null,
        },
      };
    case SUCCESS_CREATE_PILOT:
      return {
        ...state,
        loading: false,
        updateErrors: {
          ...state.updateErrors,
          pilots: null,
        },
        pilots: [...state.pilots, action.payload],
      };
    case SUCCESS_PARSE_FLIGHT:
      return {
        ...state,
        loading: false,
        updateErrors: {
          ...state.updateErrors,
          flights: null,
        },
        flights: [...state.flights, action.payload],
      };
    case SUCCESS_CREATE_DRONE:
      return {
        ...state,
        loading: false,
        updateErrors: {
          ...state.updateErrors,
          drones: null,
        },
        drones: [...state.drones, action.payload],
      };
    case SUCCESS_DELETE_ITEM_DRONE:
      return {
        ...state,
        loading: false,
        updateErrors: {
          ...state.updateErrors,
          drones: null,
        },
        drones: state.drones.filter(drone => drone.key !== action.payload),
      };
    case SUCCESS_DELETE_ITEM_FLIGHT:
      return {
        ...state,
        loading: false,
        updateErrors: {
          ...state.updateErrors,
          flights: null,
        },
        flights: state.flights.filter(flight => flight.key !== action.payload),
      };
    case SUCCESS_DELETE_ITEM_PILOT:
      return {
        ...state,
        loading: false,
        updateErrors: {
          ...state.updateErrors,
          pilots: null,
        },
        pilots: state.pilots.filter(pilot => pilot.key !== action.payload),
      };
    case ERROR_CREATE_PILOT:
      return {
        ...state,
        loading: false,
        updateErrors: {
          ...state.updateErrors,
          pilots: action.payload,
        },
      };
    case ERROR_PARSE_FLIGHT:
      return {
        ...state,
        loading: false,
        updateErrors: {
          ...state.updateErrors,
          flights: action.payload,
        },
      };
    case EROR_CREATE_DRONE:
      return {
        ...state,
        loading: false,
        updateErrors: {
          ...state.updateErrors,
          drones: action.payload,
        },
      };
    case ERROR_GET_HANGAR:
    case ERROR_DELETE_ITEM:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
