import * as types from "./constants";

export const doAddLoadingStatus = (response) => ({
  type: types.ADD_RECIPE_ISLOADING,
  payload: response,
});

export const doAddImage = (response) => ({
  type: types.ADD_RECIPE_IMAGE,
  payload: response,
});

export const doAddTitle = (response) => ({
  type: types.ADD_RECIPE_TITLE,
  payload: response,
});

export const doAddType = (response) => ({
  type: types.ADD_RECIPE_TYPE,
  payload: response,
});

export const doAddUrl = (response) => ({
  type: types.ADD_RECIPE_URL,
  payload: response,
});

export const doAddPhoto = (response) => ({
  type: types.ADD_RECIPE_PHOTOS,
  payload: response,
});

export const doDeletePhoto = (response) => ({
  type: types.DELETE_RECIPE_PHOTOS,
  payload: response,
});

export const doAddDesc = (response) => ({
  type: types.ADD_RECIPE_DESC,
  payload: response,
});

export const doAddSectionName = (response) => ({
  type: types.ADD_RECIPE_SECTION_NAME,
  payload: response,
});

export const doAddIngredient = (response) => ({
  type: types._,
  payload: response,
});

export const doAddInstruction = (response) => ({
  type: types.ADD_RECIPE_INSTRUCTION,
  payload: response,
});

export const doAddAudio = (response) => ({
  type: types.ADD_RECIPE_AUDIO,
  payload: response,
});

export const doAddRecipeDetail = (response) => ({
  type: types.ADD_RECIPE_DETAIL,
  payload: response,
});

export const doAddSectionData = (response) => ({
  type: types.ADD_RECIPE_SECTION_DATA,
  payload: response,
});

export const doAddCategory = (response) => ({
  type: types.ADD_RECIPE_CATEGORY,
  payload: response,
});

export const doPostRecipe = (response) => ({
  type: types.DO_POST_RECIPE,
  payload: response,
});

//Update RECIPE
export const doUpdateRecipe = (response) => ({
  type: types.DO_UPDATE_RECIPE,
  payload: response,
});

export const doPostRecipeSuccess = (response) => ({
  type: types.DO_POST_RECIPE_SUCCESS,
  payload: response,
});

export const doUpdateRecipeSuccess = (response) => ({
  type: types.DO_UPDATE_RECIPE_SUCCESS,
  payload: response,
});

export const doPostRecipeError = (response) => ({
  type: types.DO_POST_RECIPE_FAILED,
  payload: response,
});

export const doPostRecipePhoto = (response) => ({
  type: types.DO_POST_RECIPE_PHOTO,
  payload: response,
});
export const doPostRecipePhotoSuccess = (response) => ({
  type: types.DO_POST_RECIPE_PHOTO_SUCCESS,
  payload: response,
});
export const doPostRecipeSuccessWithIngredients = (response) => ({
  type: types.DO_POST_RECIPE_SUCCESS_WITH_INGREDIENTS,
  payload: response,
});
export const doPostRecipePhotoError = (response) => ({
  type: types.DO_POST_RECIPE_PHOTO_FAILED,
  payload: response,
});

export const doPostRecipeIngredientsSuccess = (response) => ({
  type: types.DO_POST_RECIPE_INGREDIENTS_SUCCESS,
  payload: response,
});
export const doPostRecipeIngredientsFailed = (response) => ({
  type: types.DO_POST_RECIPE_INGREDIENTS_FAILED,
  payload: response,
});
export const doPostRecipeIngredients = (response) => ({
  type: types.DO_POST_RECIPE_INGREDIENTS,
  payload: response,
});

export const doPostSectionSuccess = (response) => ({
  type: types.DO_POST_RECIPE_SECTION_SUCCESS,
  payload: response,
});

export const doPostSection = (response) => ({
  type: types.DO_POST_RECIPE_SECTION,
  payload: response,
});

export const doPostSectionError = (response) => ({
  type: types.DO_POST_RECIPE_SECTION_FAILED,
  payload: response,
});

export const doPostInstructionsSuccess = (response) => ({
  type: types.DO_POST_RECIPE_INSTRUCTIONS_SUCCESS,
  payload: response,
});

export const doPostInstructions = (response) => ({
  type: types.DO_POST_RECIPE_INSTRUCTIONS,
  payload: response,
});

export const doPostInstructionsError = (response) => ({
  type: types.DO_POST_RECIPE_INSTRUCTIONS_FAILED,
  payload: response,
});

export const doneRecipe = (response) => ({
  type: types.DONE_RECIPE,
  payload: response,
});

export const setRecipeDetails = (response) => ({
  type: types.SET_RECIPE_DATA,
  payload: response,
});
