import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NewShortURL } from "../../components/forms/new-short-url/NewShortURL";
import { ManageURLs } from "../../components/manage-urls/ManageURLs";
import { Navbar } from "../../components/navbar/Navbar";
import { State } from "../../store";
import { getLoggedInUser } from "../../store/user/slice";

export const Home = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: State) => state.user);

  useEffect(() => {
    if (!userState.isGuest && userState.user === null) {
      dispatch(getLoggedInUser());
    }
  }, [userState.isGuest]);

  if (userState.isGuest) {
    return <NewShortURL />;
  }

  return (
    <main>
      <Navbar />
      <br />
      <NewShortURL />
      <br />
      <ManageURLs />
    </main>
  );
};
