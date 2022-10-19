import React, { useEffect, useState } from "react";
import style from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../actions/index";

import CountryList from "./CountryList";
import FilterOptions from "./FilterOptions";
import OrderingOptions from "./OrderingOptions";
import Pagination from "./Pagination";
import SearchName from "./SearchName";

function Home(props) {
  const dispatch = useDispatch();
  const { countryList } = useSelector((state) => state);
  const [openSide, setOpenSide] = useState(false);

  const [continentFilter, setContinentFilter] = useState("");
  const [activityFilter, setActivityFilter] = useState("");

  const [ascendent, setAscendent] = useState(true);
  const [orderBy, setOrderBy] = useState("name");

  const [currentPage, setCurrentPage] = useState(1);
  const [countryPerPage, setCountryPerPage] = useState(10);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

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
    <div className={style.home_container}>
      <div
        className={`${style.sideOptions} ${
          openSide ? `${style.sideOptions_open}` : ``
        }`}
      >
        <button
          className={`${style.sideOptionsButton} ${
            openSide ? `${style.sideOptionsButton_fade}` : ``
          }`}
          onClick={() => setOpenSide(true)}
        >
          {"<"}
        </button>
      </div>
      <div className={style.home_countryList}>
        <SearchName />
        {/* 
        <LateralList />
      */}

        {/* <FilterOptions
        setContinentFilter={setContinentFilter}
        setActivityFilter={setActivityFilter}
      />
      <OrderingOptions setAscendent={setAscendent} setOrderBy={setOrderBy} /> */}
        <CountryList countryList={showCountryList} />
        <Pagination
          totalCountries={list.length}
          countryPerPage={countryPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Home;
