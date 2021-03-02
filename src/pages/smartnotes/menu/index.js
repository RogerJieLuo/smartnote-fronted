import React, { Component } from "react";

import { Menu, MenuItem } from "./style";

import { Provider } from "react-redux";
import store from "../store";
// import NewNote from "./newNote";
import NoteList from "./noteList";

class NoteMenu extends Component {
  render() {
    return (
      <Menu>
        <MenuItem>
          <Provider store={store}>
            {/* <NewNote /> */}
            <NoteList />
          </Provider>
        </MenuItem>
      </Menu>
    );
  }
}

export default NoteMenu;
