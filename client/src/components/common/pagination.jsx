import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import "./css/pagination.css";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  // console.log(pages);



  return (
    <div className="bar2">
      <div className="content-pagination">
        {currentPage-1<1 && <i className="fa fa-angle-double-left arrod" ></i>}
        {currentPage-1>=1 && <i className="fa fa-angle-double-left clickable arro" onClick={() => onPageChange(pages[currentPage-2])}></i>}
        <div className="pgcontent">
          {"    "}{currentPage} of {pagesCount}{"    "}
        </div>
        {currentPage+1<=pagesCount && <i className="fa fa-angle-double-right clickable arro" onClick={() => onPageChange(pages[currentPage])}></i>}
        {currentPage+1>pagesCount && <i className="fa fa-angle-double-right arrod"></i>}
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
