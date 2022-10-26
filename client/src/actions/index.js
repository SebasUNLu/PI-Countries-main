import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const SET_LOADING_COUNTRIES = "SET_LOADING_COUNTRIES";
export const SET_ERROR_COUNTRIES = "SET_ERROR_COUNTRIES";
export const GET_DETAIL_COUNTRY = "GET_DETAIL_COUNTRY";
export const SET_DETAIL_ERROR = "SET_DETAIL_ERROR";
export const SET_DETAIL_LOADING = "SET_DETAIL_LOADING";

export const getCountries = (name) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    return axios
      .get(`http://localhost:3001/countries${name ? `?name=${name}` : ""}`)
      .then(({ data }) => {
        dispatch({ type: GET_COUNTRIES, payload: data });
      })
      .catch((e) => {
        dispatch(setErrorCountries(e));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};

export const setLoading = (payload) => {
  return { type: SET_LOADING_COUNTRIES, payload };
};

export const setErrorCountries = (payload) => {
  return { type: SET_ERROR_COUNTRIES, payload };
};

export const getDetailCountry = (idCountry) => {
  return (dispatch) => {
    dispatch(setDetailLoading(true));
    axios
      .get(`http://localhost:3001/countries/${idCountry}`)
      .then(({ data }) => {
        dispatch({
          type: GET_DETAIL_COUNTRY,
          payload: data,
        });
      })
      .catch((e) => {
        dispatch(setDetailError(e.message));
      })
      .finally(() => {
        dispatch(setDetailLoading(false));
      });
  };
};

export const setDetailLoading = (payload) => {
  return { type: SET_DETAIL_LOADING, payload };
};
export const setDetailError = (payload) => {
  return { type: SET_DETAIL_ERROR, payload };
};
