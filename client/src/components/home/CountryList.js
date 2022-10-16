import React from "react";
import style from "./CountryList.module.css";
import CountryCard from "../countryCard/CountryCard";
import { useSelector } from "react-redux";

const CountryList = ({ countryList }) => {
  const {loadingCountries, errorLoadingCountries} = useSelector((state) => state);

  return (
    <div className={style.countryList}>
      {errorLoadingCountries && (
        <div>
          <h2>Hubo un error con la carga de datos.</h2>
        </div>
      )}
      {!errorLoadingCountries && loadingCountries && <h2>Cargando datos...</h2>}
      {!errorLoadingCountries &&
        !loadingCountries &&
        countryList.map((country, index) => (
          <CountryCard key={index} {...country} />
        ))}
    </div>
  );
};

export default CountryList;
