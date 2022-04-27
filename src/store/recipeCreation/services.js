import { request, requestMultipart, getFormData } from "../../utils/http";
import axios from "axios";
export const recipeApiService = {
  doCreateRecipe,
  doUpdateRecipe,
  doCreateRecipePhoto,
  doCreateCategory,
  doPostRecipeSection,
  doUpdateRecipeSection,
  doDeleteRecipeSection,
  doPostIngredients,
  doUpdateIngredients,
  doUpdateInstructions,
  doPostInstructions,
  doDeleteIngredients,
  doDeleteInstructions,
  doCreateAIImageRecipe,
  doCreateAIWebsiteRecipe,
};

function doCreateRecipe(payload) {
  const data = getFormData(payload);
  return request
    .post("/recipe/", data)
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("result", result);
      return result;
    })
    .catch(function (error) {
      console.log(JSON.stringify(error.response));
      throw error;
    });
}

function doUpdateRecipe(payload) {
  console.log("doUpdateRecipe payload", payload);
  const data = getFormData(payload);
  return request
    .patch(`/recipe/${payload.id}/`, data)
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("result", result);
      return result;
    })
    .catch(function (error) {
      console.log(JSON.stringify(error.response));
      throw error;
    });
}

function doCreateRecipePhoto(payload) {
  return requestMultipart
    .post("/recipe/images/recipe/", payload, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("result", result);
      return result;
    })
    .catch(function (error) {
      console.log(JSON.stringify(error.response));
      throw error;
    });
}

function doPostRecipeSection(payload) {
  return request
    .post("/section/", payload, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then((res) => {
      let result = JSON.parse(JSON.stringify(res.data));
      console.log("result", result);
      return result;
    })
    .catch((err) => {
      throw err;
    });
}
//update section
function doUpdateRecipeSection(payload) {
  console.log("doUpdateRecipeSection payload", payload);

  return request
    .patch(`/section/${payload.id}/`, payload, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then((res) => {
      let result = JSON.parse(JSON.stringify(res.data));
      console.log("result", result);
      return result;
    })
    .catch((err) => {
      throw err;
    });
}

//delete section
function doDeleteRecipeSection(payload) {
  console.log("doDeleteSection payload", payload);

  return request
    .delete(`/section/${payload.id}/`, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then((res) => {
      let result = JSON.parse(JSON.stringify(res.data));
      console.log("result", result);
      return result;
    })
    .catch((err) => {
      throw err;
    });
}

function doPostIngredients(payload) {
  const data = getFormData(payload);
  return request
    .post("/ingredient/", payload, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then((res) => {
      let result = JSON.parse(JSON.stringify(res.data));
      console.log("result", result);
      return result;
    })
    .catch((err) => {
      throw err;
    });
}

//update doUpdateIngredients
function doUpdateIngredients(payload) {
  console.log("doUpdateIngredients payload", payload);

  const data = getFormData(payload);
  return request
    .patch(`/ingredient/${payload.id}/`, payload, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then((res) => {
      let result = JSON.parse(JSON.stringify(res.data));
      console.log("result", result);
      return result;
    })
    .catch((err) => {
      throw err;
    });
}

//update doUpdateIngredients
function doDeleteIngredients(payload) {
  console.log("doDeleteIngredients payload", payload);

  const data = getFormData(payload);
  return request
    .delete(`/ingredient/${payload.id}/`, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then((res) => {
      let result = JSON.parse(JSON.stringify(res.data));
      console.log("result", result);
      return result;
    })
    .catch((err) => {
      throw err;
    });
}

function doPostInstructions(payload) {
  //const data = getFormData(payload);
  return request
    .post("/recipe/instruction/recipe/steps/", payload, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then((res) => {
      let result = JSON.parse(JSON.stringify(res.data));
      console.log("result", result);
      return result;
    })
    .catch((err) => {
      throw err;
    });
}

//Update Instructions
function doUpdateInstructions(payload) {
  //const data = getFormData(payload);
  console.log("doUpdateInstructions payload", payload);
  return request
    .patch(`/recipe/instruction/recipe/steps/${payload.id}/`, payload, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then((res) => {
      let result = JSON.parse(JSON.stringify(res.data));
      console.log("result", result);
      return result;
    })
    .catch((err) => {
      throw err;
    });
}

//delete Instructions
function doDeleteInstructions(payload) {
  //const data = getFormData(payload);
  console.log("deleteInstructions payload", payload);
  return request
    .delete(`/recipe/instruction/recipe/steps/${payload.id}/`, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then((res) => {
      let result = JSON.parse(JSON.stringify(res.data));
      console.log("result", result);
      return result;
    })
    .catch((err) => {
      throw err;
    });
}

function doCreateCategory(payload) {
  console.log("------", payload); ///category/
  return request
    .post("/category/", payload, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("result", result);
      return result;
    })
    .catch(function (error) {
      console.log(JSON.stringify(error.response));
      throw error;
    });
}

function doCreateAIImageRecipe(payload) {
  const data = getFormData(payload);
  return request
    .post("/recipe/ai/image/", data, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("result", result);
      return result;
    })
    .catch(function (error) {
      console.log(JSON.stringify(error.response));
      throw error;
    });
}

function doCreateAIWebsiteRecipe(payload) {
  return request
    .post("/recipe/ai/website/", payload, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("result", result);
      return result;
    })
    .catch(function (error) {
      console.log(JSON.stringify(error.response));
      throw error;
    });
}
