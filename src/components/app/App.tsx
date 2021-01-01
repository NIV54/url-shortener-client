import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import { NewShortURL } from "../forms/new-short-url/NewShortURL";
import { ManageURLs } from "../manage-urls/ManageURLs";
import { store } from "../../store";

import "react-toastify/dist/ReactToastify.css";
import { SignUp } from "../forms/sign-up/SignUp";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/">
            <NewShortURL />
            <br />
            <ManageURLs />
          </Route>
        </Switch>
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
