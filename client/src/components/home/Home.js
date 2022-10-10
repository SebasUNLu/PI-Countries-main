import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "../../actions/index";

import CountryCard from "../countryCard/CountryCard";

export default function Home(props) {
  const dispatch = useDispatch();
  const countryList = useSelector((state) => state.countries);
  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);
  console.log(countryList[0]);

  return (
    <div>
      <div>
        {/* Filtro por nombre */}
        <input type="text" placeholder="Filtrar por nombre"></input>
        {/* imagen de lupa */}
      </div>
      <div>
        {countryList &&
          countryList.map((country, index) => (
            <CountryCard key={index} {...country} />
          ))}
      </div>
    </div>
  );
}
