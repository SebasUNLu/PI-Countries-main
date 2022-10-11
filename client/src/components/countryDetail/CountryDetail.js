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
          <h1>Código de País: {countryId}</h1>
          <img alt={`${name} flag`} src={flag} />
          <p>Continente: {continent}</p>
          <p>Capital: {capital}</p>
          <p>Subregion: {subregion}</p>
          <p>Area: {area}</p>
          <p>Poblacion: {population} personas</p>
          <div>
            <h3>Actividades disponibles</h3>
            {touristActivities.length > 0 &&
              touristActivities.map(({ name, dificulty, duration, season }, index) => (
                <ul key={index}>
                  <li>Nombre: {name}</li>
                  <li>Dificultad: {dificulty}</li>
                  <li>Duración: {duration} días</li>
                  <li>Temporada: {season}</li>
                </ul>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
