import React from "react";
import style from './CountryList.module.css'
import CountryCard from "../countryCard/CountryCard";

const CountryList = ({ countryList }) => {
  return (
    <div className={style.countryList}>
      {countryList.length === 0 && <h2>Cargando datos...</h2>}
      {countryList &&
        countryList.map((country, index) => (
          <CountryCard key={index} {...country} />
        ))}
    </div>
  );
};

export default CountryList;
