import {Action} from '@ngrx/store';

export const SELECT_VEHICLE = 'SELECT_VEHICLE';
export const SET_LICENSE_PLATE_NUMBER = 'SET_LICENSE_PLATE_NUMBER';
export const SET_MUD_IN_BED = 'SET_MUD_IN_BED';
export const SET_BED_LET_DOWN = 'SET_BED_LET_DOWN';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const CALCULATE_TOTAL = 'CALCULATE_TOTAL';

export interface VehicleInputFormState {
  vehicleType?: string;
  mudInBed?: boolean;
  bedLetDown?: boolean;
  licensePlate?: string;
  lastTenTransactions?: any[];
  knownStolenVehicle?: boolean;
  multipleVisits?: boolean;
  transactionTotal?: number;
  errors?: { [key: string]: string };
  canSubmit?: boolean;
}

const defaultState = {
  lastTenTransactions: [],
  canSubmit: true,
  errors: {}
};

export const vehicleInputForm = (state: VehicleInputFormState = defaultState, action: Action): VehicleInputFormState => {
  switch (action.type) {
    case SELECT_VEHICLE:
      return Object.assign({}, state, {
        vehicleType: action.payload,
        canSubmit: canSubmit(state, action, 'vehicleType')
      });
    case SET_LICENSE_PLATE_NUMBER:
      const isStolen = action.payload === '1111111';
      return Object.assign({}, state, {
        licensePlate: action.payload,
        knownStolenVehicle: isStolen,
        canSubmit: canSubmit(state, action, 'licensePlate'),
        errors: Object.assign({}, state.errors, isStolen ? {'licensePlate': 'This vehicle is stolen!!'} : {'licensePlate': null}),
        multipleVisits: !!state.lastTenTransactions.find(t => t.licensePlate === action.payload)
      });
    case SET_MUD_IN_BED:
      return Object.assign({}, state, {mudInBed: action.payload});
    case SET_BED_LET_DOWN:
      return Object.assign({}, state, {
        bedLetDown: action.payload,
        errors: action.payload ?
          Object.assign({}, state.errors, {'bedLetDown': 'We cannot service this vehicle with the bed let down!'})
          : Object.assign({}, state.errors, {'bedLetDown': null}),
        canSubmit: canSubmit(state, action, 'bedLetDown')
      });
    case ADD_TRANSACTION:
      const lastTen = state.lastTenTransactions ? state.lastTenTransactions.slice() : [];
      if (lastTen.length > 9) {
        lastTen.shift();
      }
      return Object.assign({}, state, {
        lastTenTransactions: [...lastTen, action.payload],
        licensePlate: '',
        vehicleType: 'car',
        transactionTotal: 5
      });
    case CALCULATE_TOTAL:
      let calculatedTotal = 5;
      if (state.vehicleType === 'truck') {
        calculatedTotal += 5;
      }
      if (state.vehicleType === 'truck' && state.mudInBed) {
        calculatedTotal += 2;
      }
      if (state.multipleVisits) {
        calculatedTotal *= 0.5;
      }
      return Object.assign({}, state, {transactionTotal: calculatedTotal});
    default:
      return state;
  }
};

function canSubmit(state, action, change) {
  const isTruck = state.vehicleType === 'truck';
  const isStolen = state.licensePlate === '1111111';
  const bedIsDown = state.bedLetDown;
  if (change === 'licensePlate') {
    if (action.payload === '1111111') {
      return false;
    } else if (isTruck && bedIsDown) {
      return false;
    }
  }
  if (change === 'vehicleType') {
    if (action.payload === 'car' && !isStolen) {
      return true;
    } else if (bedIsDown) {
      return false;
    } else if (isStolen) {
      return false;
    }
  }
  if (change === 'bedLetDown') {
    if ((isTruck || action.payload === 'truck') && (action.payload === true)) {
      return false;
    } else if (isStolen) {
      return false;
    }
  }

  return true;
}
