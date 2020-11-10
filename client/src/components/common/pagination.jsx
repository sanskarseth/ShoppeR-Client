import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import "./css/pagination.css";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <div className="bar2">
      <div className="sections4">
        Page:
        {pages.map(page => (
          <div
            key={page}
            className={`${page === currentPage ? "page-active" : "page-item"} section4`}
          >
            <div className="clickable" onClick={() => onPageChange(page)}>
              {page}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
