import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { loginUser } from "../../../common/api/users";
import { Login as LoginFields } from "../../../common/types/Login.type";
import * as messages from "../../../common/user-messages";
import { RequiredField } from "../errors/RequiredField";

export const Login = () => {
  const { register, handleSubmit, errors } = useForm<LoginFields>({
    mode: "onSubmit"
  });

  const onSubmit = async (values: LoginFields) => {
    const response = await loginUser(values);
    const result = await response.json();
    if (response.ok) {
      toast(messages.success);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        {/* TODO: make this email/username field */}
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          name="email"
          ref={register({ required: true })}
        />
      </div>
      {errors.email && <RequiredField />}
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="text"
          className="form-control"
          name="password"
          ref={register({ required: true })}
        />
      </div>
      {errors.password && <RequiredField />}
      <input type="submit" className="btn btn-primary" />
    </form>
  );
};
