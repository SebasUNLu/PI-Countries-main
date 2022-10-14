import React, { useEffect, useState } from "react";
// import style from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "../../actions/index";

import CountryList from "./CountryList";
import FilterOptions from "./FilterOptions";
import Pagination from "./Pagination";

function Home(props) {
  const dispatch = useDispatch();
  const countryList = useSelector((state) => state.countries);

  const [filters, setFilters] = useState([]);

  const [ascendent, setAscendent] = useState(true);
  const [orderByName, setOrderByName] = useState("name");

  const [currentPage, setCurrentPage] = useState(1);
  const [countryPerPage, setCountryPerPage] = useState(10);

  useEffect(() => {
    if (countryList.length === 0) dispatch(getAllCountries());
  }, [dispatch, countryList]);

  const applyFilter = () => {
    let retList = [...countryList];
    for (const { type, content } of filters) {
      switch (type) {
        case "continent":
          retList = retList.filter((country) => country.continent === content);
          break;
        case "activity":
          retList = retList.filter(({ touristActivities }) => {
            for (let i = 0; i < touristActivities.length; i++) {
              if (touristActivities[i].name === content) return true;
            }
            return false;
          });
          break;
        default:
          break;
      }
    }
    return retList;
  };

  const applyOrdering = (list) => {
    let compare = ascendent
      ? (a, b) => {
          if (a[orderByName] < b[orderByName]) return -1;
          return 1;
        }
      : (a, b) => {
          if (a[orderByName] < b[orderByName]) return 1;
          return -1;
        };
    list.sort(compare);
  };

  let list;
  // aplico filtros
  list = applyFilter(list);
  // aplico ordenamiento
  applyOrdering(list);
  let lastIndex = currentPage * countryPerPage;
  let firstIndex = lastIndex - countryPerPage;
  let showCountryList = list.slice(firstIndex, lastIndex);

  return (
    <div>
      <div>
        <input type="text" placeholder="Filtrar por nombre"></input>
        {/* imagen de lupa */}
      </div>
      <FilterOptions setFilters={setFilters} />
      <CountryList countryList={showCountryList} />
      <Pagination
        totalCountries={list.length}
        countryPerPage={countryPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Home;
