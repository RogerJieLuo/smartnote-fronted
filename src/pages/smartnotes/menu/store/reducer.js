import { constants } from "../../common";
import { fromJS } from "immutable";

const defaultFileContent = fromJS({
  list: [
    // { id: 1, title: "t a" },
    // { id: 2, title: "t b" },
  ],
});

export default (state = defaultFileContent, action) => {
  if (action.type === constants.GET_LIST) {
    // console.log("data: " + action.data);
    // return here, otherwise the data will be the default values
    return state.set("list", action.data);
  }

  return state;
};
