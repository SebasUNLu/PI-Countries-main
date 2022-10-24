import React from "react";
import style from "./Pagination.module.css";

const Pagination = ({
  totalCountries,
  countryPerPage,
  currentPage,
  setCurrentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalCountries / countryPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className={style.paginado}>
      {pages.map((page) => (
        <button
          className={`${style.paginado_btn} ${currentPage === page && `${style.selected_page}`}`}
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
