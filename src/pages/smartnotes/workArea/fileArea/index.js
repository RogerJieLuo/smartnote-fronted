import React, { Component } from "react";
import { actionCreators } from "../../common";
import { FileContainer, ContentArea, CustomLink } from "./style";

import { connect } from "react-redux";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
} from "draft-js";

class FileArea extends Component {
  constructor(props) {
    super(props);

    const content = this.props.file.get("content");
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ]);

    this.state = { showURLInput: false, urlValue: "" };
    if (content && this.checkJson(content)) {
      this.state.editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(content)),
        decorator
      );
    } else {
      this.state.editorState = EditorState.createEmpty(decorator);
    }
    this.handleKeyCommand = this.handleKeyCommand.bind(this);

    this.onChange = (editorState) => this.setState({ editorState });
    this.promptForLink = this._promptForLink.bind(this);
    this.onURLChange = (e) => this.setState({ urlValue: e.target.value });
    this.confirmLink = this._confirmLink.bind(this);
    this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
    this.removeLink = this._removeLink.bind(this);
  }

  _promptForLink(e) {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = "";
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      this.setState({
        showURLInput: true,
        urlValue: url,
      });
    }
  }

  _confirmLink(e) {
    // e.preventDefault();
    const { editorState, urlValue } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: urlValue }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    this.setState({
      editorState: RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ),
      showURLInput: false,
      urlValue: "",
    });
    if (urlValue === "") {
      this.removeLink(e);
    }
  }

  _onLinkInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmLink(e);
    }
  }

  _removeLink(e) {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null),
      });
    }
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
    let urlInput;
    if (this.state.showURLInput) {
      urlInput = (
        <div>
          <input
            onChange={this.onURLChange}
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onLinkInputKeyDown}
          />
          <button onMouseDown={this.confirmLink}>Confirm</button>
        </div>
      );
    }

    return (
      <FileContainer>
        <div>
          <button onMouseDown={this.promptForLink}>Add Link</button>
        </div>
        {urlInput}
        <ContentArea>
          <Editor
            editorState={this.state.editorState}
            onChange={(editorState) => this.updateContent(editorState)}
            handleKeyCommand={this.handleKeyCommand}
            placeholder="Enter some text..."
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

  updateContent(editorState) {
    const content = editorState.getCurrentContent();
    this.props.updateContent(
      this.props.file.get("id"),
      JSON.stringify(convertToRaw(content))
    );
    this.setState({ editorState: editorState });
  }

  // function to trigger bold type
  // _onBoldClick() {
  //   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  // }

  // re-render the constructor
  componentDidUpdate(prevProps) {
    const newId = this.props.file.get("id");
    const oldId = prevProps.file.get("id");
    if (oldId !== newId) {
      console.log("id changed");
      const decorator = new CompositeDecorator([
        {
          strategy: findLinkEntities,
          component: Link,
        },
      ]);
      const content = this.props.file.get("content");

      if (content && this.checkJson(content)) {
        let editorState = EditorState.createWithContent(
          convertFromRaw(JSON.parse(content), decorator)
        );

        editorState = EditorState.set(editorState, { decorator: decorator });
        this.setState({
          editorState: editorState,
        });
      } else {
        // in case the content in the db is not the right format
        this.setState({
          editorState: EditorState.createEmpty(decorator),
        });
      }
      this.setState({
        showURLInput: false,
        urlValue: "",
      });
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
    updateContent(id, content) {
      dispatch(actionCreators.updateContentById(id, content));
    },
    updateTag(id, tag) {
      dispatch(actionCreators.updateTagById(id, tag));
    },
  };
};

function findLinkEntities(contentBlock, callback, contentState) {
  console.log("...");
  contentBlock.findEntityRanges((character) => {
    console.log("find link");
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
}

const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return <CustomLink href={url}>{props.children}</CustomLink>;
};

export default connect(mapStateToProps, mapDispatchToProps)(FileArea);
