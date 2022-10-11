import React, { useEffect } from "react";
import style from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "../../actions/index";

import CountryCard from "../countryCard/CountryCard";

export default function Home(props) {
  const dispatch = useDispatch();
  const countryList = useSelector((state) => state.countries);
  useEffect(() => {
    if (countryList.length === 0) dispatch(getAllCountries());
  }, [dispatch, countryList]);

  return (
    <div className={style.homeContainer}>
      <div>
        {/* Filtro por nombre */}
        <input type="text" placeholder="Filtrar por nombre"></input>
        {/* imagen de lupa */}
      </div>
      <div className={style.countryList}>
        {countryList.length === 0 && <h2>Cargando datos...</h2>}
        {countryList &&
          countryList.map((country, index) => (
            <CountryCard key={index} {...country} />
          ))}
      </div>
    </div>
  );
}
