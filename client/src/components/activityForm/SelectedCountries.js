import React from "react";
import style from "./SelectedCountries.module.css";

const SelectedCountries = ({ countryList, removeCountryHandler }) => {
  return (
    <div className={style.selectedList}>
      {countryList.length > 0 &&
        countryList.map(({ id, flag }) => (
          <div
            key={id}
            onClick={() => removeCountryHandler(id)}
            className={style.selectedC}
          >
            <img src={flag} />
            <button>X</button>
          </div>
        ))}
    </div>
  );
};

export default SelectedCountries;
