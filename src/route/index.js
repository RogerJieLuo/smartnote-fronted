import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import SmartNote from "../pages/smartnotes";
import Main from "../pages";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/smartnote" exact component={SmartNote} />

        <Redirect to={"/"} />
      </Switch>
    );
  }
}

export default Routes;
