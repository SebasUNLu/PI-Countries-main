import React from "react";
import style from './SearchName.module.css'
import { useDispatch } from "react-redux";
import { getCountries } from "../../actions";

const SearchName = (props) => {
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    dispatch(getCountries(e.target.value));
  };

  return (
    <div className={style.searchName}>
      <input
        type="text"
        placeholder="Filtrar por nombre"
        onChange={changeHandler}
      />
    </div>
  );
};

export default SearchName;
