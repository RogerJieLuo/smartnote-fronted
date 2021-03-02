import { constants } from "../../common";
import { fromJS } from "immutable";

const defaultFileContent = fromJS({
  file: {},
  // id: 0,
  // title: "Title A",
  // content: "content A",
  // tag: "tag A",
});

// '{"blocks":[{"key":"b2abh","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
export default (state = defaultFileContent, action) => {
  if (action.type === constants.ADD_NEW_NOTE) {
    const file = { id: action.id, content: "", title: "", tag: "" };
    return state.set("file", file);
  }

  if (action.type === constants.GET_CONTENT_BY_ID) {
    const file = action.data;
    return state.set("file", file);
  }

  if (action.type === constants.UPDATE_CONTENT_BY_ID) {
    const content = action.content;
    console.log("update: " + content);
    return state.set("content", content);
  }

  if (action.type === constants.UPDATE_TITLE_BY_ID) {
    const title = action.title;
    console.log(title);
    state.set("title", title);
  }

  if (action.type === constants.UPDATE_TAG_BY_ID) {
    const tag = action.tag;
    console.log(tag);
    state.set("title", tag);
  }

  return state;
};
