// Actions
import { RESET } from '../constants';

export const SET_PRIZES = 'party/prizes/SET_PRIZES';
export const UPDATE_PRIZE_TICKET_COUNT = 'party/prizes/UPDATE_PRIZE_TICKET_COUNT';

export function setPrizes(prizes) {
  return {
    type: SET_PRIZES,
    prizes,
  };
}

export function updateTicketCount(id, committedTickets) {
  return {
    type: UPDATE_PRIZE_TICKET_COUNT,
    id,
    committedTickets,
  };
}

const initialState = {};

// Reducer
export default function categories(state = initialState, action = { type: '' }) {
  switch (action.type) {
    case SET_PRIZES:
      return {
        ...state,
        ...action.prizes,
      };
    case UPDATE_PRIZE_TICKET_COUNT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          committedTickets: action.committedTickets,
        },
      };
    case RESET:
      return { ...initialState };
    default:
      return state;
  }
}
