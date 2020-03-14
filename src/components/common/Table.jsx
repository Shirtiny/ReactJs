import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = props => {
  const {
    columns,
    labelProperty,
    pathProperty,
    keyProperty,
    idProperty,
    funcProperty,
    linkPropertyPath,
    linkUrl,
    sortColumn,
    sortColumnFunc,
    items
  } = props;

  return (
    <table className="table">
      <TableHeader
        columns={columns}
        labelProperty={labelProperty}
        pathProperty={pathProperty}
        keyProperty={keyProperty}
        sortColumn={sortColumn}
        sortColumnFunc={sortColumnFunc}
      />
      <TableBody
        items={items}
        columns={columns}
        pathProperty={pathProperty}
        labelProperty={labelProperty}
        funcProperty={funcProperty}
        idProperty={idProperty}
        keyProperty={keyProperty}
        linkPropertyPath={linkPropertyPath}
        linkUrl={linkUrl}
      />
    </table>
  );
};

export default Table;
