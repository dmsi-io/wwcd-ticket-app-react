// Actions
import { RESET } from '../constants';

export const SET_USER_PRIZES = 'party/userPrizes/SET_USER_PRIZES';
export const UPDATE_USER_PRIZES = 'party/userPrizes/UPDATE_USER_PRIZES';

export function setUserPrizes(prizes) {
  return {
    type: SET_USER_PRIZES,
    prizes,
  };
}

export function updateUserPrizes(prizes) {
  return {
    type: UPDATE_USER_PRIZES,
    prizes,
  };
}

const initialState = {};

// Reducer
export default function categories(state = initialState, action = { type: '' }) {
  switch (action.type) {
    case SET_USER_PRIZES:
      return {
        ...state,
        ...action.prizes,
      };
    case UPDATE_USER_PRIZES:
      return {
        ...state,
        ...action.prizes,
      };
    case RESET:
      return { ...initialState };
    default:
      return state;
  }
}
