import React, { PropsWithChildren } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import cookies from "js-cookie";

export const ProtectedRoute = ({
  children,
  ...rest
}: PropsWithChildren<RouteProps>) => (
  <Route
    {...rest}
    render={({ location }) => {
      return cookies.get("refreshToken") ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location }
          }}
        />
      );
    }}
  />
);
