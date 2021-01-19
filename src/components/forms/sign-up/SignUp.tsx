import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { registerUser } from "../../../common/api/users";
import { Register } from "../../../common/types/Register.type";
import * as messages from "../../../common/user-messages";
import { AuthFormWrapper } from "../common/AuthFormWrapper/AuthFormWrapper";
import { isInvalid } from "../common/utils/is-invalid";

export const SignUp = () => {
  const { register, handleSubmit, errors } = useForm<Register>({
    mode: "onSubmit"
  });

  const onSubmit = async (values: Register) => {
    const response = await registerUser(values);
    const result = await response.json();
    if (response.ok) {
      toast(messages.success);
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
        className={`form-control fadeIn-4 ${isInvalid(errors.username)}`}
        name="username"
        placeholder="Username"
        autoFocus
        autoComplete={"off"}
        ref={register({ required: true })}
      />
      <input
        type="text"
        className={`form-control fadeIn-5 last-input ${isInvalid(
          errors.password
        )}`}
        name="password"
        placeholder="Password"
        autoFocus
        autoComplete={"off"}
        ref={register({ required: true })}
      />
    </AuthFormWrapper>
  );
};
