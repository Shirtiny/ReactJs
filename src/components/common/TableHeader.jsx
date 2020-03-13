import React, { Component } from "react";

class TableHeader extends Component {
  //更改输入的sortColumn
  changeSortColumn = path => {
    //如果path为假真值 不继续
    if (!path) return;
    //path有值时
    let column = { ...this.props.sortColumn };
    //比如 如果仍然是按照title（path之一)排序 那就改变order
    if (column[this.props.pathProperty] === path) {
      column.order =
        column.order === "asc"
          ? (column.order = "desc")
          : (column.order = "asc");
    } else {
      //比如 上次按title排序，这次按genre.name排序 把order变为顺序 更改path
      column[this.props.pathProperty] = path;
      column.order = "asc";
    }
    this.props.sortColumnFunc(column);
  };

  //排序的动态箭头
  getSortArrow = (column, labelProperty) => {
    //根据order是asc还是desc决定箭头方向
    let arrowClass =
      this.props.sortColumn.order === "asc"
        ? "fa fa-level-up"
        : "fa fa-level-down";
    //如果是有效列表项，并且排序的项是当前列表项 出现箭头
    if (column[labelProperty] && this.props.sortColumn.path === column.path) {
      return <i className={arrowClass} aria-hidden="true"></i>;
    } else return;
  };

  render() {
    const { columns, labelProperty, pathProperty, keyProperty } = this.props;

    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column[keyProperty]}
              onClick={() => this.changeSortColumn(column[pathProperty])}
            >
              {column[labelProperty]}
              {this.getSortArrow(column, labelProperty)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
