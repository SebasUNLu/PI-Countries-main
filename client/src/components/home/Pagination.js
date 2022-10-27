import React, { useEffect, useState } from "react";
import style from "./Pagination.module.css";

const Pagination = ({
  totalCountries,
  countryPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    let paginas = [1];
    let restCountries = totalCountries - 9; // El 9 es por los primeros 9 en la primera pagina
    if (restCountries > 0)
      for (let i = 2; i <= Math.ceil(restCountries / countryPerPage) + 1; i++) {
        paginas.push(i);
      }
    setPages(paginas);
  }, [setPages, totalCountries, countryPerPage]);

  useEffect(() => {
    if (currentPage > pages.length && pages.length !== 0)
      setCurrentPage(pages.at(-1));
  }, [currentPage, pages, setCurrentPage]);

  return (
    <div className={style.paginado}>
      {pages.map((page) => (
        <button
          className={`${style.paginado_btn} ${
            currentPage === page && `${style.selected_page}`
          }`}
          key={page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
