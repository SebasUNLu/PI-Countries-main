import React from "react";
import style from "./countryCard.module.css";
import { NavLink } from "react-router-dom";

function CountryCard({ id, name, continent, flag, population }) {
  return (
    <div className={style.cardCountry}>
      <NavLink to={`/country/${id}`}>
        <img alt={`${name} flag`} src={flag} />
        <h3>{name}</h3>
        <p>{continent}</p>
        <p>Población: {population}</p>
      </NavLink>
    </div>
  );
}

export default CountryCard;
