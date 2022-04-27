/* eslint-disable prettier/prettier */
import * as types from "./constants";
import { act } from "react-test-renderer";
import update from "immutability-helper";

const initialState = {
  drafts: [],
};

export default draftReducer = (state = initialState, action) => {
  // console.log(action)

  switch (action.type) {
    case types.SAVE_DRAFT:
      const newDraft = {
        draftId: action.payload.draftId,
        draftDate: action.payload.draftDate,
        image: action.payload.image,
        recreatedFrom: action.payload.recipeId,
        title: action.payload.title,
        time: action.payload.total_hours_to_make,
        total_hours_to_make: action.payload.total_hours_to_make,
        description: action.payload.description,
        rating: action.payload.rating,
        section: action.payload.section,
        serving_size: action.payload.serving_size,
        category: action.payload.category,
        url: action.payload.url,
      };
      return {
        ...state,
        drafts: [...state.drafts, newDraft],
      };
    case types.REMOVE_DRAFT:
      return {
        ...state,
      };
    case types.DELETE_DRAFT:
      const newDrafts = state.drafts.filter(
        (draft) => draft.draftId !== action.payload
      );
      return {
        ...state,
        drafts: newDrafts,
      };

    case types.RESET_DRAFT:
      return {
        ...initialState,
      };
    default: {
      return state;
    }
  }
};
