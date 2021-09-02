import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NewShortURL } from "../../components/forms/new-short-url/NewShortURL";
import { ManageURLs } from "../../components/manage-urls/ManageURLs";
import { Navbar } from "../../components/navbar/Navbar";
import { State } from "../../store";
import { getLoggedInUser } from "../../store/user/slice";

export const Home = () => {
  const dispatch = useDispatch();
  const isGuest = useSelector((state: State) => state.user.isGuest);

  useEffect(() => {
    if (!isGuest) {
      dispatch(getLoggedInUser());
    }
  }, [isGuest]);

  if (isGuest) {
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
