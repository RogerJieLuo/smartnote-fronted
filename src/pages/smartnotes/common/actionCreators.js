import * as constants from "./constants";
import { fromJS } from "immutable";
import axios from "axios";

export const addNewNote = () => {
  return (dispatch) => {
    axios
      .post("/api/note/new", {})
      .then((res) => {
        // const newData = { id: res.data.id };
        list(dispatch);
        getCon(dispatch, res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const changeList = (data) => ({
  type: constants.GET_LIST,
  data: fromJS(data),
});

export const getList = () => {
  // type: constants.GET_LIST,
  return (dispatch) => {
    // axios
    //   .get("/api/note/list")
    //   .then((res) => {
    //     const data = res.data;
    //     dispatch(changeList(data.data));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    list(dispatch);
  };
};

const list = (dispatch) => {
  axios
    .get("/api/note/list")
    .then((res) => {
      const data = res.data;
      dispatch(changeList(data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getContentById = (id) => {
  // type: constants.GET_LIST,
  return (dispatch) => {
    // axios
    //   .get("/api/note/get?id=" + id)
    //   .then((res) => {
    //     const data = res.data;
    //     console.log("getting from ajax: " + res.data);
    //     dispatch(getContent(data.data));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    getCon(dispatch, id);
  };
};

const getCon = (dispatch, id) => {
  axios
    .get("/api/note/get?id=" + id)
    .then((res) => {
      const data = res.data;
      // console.log("getting from ajax: " + res.data);
      dispatch(getContent(data.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const getContent = (data) => ({
  type: constants.GET_CONTENT_BY_ID,
  data: fromJS(data),
});

export const updateContentById = (id, content) => {
  return (dispatch) => {
    axios
      .post("/api/note/update", { id: id, content: content })
      .then((res) => {
        console.log("update from ajax: " + res.data);
        dispatch(updateContent(content));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateContent = (content) => ({
  type: constants.UPDATE_CONTENT_BY_ID,
  content,
});

export const updateTitleById = (id, title) => {
  return (dispatch) => {
    axios
      .post("/api/note/update", { id: id, title: title })
      .then((res) => {
        dispatch(updateContent(title));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateTitle = (title) => ({
  type: constants.UPDATE_TITLE_BY_ID,
  title,
});

export const updateTagById = (id, tag) => ({
  type: constants.UPDATE_TAG_BY_ID,
  id,
  tag,
});
