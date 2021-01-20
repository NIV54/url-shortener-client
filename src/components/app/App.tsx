import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import { NewShortURL } from "../forms/new-short-url/NewShortURL";
import { SignUp } from "../forms/sign-up/SignUp";
import { Login } from "../forms/login/Login";
import { ManageURLs } from "../manage-urls/ManageURLs";
import { store } from "../../store";
import * as routes from "../common/routes";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.SIGN_UP}>
            <SignUp />
          </Route>
          <Route exact path={routes.LOGIN}>
            <Login />
          </Route>
          <Route exact path={routes.HOME}>
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
