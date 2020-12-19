import React from "react";

const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter }
}) => {
  const recordCount = preFilteredRows.length;
  return (
    <input
      className="form-control"
      type="text"
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined); // set undefined to remove the filter entirely
      }}
      placeholder={`Search ${recordCount} records...`}
    />
  );
};

export default DefaultColumnFilter;
