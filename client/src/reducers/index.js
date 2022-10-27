import {
  GET_COUNTRIES,
  SET_LOADING_COUNTRIES,
  SET_ERROR_COUNTRIES,
  GET_DETAIL_COUNTRY,
  SET_DETAIL_ERROR,
  SET_DETAIL_LOADING,
  CLEAN_DETAIL,
} from "../actions";

const initialState = {
  countryList: [],
  loadingCountries: false,
  errorLoadingCountries: false,
  detailCountry: 0,
  detailLoading: false,
  detailError: "",
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return { ...state, countryList: action.payload };
    case SET_LOADING_COUNTRIES:
      return { ...state, loadingCountries: action.payload };
    case SET_ERROR_COUNTRIES:
      return { ...state, errorLoadingCountries: action.payload };
    case GET_DETAIL_COUNTRY:
      return { ...state, detailCountry: action.payload };
    case SET_DETAIL_ERROR:
      return { ...state, detailError: action.payload };
    case SET_DETAIL_LOADING:
      return { ...state, detailLoading: action.payload };
    case CLEAN_DETAIL:
      return { ...state, detailCountry: 0};
    default:
      return { ...state };
  }
}
