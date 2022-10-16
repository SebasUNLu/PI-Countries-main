import React from "react";
import { useDispatch } from "react-redux";
import { getCountries } from "../../actions";

const SearchName = (props) => {
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    dispatch(getCountries(e.target.value));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por nombre"
        onChange={changeHandler}
      />
    </div>
  );
};

export default SearchName;
