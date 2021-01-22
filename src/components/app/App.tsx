import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { store } from "../../store";
import * as routes from "../common/routes";
import { Login } from "../forms/login/Login";
import { NewShortURL } from "../forms/new-short-url/NewShortURL";
import { SignUp } from "../forms/sign-up/SignUp";
import { ManageURLs } from "../manage-urls/ManageURLs";

import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute";

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
          <ProtectedRoute exact path={routes.HOME}>
            <NewShortURL />
            <br />
            <ManageURLs />
          </ProtectedRoute>
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
