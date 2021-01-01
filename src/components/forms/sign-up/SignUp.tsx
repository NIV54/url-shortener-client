import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { registerUser } from "../../../common/api/users";
import { Register } from "../../../common/types/Register.type";
import * as messages from "../../../common/user-messages";
import { RequiredField } from "../errors/RequiredField";

export const SignUp = () => {
  const { register, handleSubmit, errors } = useForm<Register>({
    mode: "onSubmit"
  });

  const onSubmit = async (values: Register) => {
    const response = await registerUser(values);
    console.log(response);
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      toast(messages.success);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
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
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          name="username"
          ref={register({ required: true })}
        />
      </div>
      {errors.username && <RequiredField />}
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
