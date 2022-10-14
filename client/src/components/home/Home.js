import React, { useEffect, useState } from "react";
// import style from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "../../actions/index";

import CountryList from "./CountryList";
import Pagination from "./Pagination";

function Home(props) {
  const dispatch = useDispatch();
  const countryList = useSelector((state) => state.countries);

  const [filters, setFilters] = useState({
    type: "activity",
    content: "Actividad 1",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [countryPerPage, setCountryPerPage] = useState(10);

  useEffect(() => {
    if (countryList.length === 0) dispatch(getAllCountries());
  }, [dispatch, countryList]);

  const applyFilter = (lista) => {
    let { type, content } = filters;
    switch (type) {
      case "continent":
        return lista.filter((country) => country.continent === content);
      case "activity":
        return lista.filter((country) => {
          let find = false;
          country.touristActivities.forEach((activity) => {
            if (activity.name === content) {
              console.log("yes");
              find = true;
            }
          });
          return find;
        });
      default:
        // No filter apply
        return countryList;
    }
  };

  let list = [...countryList];
  // aplico filtros
  list = applyFilter(list);
  console.log(list);
  // aplico ordenamiento
  let lastIndex = currentPage * countryPerPage;
  let firstIndex = lastIndex - countryPerPage;
  let showCountryList = list.slice(firstIndex, lastIndex);

  return (
    <div>
      <div>
        <input type="text" placeholder="Filtrar por nombre"></input>
        {/* imagen de lupa */}
      </div>
      <CountryList countryList={showCountryList} />
      <Pagination
        totalCountries={showCountryList.length}
        countryPerPage={countryPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Home;
