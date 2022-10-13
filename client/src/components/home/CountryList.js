import React from "react";

import CountryCard from "../countryCard/CountryCard";

const CountryList = ({ countryList }) => {
  return (
    <div>
      {countryList.length === 0 && <h2>Cargando datos...</h2>}
      {countryList &&
        countryList.map((country, index) => (
          <CountryCard key={index} {...country} />
        ))}
    </div>
  );
};

export default CountryList;
