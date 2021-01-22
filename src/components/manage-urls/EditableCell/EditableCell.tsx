import "./EditableCell.scss";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CellProps } from "react-table";
import { toast } from "react-toastify";

import { deleteUrl, editUrl } from "../../../common/api/urls";
import * as messages from "../../../common/user-messages";
import { State } from "../../../store";
import { resetEditableCell, setEditableCell } from "../../../store/editable-cell/slice";

// TODO: refactor - value and previous value
export const EditableCell = (props: CellProps<any, string>) => {
  const dispatch = useDispatch();
  const cellId = useRef(props.cell.getCellProps().key).current as string;
  const isEditable = useSelector(
    (state: State) => state.editableCell === cellId
  );
  // storing previous value to rollback to it if the request to change
  // the value is wrong and a server error is thrown
  const [previousValue, setPreviousValue] = useState(props.value);
  const [value, setValue] = useState(previousValue);

  const { alias, id } = props.row.original;

  useEffect(() => {
    setPreviousValue(props.value);
  }, [props.value]);

  useEffect(() => {
    setValue(previousValue);
  }, [previousValue]);

  useEffect(() => {
    if (!isEditable) {
      setValue(previousValue); // focus loss rollback
    }
  }, [isEditable]);

  const updateUrl = async () => {
    if (value !== previousValue) {
      const response = await editUrl({
        url: value,
        alias
      });
      const result = await response.json();
      if (response.ok) {
        setPreviousValue(result.url);
        toast(messages.success);
      } else {
        setValue(previousValue); // error rollback
        toast.error(result.message);
      }
    }
    dispatch(resetEditableCell());
  };

  const removeUrl = async () => {
    const response = await deleteUrl(id);
    if (response.ok) {
      toast(messages.success);
    } else {
      const result = await response.json();
      toast.error(result.message);
    }
    dispatch(resetEditableCell());
  };

  return (
    <div onDoubleClick={e => e.stopPropagation()}>
      {isEditable ? (
        <div className="d-flex">
          <input
            type="text"
            className="form-control"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={async e => {
              if (e.key !== "Enter") return;
              await updateUrl();
            }}
          />
          <button className="btn btn-success" onClick={updateUrl}>
            Confirm
          </button>
          <button
            className="btn btn-danger"
            onClick={() => dispatch(resetEditableCell())}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="d-flex">
          <div className="take-space text-wrapper">
            <span>{previousValue}</span>
          </div>
          <button
            className="btn btn-info"
            onClick={() => dispatch(setEditableCell(cellId))}
          >
            Edit
          </button>
          <button className="btn btn-danger" onClick={removeUrl}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
};
