import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { loginUser } from "../../../common/api/users";
import { Login as LoginFields } from "../../../common/types/Login.type";
import * as messages from "../../../common/user-messages";
import { RequiredField } from "../errors/RequiredField";

import Icon from "../../../assets/icon.png";

import "./Login.scss";

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
    <div className="h-100 content-center text-center">
      <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
        <img
          className="mb-4"
          src={Icon}
          alt="Logo should be here..."
          height="144"
          width="144"
        />
        <h1 className="h3 mb-2 font-weight-normal">Please sign in</h1>
        <div className="card-body">
          {/* TODO: make this email/username field */}
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Email"
            required
            autoFocus
            autoComplete={"off"}
            ref={register({ required: true })}
          />
          {errors.email && <RequiredField />}
          <input
            type="text"
            className="form-control"
            name="password"
            placeholder="Password"
            required
            autoComplete={"off"}
            ref={register({ required: true })}
          />
          {errors.password && <RequiredField />}
          <input type="checkbox" className="mb-4 mr-1" name="remember" />
          <label htmlFor="remember">Remember me</label>
          <input
            type="submit"
            className="btn btn-primary btn-lg btn-block"
            value="Sign In"
          />
          <p className="mt-5 mb-3 text-muted">© {new Date().getFullYear()}</p>
        </div>
      </form>
    </div>
  );
};
