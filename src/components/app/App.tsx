import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import * as routes from "../../common/routes";
import { store } from "../../store";
import { Login } from "../forms/login/Login";
import { NewShortURL } from "../forms/new-short-url/NewShortURL";
import { SignUp } from "../forms/sign-up/SignUp";
import { ManageURLs } from "../manage-urls/ManageURLs";
import { Navbar } from "../navbar/Navbar";

import { SEO } from "./SEO/SEO";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.SIGN_UP}>
            <SEO title="Sign up" pathSlug={routes.SIGN_UP} keywords={["sign up"]} />
            <SignUp />
          </Route>
          <Route exact path={routes.LOGIN}>
            <SEO title="Login" pathSlug={routes.LOGIN} keywords={["login"]} />
            <Login />
          </Route>
          <Route exact path={routes.HOME}>
            <SEO title="Home" pathSlug={routes.HOME} />
            <Navbar />
            <NewShortURL />
            <br />
            <ManageURLs />
          </Route>
        </Switch>
        <ToastContainer position="bottom-right" autoClose={3000} pauseOnFocusLoss={false} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
