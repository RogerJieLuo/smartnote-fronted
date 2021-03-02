import React, { Component, Fragment } from "react";
import { NoteListContainer, AddButton, NoteItem } from "./style";

import { connect } from "react-redux";
import { actionCreators } from "../../common";

class NoteList extends Component {
  render() {
    return (
      <NoteListContainer>
        <Fragment>
          <AddButton onClick={() => this.addNewNote()}>Add New Note</AddButton>
          {this.props.list.map((it, index) => {
            return (
              <NoteItem key={index} onClick={() => this.select(it.get("id"))}>
                {it.get("title")}
              </NoteItem>
            );
          })}
        </Fragment>
      </NoteListContainer>
    );
  }

  componentDidMount() {
    this.props.getList();
  }

  addNewNote() {
    this.props.addNote();
  }

  select(id) {
    console.log("id: " + id);
    this.props.selectNote(id);
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list.get("list"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNote() {
      dispatch(actionCreators.addNewNote());
    },
    getList() {
      dispatch(actionCreators.getList());
    },
    selectNote(id) {
      dispatch(actionCreators.getContentById(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
