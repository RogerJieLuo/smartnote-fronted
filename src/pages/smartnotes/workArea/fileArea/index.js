import React, { Component } from "react";
import { actionCreators } from "../../common";
import { FileContainer, Title, ContentArea, DeleteButton } from "./style";

import { connect } from "react-redux";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

class FileArea extends Component {
  constructor(props) {
    super(props);
    const id = this.props.file.get("id");
    const title = this.props.file.get("title");
    const content = this.props.file.get("content");

    this.state = { id: id, title: title };
    if (content && this.checkJson(content)) {
      this.state.editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(content))
      );
    } else {
      this.state.editorState = EditorState.createEmpty();
    }
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.updateContent(newState);
      console.log("handled");
      return "handled";
    }
    console.log(" not handled");
    return "not-handled";
  }

  render() {
    return (
      <FileContainer>
        <Title
          value={this.state.title}
          onChange={(e) => this.updateTitle(e.target.value)}
        />

        <DeleteButton
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you wish to delete this item? - " +
                  this.props.file.get("id")
              )
            )
              this.delete(this.props.file.get("id"));
          }}
        >
          X
        </DeleteButton>
        <ContentArea>
          <Editor
            editorState={this.state.editorState}
            onChange={(editorState) => this.updateContent(editorState)}
            handleKeyCommand={this.handleKeyCommand}
          />
        </ContentArea>
      </FileContainer>
    );
  }

  checkJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  updateTag(tag) {
    this.props.updateTag(this.props.file.get("id"), tag);
  }

  updateTitle(title) {
    this.setState({ title: title });
    this.props.updateTitle(this.props.file.get("id"), title);
  }

  updateContent(editorState) {
    // save to data
    if (editorState.getCurrentContent().hasText()) {
      const content = editorState.getCurrentContent();
      this.props.updateContent(
        this.props.file.get("id"),
        JSON.stringify(convertToRaw(content))
      );
    }
    this.setState({ editorState: editorState });
  }

  // function to trigger bold type
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  }

  // re-render the constructor
  componentDidUpdate(prevProps) {
    const newId = this.props.file.get("id");
    const oldId = prevProps.file.get("id");
    if (oldId !== newId) {
      // console.log("newID: " + newId + ", oldId: " + oldId);
      const content = this.props.file.get("content");
      if (content && this.checkJson(content)) {
        this.setState({
          editorState: EditorState.createWithContent(
            convertFromRaw(JSON.parse(content))
          ),
        });
      } else {
        this.setState({
          editorState: EditorState.createEmpty(),
        });
      }
      // console.log("new id?" + this.props.file.get("id"));
      this.setState({
        title: this.props.file.get("title"),
      });
    }
  }

  delete(id) {
    if (id) {
      this.props.delete(id);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    file: state.file.get("file"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getContent(id) {
      dispatch(actionCreators.getContentById(id));
    },
    updateTitle(id, title) {
      dispatch(actionCreators.updateTitleById(id, title));
    },
    updateContent(id, content) {
      dispatch(actionCreators.updateContentById(id, content));
    },
    updateTag(id, tag) {
      dispatch(actionCreators.updateTagById(id, tag));
    },
    delete(id) {
      dispatch(actionCreators.deleteNoteById(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileArea);
