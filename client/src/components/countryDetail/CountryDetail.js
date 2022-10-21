import axios from "axios";
import style from "./countryDetail.module.css";
import React, { useEffect, useState } from "react";

export default function CountryDetail({ countryId }) {
  useEffect(() => {
    axios
      .get(`http://localhost:3001/countries/${countryId}`)
      .then((r) => r.data)
      .then((d) => {
        setInfo({ ...d });
        setLoad(true);
      });
  }, [countryId]);
  const [
    {
      name,
      flag,
      continent,
      capital,
      subregion,
      area,
      population,
      touristActivities,
    },
    setInfo,
  ] = useState({
    name: null,
    flag: null,
    continent: null,
    capital: null,
    subregion: null,
    area: null,
    population: null,
    touristActivities: null,
  });
  const [load, setLoad] = useState(false);

  return (
    <div>
      {!load && <h2>Cargando datos...</h2>}
      {load && (
        <div className={style.detailContainer}>
          <h1>{name}</h1>
          <div className={style.flag_Cap_container}>
            <img alt={`${name} flag`} src={flag} />
            <div>
              <p>Capital:</p>
              <p>{capital}</p>
            </div>
          </div>
          <div className={style.detail_div}>
            <p>Código ISO: {countryId}</p>
          </div>
          <div className={style.detail_div}>
            <p>Continente: {continent}</p>
          </div>
          <div className={style.detail_div}>
            <p>Poblacion: {population} personas</p>
          </div>
          <div className={style.detail_div}>
            <p>Subregion: {subregion}</p>
          </div>
          <div className={style.detail_div}>
            <p>Area: {area}</p>
          </div>
          <div className={style.activities_Container}>
            <h2>Actividades Turisticas</h2>
            {
              touristActivities.length === 0
              ? <h3>No hay actividades turisticas en este país</h3>
              : touristActivities.map(({name, dificulty, duration, season}) => 
                  <div className={style.activity_card}>
                    <h3>{name}</h3>
                    <div className={style.activity_details}>
                      <div className={style.activity_detail_info}>
                        <h4>Dificultad</h4>
                        <p>{dificulty}</p>
                      </div>
                      <div className={style.activity_detail_info}>
                        <h4>Duración</h4>
                        <p>{duration}</p>
                      </div>
                      <div className={style.activity_detail_info}>
                        <h4>Temporada</h4>
                        <p>{season}</p>
                      </div>
                    </div>
                  </div>
                )
            }
          </div>
        </div>
      )}
    </div>
  );
}
