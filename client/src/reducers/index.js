import {
  GET_COUNTRIES,
  SET_LOADING_COUNTRIES,
  SET_ERROR_COUNTRIES,
} from "../actions";

const initialState = {
  countryList: [],
  loadingCountries: false,
  errorLoadingCountries: false,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return { ...state, countryList: action.payload };
    case SET_LOADING_COUNTRIES:
      return { ...state, loadingCountries: action.payload };
    case SET_ERROR_COUNTRIES:
      return { ...state, errorLoadingCountries: action.payload };
    default:
      return { ...state };
  }
}
