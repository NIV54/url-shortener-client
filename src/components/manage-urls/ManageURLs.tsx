import "./ManageURLs.scss";

import React, { useRef } from "react";
import {
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ChevronLeft,
  ChevronRight
} from "react-bootstrap-icons";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
// @types/react-table is not so good,
// that's why "any" and "!" is being used often in this file
import { useFilters, useGlobalFilter, usePagination, useTable } from "react-table";

import { getAllUrls, queryKeys } from "../../common/api/urls";
import { jsonify } from "../../common/api/utils/jsonify";
import { ShortURL } from "../../common/types/ShortURL.type";
import { resetEditableCell } from "../../store/editable-cell/slice";

import Filter from "./DefaultColumnFilter/DefaultColumnFilter";
import { EditableCell } from "./EditableCell/EditableCell";

const ownedUrlsQueryFn = jsonify<ShortURL[]>(getAllUrls);

export const ManageURLs = () => {
  const dispatch = useDispatch();

  const { data, isError } = useQuery(queryKeys.OWNED_SHORT_URLS, ownedUrlsQueryFn, { retry: 2 });

  const columns = useRef([
    {
      Header: "Alias",
      accessor: "alias"
    },
    {
      Header: "URL",
      accessor: "url",
      Cell: EditableCell
    }
  ]).current;

  const initialState: any = useRef({ pageSize: 5 }).current;

  const defaultColumn: any = useRef({ Filter }).current;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  }: any = useTable(
    {
      columns,
      data: data || [],
      defaultColumn,
      initialState
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );
  return (
    <div className="container" onDoubleClick={() => dispatch(resetEditableCell())}>
      {isError ? (
        <div className="alert alert-danger" role="alert">
          Failed to load
        </div>
      ) : !data ? (
        <div className="alert alert-info" role="alert">
          loading...
        </div>
      ) : (
        <>
          <div className="row justify-content-around justify-content-md-center">
            <ul className="pagination col-4">
              <li
                className={`page-item ${!canPreviousPage && " disabled"}`}
                onClick={() => gotoPage(0)}
              >
                <span className="page-link">
                  <ChevronDoubleLeft />
                </span>
              </li>
              <li
                className={`page-item ${!canPreviousPage && " disabled"}`}
                onClick={() => previousPage()}
              >
                <span className="page-link">
                  <ChevronLeft />
                </span>
              </li>
              <li className={`page-item ${!canNextPage && " disabled"}`} onClick={() => nextPage()}>
                <span className="page-link">
                  <ChevronRight />
                </span>
              </li>
              <li
                className={`page-item ${!canNextPage && " disabled"}`}
                onClick={() => gotoPage(pageCount - 1)}
              >
                <span className="page-link">
                  <ChevronDoubleRight />
                </span>
              </li>
            </ul>
            <h3 className="col-auto mr-lg-5">
              Page {pageOptions.length === 0 ? 0 : pageIndex + 1} of {pageOptions.length}
            </h3>
            <div className="form-row d-none d-md-flex">
              <div id="page-label" className="mr-2 text-center">
                <label className="mb-0" htmlFor="goToPage">
                  Go to page
                </label>
              </div>
              <div>
                <input
                  type="number"
                  name="goToPage"
                  className="form-control"
                  value={pageIndex + 1}
                  onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(page);
                  }}
                />
              </div>
              <div>
                <select
                  className="form-control"
                  value={pageSize}
                  onChange={e => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[5, 10, 15, 20].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize} records
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="table-wrapper">
            <table {...getTableProps()} className="table table-hover">
              <thead className="thead-dark">
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                        <div className="form-inline">
                          {column!.canFilter && column.render("Filter")}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
