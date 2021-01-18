import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { registerUser } from "../../../common/api/users";
import { Register } from "../../../common/types/Register.type";
import * as messages from "../../../common/user-messages";
import { isInvalid } from "../utils/is-invalid";

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
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <div className={`form-group ${isInvalid(errors.email)}`}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          name="email"
          ref={register({ required: true })}
        />
      </div>
      <div className={`form-group ${isInvalid(errors.username)}`}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          name="username"
          ref={register({ required: true })}
        />
      </div>
      <div className={`form-group ${isInvalid(errors.password)}`}>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          className="form-control"
          name="password"
          ref={register({ required: true })}
        />
      </div>
      <input type="submit" className="btn btn-primary" />
    </form>
  );
};
