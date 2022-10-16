import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const SET_LOADING_COUNTRIES = "SET_LOADING_COUNTRIES";
export const SET_ERROR_COUNTRIES = "SET_ERROR_COUNTRIES";

export const getCountries = (name) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    return axios
      .get(`http://localhost:3001/countries${name ? `?name=${name}` : ""}`)
      .then(({ data }) => {
        dispatch({ type: GET_COUNTRIES, payload: data });
      })
      .catch((e) => {
        console.log(e);
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
