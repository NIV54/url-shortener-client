import React, { PropsWithChildren } from "react";

import Icon from "../../../../assets/icon.png";

import "../styles/auth-form.scss";
import "../styles/animations.scss";

interface AuthFormWrapperProps {
  title: string;
  onSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
}

export const AuthFormWrapper = ({
  children,
  title,
  onSubmit
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
    </form>
  </div>
);
