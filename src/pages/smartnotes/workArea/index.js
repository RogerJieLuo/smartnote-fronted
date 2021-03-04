import React, { Component, Fragment } from "react";
import { WorkAreaContainer } from "./style";
import { connect } from "react-redux";

import FileArea from "./fileArea";
import Tools from "./tools";

class WorkArea extends Component {
  constructor(props) {
    super(props);
    this.state = { id: this.props.file.get("id") };
  }
  render() {
    let noteContent;
    const id = this.props.file.get("id");
    if (id) {
      noteContent = <FileArea id={id} />;
    } else {
      noteContent = <div />;
    }
    return (
      <Fragment>
        <WorkAreaContainer>
          <Tools />
          {noteContent}
        </WorkAreaContainer>
      </Fragment>
    );
  }

  componentDidUpdate(prevProps) {
    const newId = this.props.file.get("id");
    const oldId = prevProps.file.get("id");
    if (oldId !== newId) {
      this.setState({
        id: this.props.file.get("id"),
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    file: state.file.get("file"),
  };
};

export default connect(mapStateToProps, null)(WorkArea);
