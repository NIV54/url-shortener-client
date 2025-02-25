import "../common/styles/animations.scss";
import "./Login.scss";

import React, { useState } from "react";
import { Eye, EyeFill } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../../../common/api/users";
import * as routes from "../../../common/routes";
import { Login as LoginFields } from "../../../common/types/Login.type";
import * as messages from "../../../common/user-messages";
import { guestLogin, setLoggedInUser } from "../../../store/user/slice";
import { classes } from "../../utils/classes";
import { LocationState } from "../../utils/types/LocationState.type";
import { Maybe } from "../../utils/types/Maybe.type";
import { AuthFormWrapper } from "../common/AuthFormWrapper/AuthFormWrapper";
import { Redirect } from "../common/Redirect/Redirect";

export const Login = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm<LoginFields>({
    mode: "onSubmit"
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const history = useHistory();
  const location = useLocation<Maybe<LocationState>>();

  const onSubmit = async (values: LoginFields) => {
    const response = await loginUser(values);
    const result = await response.json();
    if (response.ok) {
      dispatch(setLoggedInUser(result.user));
      toast(messages.welcome);
      history.push(location.state?.from.pathname || routes.HOME);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <AuthFormWrapper
      title="Please sign in"
      SubmitButtonText="Sign in"
      onSubmit={handleSubmit(onSubmit)}
      lastFade={4}
      redirect={
        <>
          <Redirect to={routes.SIGN_UP} displayText="Sign up">
            <span>Don't have an account?</span>
          </Redirect>
          <br />
          <Redirect
            to={routes.HOME}
            displayText="Sign in as guest"
            linkProps={{
              onClick: () => {
                dispatch(guestLogin());
              }
            }}
          >
            <span>Don't want to sign in?</span>
          </Redirect>
        </>
      }
    >
      <input
        type="text"
        className={classes({ "is-invalid": errors.usernameOrEmail }, "form-control fadeIn-3")}
        name="usernameOrEmail"
        placeholder="Username/Email"
        required
        autoFocus
        autoComplete={"off"}
        ref={register({ required: true })}
      />
      <input
        type={passwordVisible ? "text" : "password"}
        className={classes(
          {
            "is-invalid": errors.password
          },
          "form-control last-input fadeIn-4"
        )}
        name="password"
        placeholder="Password"
        required
        autoComplete={"off"}
        ref={register({ required: true })}
      />
      <span
        className="field-icon fadeIn-4"
        onClick={() => setPasswordVisible(passwordVisible => !passwordVisible)}
      >
        {passwordVisible ? <Eye /> : <EyeFill />}
      </span>
    </AuthFormWrapper>
  );
};
