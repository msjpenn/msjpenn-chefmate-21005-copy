import * as types from "./constants"

import {NavigationActions} from 'react-navigation'; 

export const doAddSection = name => ({
  type: types.DO_ADD_SECTION,
  name,
});

export const doAddSectionSucceeded = response => ({
  type: types.DO_ADD_SECTION_SUCCEEDED,
  response,
});

export const doAddSectionFailed = error => ({
  type: types.DO_ADD_SECTION_FAILED,
  error,
});

export const setIsAjax = flag => ({
  type: types.SET_IS_AJAX,
  flag
});

export const addIngredient = (sectionID, ingredient) => ({
  type: types.ADD_INGREDIENT,
  sectionID,
  ingredient
});

export const addOrUpdateInstruction = (sectionID, instruction) => ({
  type: types.ADD_OR_UPDATE_INSTRUCTION,
  sectionID,
  instruction
});

export const setTitle = (name) => ({
  type: types.SET_TITLE,
  name
});

export const saveTitle = (name) => ({
  type: types.SAVE_TITLE,
  name
});



// export const doRegister = (login, password) => ({
//   type: types.DO_REGISTER, login, password
// })

// export const doRegisterSucceeded = response => ({
//   type: types.DO_REGISTER_SUCCEEDED, response
// })

// export const doRegisterFailed = error => ({
//   type: types.DO_REGISTER_FAILED, error
// })


// export const doPwdReset = (login, password) => ({
//   type: types.DO_PWDRESET, login, password
// })

// export const doPwdResetSucceeded = response => ({
//   type: types.DO_PWDRESET_SUCCEEDED, response
// })

// export const doPwdResetFailed = error => ({
//   type: types.DO_PWDRESET_FAILED, error
// })