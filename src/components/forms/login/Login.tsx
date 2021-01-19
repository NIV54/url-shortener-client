import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { loginUser } from "../../../common/api/users";
import { Login as LoginFields } from "../../../common/types/Login.type";
import * as messages from "../../../common/user-messages";
import { isInvalid } from "../common/utils/is-invalid";
import { AuthFormWrapper } from "../common/AuthFormWrapper/AuthFormWrapper";

import "../common/styles/animations.scss";

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
    <AuthFormWrapper
      title="Please sign in"
      SubmitButtonText="Sign in"
      onSubmit={handleSubmit(onSubmit)}
    >
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
      <input type="checkbox" className="mb-4 mr-1 fadeIn-5" name="remember" />
      <label htmlFor="remember" className="fadeIn-5">
        Remember me
      </label>
    </AuthFormWrapper>
  );
};
