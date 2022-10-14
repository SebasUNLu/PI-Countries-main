import React from "react";

const Pagination = ({ totalCountries, countryPerPage, setCurrentPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalCountries / countryPerPage); i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((page) => (
        <button key={page} onClick={() => setCurrentPage(page)}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
