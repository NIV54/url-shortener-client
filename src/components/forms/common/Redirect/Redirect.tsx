import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import * as routes from "../../../../common/routes";

interface RedirectProps {
  displayText: string;
  to: typeof routes[keyof typeof routes];
  linkProps?: Partial<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
}

export const Redirect = ({
  displayText,
  to,
  children,
  linkProps = {}
}: PropsWithChildren<RedirectProps>) => (
  <>
    {children}
    <Link {...linkProps} to={to}>
      {" "}
      {displayText}
    </Link>
  </>
);
