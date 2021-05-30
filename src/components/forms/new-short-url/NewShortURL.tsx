import "react-toastify/dist/ReactToastify.css";

import { parse } from "qs";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { addUrl, queryKeys } from "../../../common/api/urls";
import { jsonify } from "../../../common/api/utils/jsonify";
import { ShortURL, ShortURLInput } from "../../../common/types/ShortURL.type";
import * as messages from "../../../common/user-messages";
import { classes } from "../../utils/classes";

const addUrlMutationFn = jsonify<ShortURL>(addUrl);

export const NewShortURL = () => {
  const { search } = useLocation();
  const { alias: aliasFromURL }: { alias?: string } = parse(search.slice(1));

  const { register, handleSubmit, errors } = useForm<ShortURLInput>({
    mode: "onSubmit",
    defaultValues: {
      alias: aliasFromURL || ""
    }
  });

  const [alias, setAlias] = useState("");

  const queryClient = useQueryClient();
  const addUrlMutation = useMutation<ShortURL, Error, ShortURLInput>(addUrlMutationFn, {
    onSuccess: result => {
      setAlias(result.alias);
      queryClient.invalidateQueries(queryKeys.OWNED_SHORT_URLS);
      toast(messages.success);
    },
    onError: result => {
      setAlias("");
      toast.error(result.message);
    }
  });

  const onSubmit = (values: ShortURLInput) => addUrlMutation.mutate(values);

  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="url">URL</label>
        <input
          className={classes({ "is-invalid": errors.url }, "form-control")}
          type="text"
          name="url"
          ref={register({ required: true })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="alias">Alias</label>
        <input className="form-control" type="text" name="alias" ref={register()} />
      </div>
      <input type="submit" className="btn btn-primary" />
      {addUrlMutation.isSuccess && (
        <div className="card mt-3">
          <div className="card-body">{alias}</div>
        </div>
      )}
    </form>
  );
};
