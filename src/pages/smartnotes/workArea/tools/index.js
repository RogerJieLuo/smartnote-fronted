import React, { Component } from "react";
import { ToolsContainer, ToolItem } from "./style";

class Tools extends Component {
  render() {
    return (
      <ToolsContainer>
        <ToolItem>AT</ToolItem>
        <ToolItem>BT</ToolItem>
        <ToolItem>CT</ToolItem>
      </ToolsContainer>
    );
  }
}

export default Tools;
