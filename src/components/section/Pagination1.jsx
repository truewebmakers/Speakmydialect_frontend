import { pageLimit } from "@/constants/constant";
import React from "react";

export default function Pagination1({
  currentPage,
  setCurrentPage,
  total,
  fetchData,
}) {
  const totalPages = Math.ceil(total / pageLimit); // Assuming 10 items per page

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent out-of-bounds pages
    setCurrentPage(page);
    fetchData(page); // Call the API to fetch data for the selected page
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? "active" : ""}`}
        >
          <a className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </a>
        </li>
      );
    }
    return items;
  };

  return (
    <div className="mbp_pagination text-center">
      <ul className="page_navigation">
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span className="fas fa-angle-left" />
          </a>
        </li>
        {renderPaginationItems()}
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="fas fa-angle-right" />
          </a>
        </li>
      </ul>
      <p className="mt10 mb-0 pagination_page_count text-center">
        {(currentPage - 1) * +pageLimit + 1} –{" "}
        {Math.min(currentPage * +pageLimit, total)} of {total} properties
        available
      </p>
    </div>
  );
}
