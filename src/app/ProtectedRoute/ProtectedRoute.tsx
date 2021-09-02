import cookies from "js-cookie";
import React, { PropsWithChildren } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import * as routes from "../../common/routes";

export const ProtectedRoute = ({ children, ...rest }: PropsWithChildren<RouteProps>) => (
  <Route
    {...rest}
    render={({ location }) =>
      cookies.get("refreshToken") ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: routes.LOGIN,
            state: { from: location }
          }}
        />
      )
    }
  />
);
