import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { logoutUser } from "../../common/api/users";
import * as routes from "../../common/routes";
import * as messages from "../../common/user-messages";
import { State } from "../../store";
import { getLoggedInUser } from "../../store/user/slice";

type NavItem = typeof routes[keyof typeof routes];

export const Navbar = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user);

  const [activeNavItem, setActiveNavItem] = useState<NavItem>("/");
  useEffect(() => {
    setActiveNavItem(location.pathname as NavItem);
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, []);

  const isActive = (navItem: NavItem) => navItem === activeNavItem;

  const history = useHistory();

  const onLogout = async () => {
    const response = await logoutUser();
    if (response.ok) {
      toast(messages.logout);
      history.push(routes.LOGIN);
    } else {
      const result = await response.json();
      toast.error(result.message);
    }
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div>
          <span className="navbar-text p-0">
            <Link className="nav-link" to={""} onClick={onLogout}>
              Logout
            </Link>
          </span>
          {user && (
            <>
              <span className="navbar-text p-0">|</span>
              <span className="navbar-text p-0">
                <Link className="nav-link" to={""} onClick={onLogout}>
                  Hey 👋, {user.username}
                </Link>
              </span>
            </>
          )}
        </div>
        <ul className="navbar-nav ml-auto">
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
      </div>
    </nav>
  );
};
