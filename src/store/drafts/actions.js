import * as types from "./constants";
// import store from "../store";

export const doSaveDraft = (payload) => {
  // const drafts = store.draftReducers.drafts;

  // console.log(drafts);

  return {
    type: types.SAVE_DRAFT,
    payload: payload,
  };
};

export const doDeleteAllDrafts = (payload) => {
  return {
    type: types.RESET_DRAFT,
    payload: payload,
  };
};

export const doDeleteDraft = (payload) => {
  return {
    type: types.DELETE_DRAFT,
    payload: payload,
  };
};
