import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = props => {
  const { totalCount, pageSize, currentPage, changeCurrentPageFunc } = props;
  //Math.ceil()将小数补为整数 总页数=总数量 / 每页容量  然后补为整数
  const pageCount = Math.ceil(totalCount / pageSize);
  //生成页码数组 数字范围从1到pageCount，增量为1
  const pageNumbers = _.range(1, pageCount + 1, 1);
  console.log(
    "总数量：",
    totalCount,
    "；每页容量：",
    pageSize,
    "；求出总页数：",
    pageCount,
    ";生成页码数组：",
    pageNumbers
  );

  if (pageCount === 1) {
    console.log("只有一页，不渲染", props);
    return null;
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li
            className={
              number === currentPage ? "page-item active" : "page-item"
            }
            key={number}
          >
            <button
              className="page-link"
              onClick={() => changeCurrentPageFunc(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

//prop-types prop属性类型校验 别拼错了
Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  changeCurrentPageFunc: PropTypes.func.isRequired
};

export default Pagination;
