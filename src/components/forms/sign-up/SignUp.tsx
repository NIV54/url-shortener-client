import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { registerUser } from "../../../common/api/users";
import { Register } from "../../../common/types/Register.type";
import * as messages from "../../../common/user-messages";
import { AuthFormWrapper } from "../common/AuthFormWrapper/AuthFormWrapper";
import * as routes from "../../common/routes";
import { useHistory } from "react-router-dom";
import { classes } from "../../utils/classes";

export const SignUp = () => {
  const { register, handleSubmit, errors } = useForm<Register>({
    mode: "onSubmit"
  });

  const history = useHistory();

  const onSubmit = async (values: Register) => {
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
    >
      <input
        type="email"
        className={classes(
          { "is-invalid": errors.email },
          "form-control fadeIn-3"
        )}
        name="email"
        placeholder="Email"
        required
        autoFocus
        autoComplete={"off"}
        ref={register({ required: true })}
      />
      <input
        type="text"
        className={classes(
          { "is-invalid": errors.username },
          "form-control fadeIn-4"
        )}
        name="username"
        placeholder="Username"
        autoFocus
        autoComplete={"off"}
        ref={register({ required: true })}
      />
      <input
        type="password"
        className={classes(
          { "is-invalid": errors.password },
          "form-control fadeIn-5 last-input"
        )}
        name="password"
        placeholder="Password"
        autoFocus
        autoComplete={"off"}
        ref={register({ required: true })}
      />
    </AuthFormWrapper>
  );
};
