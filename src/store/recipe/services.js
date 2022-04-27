import { request } from "../../utils/http";
import axios from "axios";

function doGetRecipeFeed(payload) {
  let queryParam = "?";
  let header = {};

  if (payload?.userId) {
    queryParam = queryParam + "user=" + payload.userId;
  } else {
    queryParam = "";
  }

  if (payload?.page && payload?.userId) {
    queryParam = queryParam + "&&page=" + payload.page;
  } else if (payload?.page && !payload?.userId) {
    queryParam = queryParam + "?page=" + payload.page;
  }

  if (payload?.following_tab) {
    queryParam = queryParam + "&&following_tab=following_tab";
  }

  if (axios.defaults.headers.common["Authorization"] != "Token null") {
    header = {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    };
  }
  console.log("header", axios.defaults.headers.common["Authorization"]);
  return request
    .get("/recipe/" + queryParam, header)
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("result feed==>", response);
      return result;
    })
    .catch(function (error) {
      console.log("GOT error:" + error);
      throw error;
    });
}

function doGetOwnRecipeFeed(payload) {
  let queryParam = "?";
  if (payload != null && payload.userId != null) {
    queryParam = queryParam + "user__id=" + payload.userId;
  }
  console.log(queryParam);
  return request
    .get("/recipe/" + queryParam, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("result feed==>", response);
      return result;
    })
    .catch(function (error) {
      console.log("GOT error:", error);
      throw error;
    });
}
function doGetRecipeRecreation(id) {
  console.log("header", axios.defaults.headers.common["Authorization"]);
  return request
    .get(`/recipe/user/recreation/?recreated_from=${id}`)
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("result recreation==>", response);
      return result;
    })
    .catch(function (error) {
      console.log("GOT error:" + error);
      throw error;
    });
}

function doGetRecipeDetails(id) {
  let header = {};

  if (axios.defaults.headers.common["Authorization"] != "Token null") {
    header = {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    };
  }

  console.log("header", axios.defaults.headers.common["Authorization"]);

  return request
    .get(`/recipe/${id}/`, header)
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      console.log("result recreation==>", response);
      return result;
    })
    .catch(function (error) {
      console.log("GOT error:" + error);
      throw error;
    });
}

function doSearch(payload) {
  return request
    .get("/feed/search/?search=" + payload, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doGetUserBookmarkGroups(payload) {
  return request
    .get(`/bookmarks/group/?user__id=${payload.userId}`, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doCreateBookmarkGroup(payload) {
  return request
    .post(
      "/bookmarks/group/",
      {
        name: payload.name,
        user: payload.userId,
      },
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    )
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doGetCookbookRecipes(payload) {
  return request
    .get("/bookmarks/?group=" + payload.groupId, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doAddBookmark(payload) {
  return request
    .post(
      "/bookmarks/",
      {
        user: payload.userId,
        recipe: payload.recipeId,
        group: payload.groupId,
      },
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    )
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doReportRecipe(payload) {
  console.log("reportpayload", payload);
  return request
    .post(
      "/reportrecipe/",
      {
        user: payload.user,
        recipe: payload.recipe,
        reason: payload.reason,
      },
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    )
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doLikeRecipe(payload) {
  console.log("header", axios.defaults.headers.common["Authorization"]);

  return request
    .post(
      "/recipe/user/likes/",
      {
        user: payload.userId,
        recipe: payload.recipeId,
      },
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    )
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doUnLikeRecipe(payload) {
  console.log("header", axios.defaults.headers.common["Authorization"]);

  return request
    .delete(
      `/recipe/user/likes/?recipe=${payload.recipeId}`,
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      },
      {
        user: payload.userId,
        recipe: payload.recipeId,
      }
    )
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doPostComment(payload) {
  return request
    .post(
      "/comments/",
      {
        user: payload.userId,
        recipe: payload.recipeId,
        body: payload.commentText,
      },
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    )
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doDeleteComment(payload) {
  return request
    .delete(
      `/comments/${payload.id}/`,
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      },
      {
        user: payload.user,
        recipe: payload.recipe,
      }
    )
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doPostRecreationImages(payload) {
  let images = [payload.file];
  const formData = new FormData();
  formData.append("images", payload.file);
  formData.append("recipe", payload.recipeId);

  console.log(payload);
  return request
    .post("/recipe/images/recipe/", formData, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then((res) => {
      let result = JSON.parse(JSON.stringify(res.data));
      return result;
    })
    .catch((e) => {
      throw e;
    });
}

function doGetRecipesByUserId(payload) {
  return request
    .get("/recipe/?user__id=" + payload.userId, {
      headers: {
        Authorization: axios.defaults.headers.common["Authorization"],
      },
    })
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

function doRateRecipe(payload) {
  console.log("header", axios.defaults.headers.common["Authorization"]);

  return request
    .post(
      "/recipe/user/rate/",
      {
        user: payload.user,
        recipe: payload.recipe,
        rate: payload.rate,
      },
      {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      }
    )
    .then(function (response) {
      let result = JSON.parse(JSON.stringify(response.data));
      return result;
    })
    .catch(function (error) {
      throw error;
    });
}

export const customApiService = {
  doGetRecipeFeed,
  doGetRecipeDetails,
  doSearch,
  doCreateBookmarkGroup,
  doGetUserBookmarkGroups,
  doGetCookbookRecipes,
  doAddBookmark,
  doReportRecipe,
  doLikeRecipe,
  doUnLikeRecipe,
  doPostComment,
  doDeleteComment,
  doRateRecipe,
  doGetRecipesByUserId,
  doPostRecreationImages,
  doGetOwnRecipeFeed,
  doGetRecipeRecreation,
};
