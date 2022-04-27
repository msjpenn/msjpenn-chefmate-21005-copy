/* eslint-disable prettier/prettier */
import * as types from "./constants";
import * as status from "../constants";
import { act } from "react-test-renderer";
import update from "immutability-helper";

const initialState = {
  isLoading: false,
  sections: [],
  isAjax: false,
  ingredients: [],
  instructions: [],
  title: null,
};

export default recipeReducer = (state = initialState, action) => {
  // console.log(action)

  switch (action.type) {
    case types.DO_ADD_SECTION:
      return {
        ...state,
        sections: [
          ...state.sections,
          { id: state.sections.length + 1, name: action.value },
        ],
        isLoading: true,
      };
    case types.DO_ADD_SECTION_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        isAjax: true,
      };
    case types.DO_ADD_SECTION_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error.toString(),
      };
    case types.SET_IS_AJAX:
      return {
        ...state,
        isAjax: action.flag,
      };
    case types.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          {
            id: state.ingredients.length + 1,
            sectionID: action.sectionID,
            name: action.ingredient.name,
            amount: action.ingredient.amount,
            unit: action.ingredient.unit,
          },
        ],
      };
    case types.ADD_OR_UPDATE_INSTRUCTION:
      return update(state, {
        instructions: { $set: action.instruction },
      });
    case types.SET_TITLE:
      return {
        ...state,
        title: action.name,
      };
    default: {
      return state;
    }
  }
};
