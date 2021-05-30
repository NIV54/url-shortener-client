import "./EditableCell.scss";

import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { CellProps } from "react-table";
import { toast } from "react-toastify";

import { deleteUrl, editUrl, queryKeys } from "../../../common/api/urls";
import { jsonify } from "../../../common/api/utils/jsonify";
import { ShortURLInput } from "../../../common/types/ShortURL.type";
import * as messages from "../../../common/user-messages";
import { State } from "../../../store";
import { resetEditableCell, setEditableCell } from "../../../store/editable-cell/slice";

const editUrlMutationFn = jsonify<ShortURLInput>(editUrl);
const deleteUrlMutationFn = async (id: number) => {
  const response = await deleteUrl(id);
  if (response.ok) return;
  const result = await response.json();
  throw result;
};

// TODO: refactor - value and previous value
export const EditableCell = (props: CellProps<any, string>) => {
  const dispatch = useDispatch();
  const cellId = useRef(props.cell.getCellProps().key).current as string;
  const isEditable = useSelector((state: State) => state.editableCell === cellId);
  // storing previous value to rollback to it if the request to change
  // the value is wrong and a server error is thrown
  const [previousValue, setPreviousValue] = useState(props.value);
  const [value, setValue] = useState(previousValue);

  const queryClient = useQueryClient();

  const editUrlMutation = useMutation<ShortURLInput, Error, ShortURLInput>(editUrlMutationFn, {
    onSuccess: result => {
      setPreviousValue(result.url);
      queryClient.invalidateQueries(queryKeys.OWNED_SHORT_URLS);
      toast(messages.success);
    },
    onError: result => {
      setValue(previousValue); // error rollback
      toast.error(result.message);
    }
  });

  const deleteUrlMutation = useMutation<void, Error, number>(deleteUrlMutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.OWNED_SHORT_URLS);
      toast(messages.success);
    },
    onError: result => {
      toast.error(result.message);
    }
  });

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
      editUrlMutation.mutate({
        url: value,
        alias
      });
    }
    dispatch(resetEditableCell());
  };

  const removeUrl = () => deleteUrlMutation.mutate(id);

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
          <button className="btn btn-danger" onClick={() => dispatch(resetEditableCell())}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="d-flex">
          <div className="take-space text-wrapper">
            <span>{previousValue}</span>
          </div>
          <button className="btn btn-info" onClick={() => dispatch(setEditableCell(cellId))}>
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
