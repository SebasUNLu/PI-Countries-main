import React from "react";
import style from "./CountrySelector.module.css";

const countrySelector = ({ countryList, openList, addCountry, findCountry }) => {

  return (
    <div
      className={`${style.countryListForm} ${
        openList ? `${style.open}` : `${style.close}`
      }`}
    >
      {countryList.length > 0 &&
        countryList.map(({ id, name, flag }) => (
          <div
            key={id}
            className={`${style.countryMiniCard} ${findCountry(id) ? `${style.selected}` : ``}`}
            onClick={() => addCountry({ id, name, flag })}
          >
            <img src={flag} />
          </div>
        ))}
    </div>
  );
};

export default countrySelector;
