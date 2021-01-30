import "../styles/animations.scss";
import "../styles/auth-form.scss";

import React, { PropsWithChildren } from "react";

import Icon from "../../../../assets/icon.png";

interface AuthFormWrapperProps {
  title: string;
  lastFade: number;
  SubmitButtonText?: string;
  onSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
  redirect?: JSX.Element;
}

export const AuthFormWrapper = ({
  children,
  title,
  lastFade,
  SubmitButtonText = "Submit",
  onSubmit,
  redirect
}: PropsWithChildren<AuthFormWrapperProps>) => (
  <div className="h-100 content-center text-center">
    <form className="auth-form fadeInDown" onSubmit={onSubmit}>
      <img
        className="mb-4 fadeIn-1"
        src={Icon}
        alt="Logo should be here..."
        height="144"
        width="144"
      />
      <h1 className="h3 mb-2 font-weight-normal fadeIn-2">{title}</h1>
      <div className="card-body">{children}</div>
      <input
        type="submit"
        className={`btn btn-primary btn-lg btn-block fadeIn-${lastFade + 1}`}
        value={SubmitButtonText}
      />
      <div className={`mt-2 fadeIn-${lastFade + 2}`}>{redirect}</div>
      <p className={`mt-5 mb-3 text-muted fadeIn-${lastFade + 3}`}>© {new Date().getFullYear()}</p>
    </form>
  </div>
);
