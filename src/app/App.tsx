import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import * as routes from "../common/routes";
import { Login } from "../components/forms/login/Login";
import { NewShortURL } from "../components/forms/new-short-url/NewShortURL";
import { SignUp } from "../components/forms/sign-up/SignUp";
import { ManageURLs } from "../components/manage-urls/ManageURLs";
import { Navbar } from "../components/navbar/Navbar";
import { store } from "../store";

import { SEO } from "./SEO/SEO";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
              <main>
                <Navbar />
                <br />
                <NewShortURL />
                <br />
                <ManageURLs />
              </main>
            </Route>
          </Switch>
          <ToastContainer position="bottom-right" autoClose={3000} pauseOnFocusLoss={false} />
        </BrowserRouter>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
