import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import * as routes from "../../common/routes";

type NavItem = typeof routes[keyof typeof routes];

export const Navbar = () => {
  const location = useLocation();

  const [activeNavItem, setActiveNavItem] = useState<NavItem>("/");
  useEffect(() => {
    setActiveNavItem(location.pathname as NavItem);
  }, [location.pathname]);

  const isActive = (navItem: NavItem) => navItem === activeNavItem;

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className={"nav-item"}>
            <Link className={`nav-link ${isActive(routes.HOME) ? "active" : ""}`} to={routes.HOME}>
              Home
            </Link>
          </li>
          <li className={`nav-item ${isActive(routes.LOGIN) ? "active" : ""}`}>
            <Link className="nav-link" to={routes.LOGIN}>
              Switch User
            </Link>
          </li>
        </ul>
        <span className="navbar-text p-0">
          <Link className="nav-link" to={""}>
            Logout
          </Link>
        </span>
      </div>
    </nav>
  );
};
