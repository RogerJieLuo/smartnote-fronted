import React, { Component } from "react";
import { connect } from "react-redux";

import { actionCreators } from "../../common";
import { AddButton } from "./style";

class NewNote extends Component {
  render() {
    return (
      <AddButton onClick={() => this.addNewNote()}>Add New Note</AddButton>
    );
  }

  addNewNote() {
    this.props.addNote();
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNote() {
      dispatch(actionCreators.addNewNote());
    },
  };
};

export default connect(null, mapDispatchToProps)(NewNote);
