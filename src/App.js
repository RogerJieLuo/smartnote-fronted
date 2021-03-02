import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./route";
import GlobalStyle from "./globalStyle";

function App() {
  return (
    <Fragment>
      <GlobalStyle />

      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
