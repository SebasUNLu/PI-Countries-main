import { GET_ALL_COUNTRIES } from "../actions";

const initialState = {
  countries: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return { ...state, countries: action.payload };
    default:
      return { ...state };
  }
};
