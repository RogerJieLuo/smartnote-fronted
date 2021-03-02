import React, { Component, Fragment } from "react";

import { Provider } from "react-redux";
import store from "./store";

import NoteMenu from "./menu";
import WorkArea from "./workArea";

import { TopBar } from "../../commonStyle";
import { MainContainer } from "./style";

class SmartNote extends Component {
  render() {
    return (
      <Fragment>
        <TopBar>Smart Note</TopBar>
        <MainContainer>
          <Provider store={store}>
            <NoteMenu />
            <WorkArea />
          </Provider>
        </MainContainer>
      </Fragment>
    );
  }
}

export default SmartNote;
