import axios from "axios";
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";

export const getAllCountries = () => {
  return (dispatch) => {
    return axios
      .get("localhost:3001/countries")
      .then((r) => r.data)
      .then((data) => {
        dispatch({ type: GET_ALL_COUNTRIES, payload: data });
      });
  };
};