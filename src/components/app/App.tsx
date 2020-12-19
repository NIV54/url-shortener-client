import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import { NewShortURL } from "../forms/new-short-url/NewShortURL";
import { ManageURLs } from "../manage-urls/ManageURLs";
import { store } from "../../store";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NewShortURL />
        <br />
        <ManageURLs />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          pauseOnFocusLoss={false}
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
