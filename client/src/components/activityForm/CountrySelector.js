import React from "react";
import style from "./CountrySelector.module.css";

const countrySelector = ({ countryList, openList, addCountry }) => {
  const checkSelected = (id) => {
    for (let i = 0; i < countryList.length; i++) {
      if (countryList[i].id === id) return true;
    }
    return false;
  };

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
            className={`${style.countryMiniCard} ${
              checkSelected(id) ? `${style.selected}` : ``
            }`}
            onClick={() => addCountry({ id, name, flag })}
          ></div>
        ))}
    </div>
  );
};

export default countrySelector;
