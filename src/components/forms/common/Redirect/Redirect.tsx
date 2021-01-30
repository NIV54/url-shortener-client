import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import * as routes from "../../../../common/routes";

interface RedirectProps {
  displayText: string;
  to: typeof routes[keyof typeof routes];
}

export const Redirect = ({ displayText, to, children }: PropsWithChildren<RedirectProps>) => (
  <>
    {children}
    <Link to={to}> {displayText}</Link>
  </>
);
