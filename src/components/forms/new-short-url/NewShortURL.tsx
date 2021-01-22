import "react-toastify/dist/ReactToastify.css";

import { parse } from "qs";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { addUrl } from "../../../common/api/urls";
import { ShortURL } from "../../../common/types/ShortURL.type";
import * as messages from "../../../common/user-messages";
import { classes } from "../../utils/classes";

export const NewShortURL = () => {
  const { search } = useLocation();
  const { alias: aliasFromURL }: { alias?: string } = parse(search.slice(1));

  const { register, handleSubmit, errors } = useForm<ShortURL>({
    mode: "onSubmit",
    defaultValues: {
      alias: aliasFromURL || ""
    }
  });

  const [alias, setAlias] = useState("");

  const onSubmit = async (values: ShortURL) => {
    const response = await addUrl(values);
    const result = await response.json();
    if (response.ok) {
      setAlias(result.alias);
      toast(messages.success);
    } else {
      setAlias("");
      toast.error(result.message);
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="url">Url</label>
        <input
          className={classes({ "is-invalid": errors.url }, "form-control")}
          type="text"
          name="url"
          ref={register({ required: true })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="alias">Alias</label>
        <input
          className="form-control"
          type="text"
          name="alias"
          ref={register()}
        />
      </div>
      <input type="submit" className="btn btn-primary" />
      {alias && (
        <div className="card mt-3">
          <div className="card-body">{alias}</div>
        </div>
      )}
    </form>
  );
};
