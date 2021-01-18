import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { loginUser } from "../../../common/api/users";
import { Login as LoginFields } from "../../../common/types/Login.type";
import * as messages from "../../../common/user-messages";
import { isInvalid } from "../utils/is-invalid";

import Icon from "../../../assets/icon.png";

import "../auth-form.scss";
import "../animations.scss";

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
      <form className="auth-form fadeInDown" onSubmit={handleSubmit(onSubmit)}>
        <img
          className="mb-4 fadeIn-1"
          src={Icon}
          alt="Logo should be here..."
          height="144"
          width="144"
        />
        <h1 className="h3 mb-2 font-weight-normal fadeIn-2">Please sign in</h1>
        <div className="card-body">
          {/* TODO: make this email/username field */}
          <input
            type="text"
            className={`form-control fadeIn-3 ${isInvalid(errors.email)}`}
            name="email"
            placeholder="Email"
            required
            autoFocus
            autoComplete={"off"}
            ref={register({ required: true })}
          />
          <input
            type="text"
            className={`form-control last-input fadeIn-4 ${isInvalid(
              errors.password
            )}`}
            name="password"
            placeholder="Password"
            required
            autoComplete={"off"}
            ref={register({ required: true })}
          />
          <input
            type="checkbox"
            className="mb-4 mr-1 fadeIn-5"
            name="remember"
          />
          <label htmlFor="remember" className="fadeIn-5">
            Remember me
          </label>
          <input
            type="submit"
            className="btn btn-primary btn-lg btn-block fadeIn-6"
            value="Sign In"
          />
          <p className="mt-5 mb-3 text-muted fadeIn-7">
            © {new Date().getFullYear()}
          </p>
        </div>
      </form>
    </div>
  );
};
