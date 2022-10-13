import React, { useEffect, useState } from "react";
// import style from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "../../actions/index";

import CountryList from "./CountryList";
import Pagination from "./Pagination";

function Home(props) {
  const dispatch = useDispatch();
  const countryList = useSelector((state) => state.countries);

  const [currentPage, setCurrentPage] = useState(1);
  const [countryPerPage, setCountryPerPage] = useState(5);

  let lastIndex = currentPage * countryPerPage;
  let firstIndex = lastIndex - countryPerPage;
  let showCountryList = countryList.slice(firstIndex, lastIndex);

  useEffect(() => {
    if (countryList.length === 0) dispatch(getAllCountries());
  }, [dispatch, countryList]);

  return (
    <div>
      <div>
        <input type="text" placeholder="Filtrar por nombre"></input>
        {/* imagen de lupa */}
      </div>
      <CountryList countryList={showCountryList} />
      <Pagination
        totalCountries={countryList.length}
        countryPerPage={countryPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Home;
