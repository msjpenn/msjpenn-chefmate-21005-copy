import {
  put,
  call,
  all,
  spawn,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import * as types from "./constants";
import * as actions from "./actions";
import { recipeApiService } from "./services";

function* doPostRecipe(action) {
  try {
    const result = yield call(recipeApiService.doCreateRecipe, action.payload);
    console.log("results", result);
    yield put(actions.doPostRecipeSuccess(result));
  } catch (err) {
    console.log("err", err.response);
    yield put(actions.doPostRecipeError(err));
  }
}

function* doPostRecipeWatcher() {
  yield takeEvery(types.DO_POST_RECIPE, doPostRecipe);
}

function* doUpdateRecipe(action) {
  try {
    const result = yield call(recipeApiService.doUpdateRecipe, action.payload);
    console.log("results", result);
    yield put(actions.doUpdateRecipeSuccess(result));
  } catch (err) {
    console.log("err", err.response);
    // yield put(actions.doPostRecipeError(err));
  }
}

function* doUpdateRecipeWatcher() {
  yield takeEvery(types.DO_UPDATE_RECIPE, doUpdateRecipe);
}

function* doPostRecipePhoto(action) {
  try {
    const result = yield call(
      recipeApiService.doCreateRecipePhoto,
      action.payload
    );
    console.log("results", result);
    yield put(actions.doPostRecipePhotoSuccess(result));
  } catch (err) {
    console.log("err", err.response);
    yield put(actions.doPostRecipePhotoError(err));
  }
}

function* doPostRecipeSection(action) {
  try {
    const results = yield call(
      recipeApiService.doPostRecipeSection({
        name: action.payload.name,
        recipe: action.payload.id,
      })
    );
    console.log("results", results);
    yield put(
      actions.doPostSectionSuccess({
        id: results.id,
        instructions: action.payload.section.instructions,
        section: action.payload.section,
      })
    );
  } catch (error) {
    yield put(actions.doPostSectionError(error));
  }
}

function* doPostRecipeInstructions(action) {
  try {
    const results = yield call(
      recipeApiService.doPostInstructions,
      action.payload
    );
    console.log("results", results);
    yield put(actions.doPostInstructionsSuccess(results));
  } catch (error) {
    console.log("err", error);
    yield put(actions.doPostInstructionsError(error));
  }
}

function* doPostRecipeIngredients(action) {
  try {
    const results = yield call(
      recipeApiService.doPostIngredients,
      action.payload
    );

    console.log("results", results);
    yield put(actions.doPostRecipeIngredientsSuccess(results));
  } catch (err) {
    console.log("err", err);
    yield put(actions.doPostRecipeIngredientsFailed(err));
  }
}

function* doPostRecipePhotoWatcher() {
  yield takeEvery(types.DO_POST_RECIPE_PHOTO, doPostRecipePhoto);
}
function* doPostRecipeSectionWatcher() {
  yield takeEvery(types.DO_POST_RECIPE_SECTION, doPostRecipeSection);
}

function* doPostRecipeIngredientsWatcher() {
  yield takeEvery(types.DO_POST_RECIPE_INGREDIENTS, doPostRecipeIngredients);
}

function* doPostRecipeInstructionsWatcher() {
  yield takeEvery(types.DO_POST_RECIPE_INSTRUCTIONS, doPostRecipeInstructions);
}

// function* doPostCategory(action) {
//     try {
//         const result = yield call(recipeApiService.doCreateCategory, action.payload);
//         yield put(types.DO_POST_RECIPE_SUCCESS, result);
//     } catch (err) {
//         console.log(err);
//         yield put(types.DO_POST_RECIPE_FAILED, err);
//     }
// }

// function* doPostCategoryWatcher() {
//     yield takeEvery(types.DO_POST_RECIPE, doPostCategory)
// }

export default function* recipeCreationRootSaga() {
  const sagas = [
    doPostRecipeWatcher,
    doUpdateRecipeWatcher,
    doPostRecipePhotoWatcher,
    doPostRecipeIngredientsWatcher,
    doPostRecipeSectionWatcher,
    doPostRecipeInstructionsWatcher,
  ];
  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}
