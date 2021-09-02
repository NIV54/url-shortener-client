import React from "react";

import { NewShortURL } from "../../components/forms/new-short-url/NewShortURL";
import { ManageURLs } from "../../components/manage-urls/ManageURLs";
import { Navbar } from "../../components/navbar/Navbar";

export const Home = () => (
  <main>
    <Navbar />
    <br />
    <NewShortURL />
    <br />
    <ManageURLs />
  </main>
);
