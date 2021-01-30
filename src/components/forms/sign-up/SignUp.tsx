import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { registerUser } from "../../../common/api/users";
import * as routes from "../../../common/routes";
import { RegistrationForm } from "../../../common/types/Register.type";
import * as messages from "../../../common/user-messages";
import { classes } from "../../utils/classes";
import { AuthFormWrapper } from "../common/AuthFormWrapper/AuthFormWrapper";

export const SignUp = () => {
  const { register, handleSubmit, errors } = useForm<RegistrationForm>({
    mode: "onChange"
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const history = useHistory();

  const onSubmit = async ({ repeatPassword, ...values }: RegistrationForm) => {
    if (values.password !== repeatPassword) {
      setPasswordMatch(false);
      toast.error(messages.differentPasswords);
      return;
    } else {
      setPasswordMatch(true);
    }
    const response = await registerUser(values);
    const result = await response.json();
    if (response.ok) {
      history.push(routes.LOGIN);
      toast(messages.registerSuccess);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <AuthFormWrapper
      title="Sign up"
      SubmitButtonText="Sign up"
      onSubmit={handleSubmit(onSubmit)}
      lastFade={6}
    >
      <input
        type="email"
        className={classes({ "is-invalid": errors.email }, "form-control fadeIn-3")}
        name="email"
        placeholder="Email"
        required
        autoFocus
        autoComplete={"off"}
        ref={register({ required: true })}
      />
      <input
        type="text"
        className={classes({ "is-invalid": errors.username }, "form-control fadeIn-4")}
        name="username"
        placeholder="Username"
        autoComplete={"off"}
        ref={register({ required: true })}
      />
      <input
        type="password"
        className={classes({ "is-invalid": errors.password }, "form-control fadeIn-5")}
        name="password"
        placeholder="Password"
        autoComplete={"off"}
        ref={register({ required: true })}
      />
      <input
        type="password"
        className={classes({ "is-invalid": !passwordMatch }, "form-control fadeIn-6 last-input")}
        name="repeatPassword"
        placeholder="Repeat Password"
        autoComplete={"off"}
        ref={register({ required: true })}
      />
    </AuthFormWrapper>
  );
};
