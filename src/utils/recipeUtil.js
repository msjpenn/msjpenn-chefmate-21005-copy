const getTimeFormat = (time) => {
  let formattedTime = time;
  if (time == null) {
    formattedTime = "xh xmin";
  } else {
    let hours = 0;
    let minutes = 0;
    if (time >= 60) {
      hours = time / 60;
      minutes = time - hours * 60;
    } else {
      minutes = time;
    }
    formattedTime =
      hours > 0 ? hours + "h " : "" + minutes > 0 ? minutes + "min" : "";
  }
  return formattedTime;
};

const getDateFormat = (date) => {
  let dt = new Date(date);
  return dt.getDate() + " / " + dt.getMonth() + 1 + " / " + dt.getFullYear();
};

const getCrownCount = (value) => {
  let crownCount = 0;
  if (value == "easy") {
    crownCount = 1;
  } else if (value == "medium") {
    crownCount = 2;
  } else if (value == "hard") {
    crownCount = 3;
  }
  return crownCount;
};

const prepareRecipeList = (recipeApiResults) => {
  const updatedRecipesList = [];
  recipeApiResults.map((item) => {
    let sampleData = {
      recipeId: 1,
      chefImage: "",
      chefName: "<Chef Name here>",
      chefRating: 0,
      recipeImage: "",
      recipeTitle: "<Recipe Title here>",
      recipeSubTitle: "<Subtitle>",
      recipeTime: "x hr  xx min",
      recipeCrown: 1,
      madeBy: "XX",
      madeByUser1Image: "https://via.placeholder.com/50/66371c?text=.",
      madeByUser2Image: "https://via.placeholder.com/50/66371c?text=.",
      madeByUser3Image: "https://via.placeholder.com/50/66371c?text=.",
      numberOfLikes: "XXX1",
      numberOfComments: "XXX11",
    };
    //console.log("FeedScreen item: "+JSON.stringify(item));
    item.picture != null ? (sampleData.recipeImage = item.picture) : null;
    sampleData.recipeId = item.id;
    sampleData.chefImage = item?.user?.users_demo?.image;
    sampleData.numberOfComments = item.comments.length;
    sampleData.chefRating = item?.rating?.rate__avg || 0;
    sampleData.chefName =
      item?.user?.name || item?.user?.email?.match(/^([^@]*)@/)[1];
    sampleData.recipeTitle = item.title;
    sampleData.isBookmarked = item.is_bookmarked;
    sampleData.numberOfLikes = item.likes != null ? item.likes : "XXX";
    sampleData.madeBy =
      item.total_recreated != null ? item.total_recreated : "XXX";
    sampleData.recipeCrown = getCrownCount(item.difficulty_level);
    sampleData.description = item.description;
    sampleData.url = item.url;
    sampleData.comments = item.comments;
    sampleData.recipeTime = getTimeFormat(item.total_hours_to_make);
    sampleData = { ...sampleData, ...item };
    updatedRecipesList.push(sampleData);
  });
  console.log("recipeApiResults=>", recipeApiResults, updatedRecipesList);
  return updatedRecipesList;
};

const updatedRecipeDetails = (res) => {
  let data = {
    recipeId: 1,
    chefImage: "",
    chefName: "<Chef Name here>",
    chefRating: 0,
    recipeImage: "",
    recipeTitle: "<Recipe Title here>",
    recipeSubTitle: "<Subtitle>",
    recipeTime: "x hr  xx min",
    recipeCrown: 1,
    madeBy: "XX",
    madeByUser1Image: "https://via.placeholder.com/50/66371c?text=.",
    madeByUser2Image: "https://via.placeholder.com/50/66371c?text=.",
    madeByUser3Image: "https://via.placeholder.com/50/66371c?text=.",
    numberOfLikes: "XXX1",
    numberOfComments: "XXX11",
  };
  //console.log("FeedScreen item: "+JSON.stringify(item));
  res.picture != null ? (data.recipeImage = res.picture) : null;
  data.recipeId = res.id;
  data.numberOfComments = res.comments.length;
  data.chefRating = res?.rating?.rate__avg || 0;
  data.chefImage = res?.user?.users_demo?.image;

  data.chefName = res?.user?.name || res?.user?.email?.match(/^([^@]*)@/)[1];
  data.recipeTitle = res.title;
  data.isBookmarked = res.is_bookmarked;
  data.numberOfLikes = res.likes != null ? res.likes : "XXX";
  data.madeBy = res.total_recreated != null ? res.total_recreated : "XXX";
  data.recipeCrown = getCrownCount(res.difficulty_level);
  data.description = res.description;
  data.url = res.url;
  data.comments = res.comments;
  data.recipeTime = getTimeFormat(res.total_hours_to_make);
  data = { ...data, ...res };

  return data;
};

export {
  getTimeFormat,
  getDateFormat,
  prepareRecipeList,
  updatedRecipeDetails,
};
