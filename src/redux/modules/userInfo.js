// Actions
export const SET_USER_INFO = 'party/userInfo/SET_USER_INFO';
export const UPDATE_TICKET_COUNT = 'party/userInfo/UPDATE_TICKET_COUNT';

// Action Creators
export function setUserInfo({ firstname, lastname, id, tickets }) {
  return {
    type: SET_USER_INFO,
    firstName: firstname,
    lastName: lastname,
    id,
    tickets,
  };
}

export function updateUserTicketCount(tickets) {
  return {
    type: UPDATE_TICKET_COUNT,
    tickets,
  };
}

const initialState = {
  firstName: '',
  lastName: '',
  id: '',
  tickets: {
    total: 0,
    remaining: 0,
  },
};

// Reducer
export default function userInfo(state = initialState, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return Object.assign({}, state, {
        firstName: action.firstName,
        lastName: action.lastName,
        id: action.id,
        tickets: action.tickets,
      });
    case UPDATE_TICKET_COUNT:
      return Object.assign({}, state, {
        tickets: action.tickets,
      });
    default:
      return state;
  }
}
