import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Title, DeleteButton } from "./style";
import { actionCreators } from "../../common";

class TitleHeader extends Component {
  constructor(props) {
    super(props);
    const title = this.props.file.get("title");
    this.state = { title: title };
  }

  render() {
    return (
      <Fragment>
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
        <Title
          value={this.state.title}
          onChange={(e) => this.updateTitle(e.target.value)}
        />
      </Fragment>
    );
  }

  updateTitle(title) {
    this.setState({ title: title });
    this.props.updateTitle(this.props.file.get("id"), title);
  }

  delete(id) {
    if (id) {
      this.props.delete(id);
    }
  }

  componentDidUpdate(prevProps) {
    const newId = this.props.file.get("id");
    const oldId = prevProps.file.get("id");
    if (oldId !== newId) {
      this.setState({
        title: this.props.file.get("title"),
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
    updateTitle(id, title) {
      dispatch(actionCreators.updateTitleById(id, title));
    },
    delete(id) {
      dispatch(actionCreators.deleteNoteById(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TitleHeader);
