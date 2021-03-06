import React, { Component, Fragment } from "react";
import { NoteListContainer, AddButton, NoteItem, SelectedItem } from "./style";

import { connect } from "react-redux";
import { actionCreators } from "../../common";

class NoteList extends Component {
  render() {
    return (
      <NoteListContainer>
        <Fragment>
          <AddButton onClick={() => this.addNewNote()}>Add New Note</AddButton>
          {this.props.list.map((it, index) => {
            const id = it.get("id");
            if (this.props.selectedId === id) {
              return (
                <SelectedItem key={index} onClick={() => this.select(id)}>
                  {it.get("title")}
                </SelectedItem>
              );
            } else {
              return (
                <NoteItem key={index} onClick={() => this.select(id)}>
                  {it.get("title")}
                </NoteItem>
              );
            }
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
    this.props.selectNote(id);
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list.get("list"),
    selectedId: state.list.get("selectedId"),
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
