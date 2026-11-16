import React from "react";
import "./Pagination.css";
const PaginationClient = ({ nPages, currentPage, setCurrentPage }) => {
  const result = Math.floor(nPages / 10);

  const pageNumbers = [...Array(result + 2).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <nav className="paginationSite">
      <ul className="pagination justify-content-center">
        <li className="page-item next">
          <a className="page-link " onClick={prevPage} href="#">
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </a>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage == pgNumber ? "active" : ""} `}
          >
            <a
              onClick={() => setCurrentPage(pgNumber)}
              className="page-link"
              href="#"
            >
              {pgNumber}
            </a>
          </li>
        ))}
        {/* <li className="page-item prev">
          <a className="page-link " onClick={nextPage} href="#">
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </a>
        </li> */}
      </ul>
    </nav>
  );
};

export default PaginationClient;
