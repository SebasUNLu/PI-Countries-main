import React from "react";
import style from "./countryCard.module.css";
import { NavLink } from "react-router-dom";

function CountryCard({ id, name, continent, flag }) {
  return (
    <div className={style.cardCountry}>
      <NavLink to={`/country/${id}`}>
        <img alt={`${name} flag`} src={flag} />
        <h3>{name}</h3>
        <p>{continent}</p>
      </NavLink>
    </div>
  );
}

export default CountryCard;
