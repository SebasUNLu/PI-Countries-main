import React from "react";
import style from "./CountryCard.module.css";
import { NavLink } from "react-router-dom";

function CountryCard({ id, name, continent, flag, population }) {
  return (
      <NavLink className={style.cardCountry} to={`/country/${id}`}>
        <img alt={`${name} flag`} src={flag} />
        <h3>{name}</h3>
        <p>({continent})</p>
        {/* <p>Población: {population}</p> */}
      </NavLink>
  );
}

export default CountryCard;
