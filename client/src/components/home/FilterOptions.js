import React from "react";

let continentsList = ["America", "Asia"];

const FilterOptions = ({ setFilters }) => {

  const handleChange = (e) =>{
    
  }

  return (
    <div>
      <div>
        <p>Continente:</p>
        <select onChange={handleChange}>
          <option value={""}>--Ninguno--</option>
          {continentsList.map((cont, index) => (
            <option value={cont} key={index}>
              {cont}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterOptions;
