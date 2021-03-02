import React, { Component } from "react";
import { actionCreators } from "../../common";
import { FileContainer, Title, ContentArea } from "./style";

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

    this.state = {};
    const content = this.props.file.get("content");
    if (content) {
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
        <Title onChange={(e) => this.updateTitle(e.target.innerHtml)}>
          {this.props.file.get("title")}
        </Title>
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

  updateTitle(title) {
    this.props.updateTitle(this.props.file.get("id"), title);
  }

  updateContent(editorState) {
    // save to data
    if (editorState.getCurrentContent().hasText()) {
      const content = editorState.getCurrentContent();
      this.props.update(
        this.props.file.get("id"),
        JSON.stringify(convertToRaw(content))
      );
    }
    this.setState({ editorState });
  }

  // function to trigger bold type
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  }

  componentDidUpdate(prevProps) {
    const newId = this.props.file.get("id");
    const oldId = prevProps.file.get("id");
    if (oldId !== newId) {
      console.log("newID: " + newId + ", oldId: " + oldId);
      const content = this.props.file.get("content");
      console.log("new content: " + content);
      if (content) {
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
      dispatch(actionCreators.updateTagById(id, title));
    },
    update(id, content) {
      dispatch(actionCreators.updateContentById(id, content));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileArea);
