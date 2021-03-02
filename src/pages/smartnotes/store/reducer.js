import listReducer from "../menu/store/reducer";
import fileReducer from "../workArea/store/reducer";
import { combineReducers } from "redux";

export default combineReducers({
  list: listReducer,
  file: fileReducer,
});
