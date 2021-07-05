import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./route";
import GlobalStyle from "./globalStyle";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {
  return (
    <Fragment>
      <GlobalStyle />

      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <AmplifySignOut />
    </Fragment>
  );
}

export default withAuthenticator(App);
