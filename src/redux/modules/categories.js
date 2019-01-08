// Actions
export const SET_CATEGORIES = 'party/categories/SET_CATEGORIES';

export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories,
  };
}

const initialState = {};

// Reducer
export default function categories(
  state = initialState,
  action = { type: '' },
) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        ...action.categories,
      };
    default:
      return state;
  }
}
