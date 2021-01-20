import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import { loginUser } from "../../../common/api/users";
import { Login as LoginFields } from "../../../common/types/Login.type";
import * as messages from "../../../common/user-messages";
import { AuthFormWrapper } from "../common/AuthFormWrapper/AuthFormWrapper";
import * as routes from "../../common/routes";

import "../common/styles/animations.scss";
import { classes } from "../../utils/classes";

export const Login = () => {
  const { register, handleSubmit, errors } = useForm<LoginFields>({
    mode: "onSubmit"
  });
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const history = useHistory();

  const onSubmit = async (values: LoginFields) => {
    const response = await loginUser(values);
    const result = await response.json();
    if (response.ok) {
      toast(messages.welcome);
      history.push(routes.HOME);
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
      <input
        type="text"
        className={classes(
          { "is-invalid": errors.usernameOrEmail },
          "form-control fadeIn-3"
        )}
        name="usernameOrEmail"
        placeholder="Username/Email"
        required
        autoFocus
        autoComplete={"off"}
        ref={register({ required: true })}
      />
      <input
        type="password"
        className={classes(
          { "is-invalid": errors.password },
          "form-control last-input fadeIn-4"
        )}
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
        checked={rememberMe}
        onChange={() => setRememberMe(rememberMe => !rememberMe)}
      />
      <label htmlFor="remember" className="fadeIn-5">
        Remember me
      </label>
    </AuthFormWrapper>
  );
};
