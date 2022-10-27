import React, { useEffect, useState } from "react";
import style from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../actions/index";

import CountryList from "./CountryList";
import Pagination from "./Pagination";
import SearchName from "./SearchName";
import SideMenu from "./sideMenu/SideMenu";

function Home(props) {
  const dispatch = useDispatch();
  const { countryList, loadingCountries } = useSelector((state) => state);

  const [continentFilter, setContinentFilter] = useState("");
  const [activityFilter, setActivityFilter] = useState("");

  const [ascendent, setAscendent] = useState(true);
  const [orderBy, setOrderBy] = useState("name");

  const [currentPage, setCurrentPage] = useState(1);
  const [countryPerPage] = useState(10);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const applyFilter = () => {
    let retList = [...countryList];
    if (continentFilter) {
      retList = retList.filter(
        (country) => country.continent === continentFilter
      );
    }
    if (activityFilter) {
      retList = retList.filter(({ touristActivities }) => {
        for (let i = 0; i < touristActivities.length; i++) {
          if (touristActivities[i].name === activityFilter) return true;
        }
        return false;
      });
    }
    return retList;
  };

  const applyOrdering = (list) => {
    let compare = ascendent
      ? (a, b) => {
          if (a[orderBy] < b[orderBy]) return -1;
          return 1;
        }
      : (a, b) => {
          if (a[orderBy] < b[orderBy]) return 1;
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
    <>
      {loadingCountries && <h1 className={style.loading}>Cargando...</h1>}
      {!loadingCountries && (
        <div className={style.home_container}>
          <SideMenu
            setContinentFilter={setContinentFilter}
            setActivityFilter={setActivityFilter}
            setAscendent={setAscendent}
            setOrderBy={setOrderBy}
          />
          <div className={style.home_countryList}>
            <SearchName />
            <CountryList countryList={showCountryList} />
            <Pagination
              totalCountries={list.length}
              countryPerPage={countryPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
