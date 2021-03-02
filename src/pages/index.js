import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class Main extends Component {
  render() {
    return (
      <Fragment>
        <Link to="/smartnote">Smart note</Link>
      </Fragment>
    );
  }
}
export default Main;
