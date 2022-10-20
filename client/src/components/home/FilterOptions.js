import axios from "axios";
import style from './FilterOptions.module.css'
import React, { useEffect, useState } from "react";

let continentsList = [
  "Asia",
  "Europe",
  "North America",
  "Antarctica",
  "South America",
];

const FilterOptions = ({ setContinentFilter, setActivityFilter }) => {
  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/activities").then(({ data }) => {
      setActivityList(data);
    });
  }, []);

  return (
    <div>
      <div>
        <p>Continente:</p>
        <select onChange={(e) => setContinentFilter(e.target.value)}>
          <option value={""}>--Ninguno--</option>
          {continentsList.map((cont, index) => (
            <option value={cont} key={index}>
              {cont}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>Actividad:</p>
        <select onChange={(e) => setActivityFilter(e.target.value)}>
          <option value={""}>--Ninguna--</option>
          {activityList.map(({ name }) => (
            <option value={name} key={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterOptions;
