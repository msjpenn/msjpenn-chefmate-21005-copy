import * as types from "./constants";

const initialState = {
  id: "",
  isLoading: false,
  image: {},
  title: "",
  time: "",
  size: "",
  rating: "",
  type: "",
  url: {},
  photos: [],
  description: "",
  sectionName: "",
  ingredient: [],
  instruction: [],
  audio: {},
  category: [],
  recipeDetails: {},
  instructionStatus: false,
  section: [
    {
      name: "",
      ingredients: [{ name: "", amount: null, unit: "tablespoon" }],
      instructions: [{ description: "", image: {} }],
    },
  ],
  recreatedFrom: "",
  previewImage: "",
  recipeIdUpdate: "",
};

export default recipeCreationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DONE_RECIPE:
      return {
        ...initialState,
      };
    case types.SET_RECIPE_DATA:
      console.log(action.payload);
      return {
        ...state,
        recreatedFrom: action.payload.recipeId,
        title: action.payload.recipeTitle,
        image: action.payload.image,
        time: action.payload.total_hours_to_make,
        total_hours_to_make: action.payload.total_hours_to_make,
        previewImage: action.payload.recipeImage,
        recipeDetails: action.payload,
        description: action.payload.description,
        rating: action.payload.rating,
        section: action.payload.sections,
        serving_size: action.payload.serving_size,
        likes: action.payload.likes,
        comments: action.payload.comments,
        recipeIdUpdate: action.payload.recipeId,
        category: action.payload.category,
        type: 2,
        url: action.payload.url,
      };
    case types.ADD_RECIPE_ISLOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case types.ADD_RECIPE_IMAGE:
      return {
        ...state,
        image: action.payload,
      };
    case types.ADD_RECIPE_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case types.ADD_RECIPE_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    case types.ADD_RECIPE_URL:
      return {
        ...state,
        url: action.payload,
      };
    case types.ADD_RECIPE_PHOTOS:
      return {
        ...state,
        photos: [...state.photos, action.payload],
      };
    case types.DELETE_RECIPE_PHOTOS:
      return {
        ...state,
        photos: state.photos.filter((item) => item !== action.payload),
      };
    case types.ADD_RECIPE_DESC:
      return {
        ...state,
        description: action.payload,
      };
    case types.ADD_RECIPE_SECTION_NAME:
      return {
        ...state,
        section: [...action.payload],
      };
    case types.ADD_RECIPE_SECTION_DATA:
      return {
        ...state,
        section: [...action.payload],
      };
    case types.ADD_RECIPE_INGREDIENT:
      return {
        ...state,
        ingredient: [...state.ingredient, action.payload],
      };
    case types.ADD_RECIPE_INSTRUCTION:
      return {
        ...state,
        instruction: action.payload,
      };
    case types.ADD_RECIPE_AUDIO:
      return {
        ...state,
        audio: action.payload,
      };
    case types.ADD_RECIPE_DETAIL:
      return {
        ...state,
        title: action.payload.title,
        time: action.payload.time,
        size: action.payload.size,
        rating: action.payload.rating,
      };
    case types.ADD_RECIPE_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    case types.DO_POST_RECIPE:
      return {
        ...state,
        isLoading: true,
      };
    case types.DO_POST_RECIPE_INGREDIENTS:
      return {
        ...state,
        instructionStatus: false,
      };
    case types.DO_POST_RECIPE_SUCCESS_WITH_INGREDIENTS:
      return {
        ...initialState,
        instructionStatus: true,
        status: "success",
        isLoading: false,
      };
    case types.DO_POST_RECIPE_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        photos: state.type != 0 ? state.photos : [],
        section: state.type == 2 ? state.section : [],
        type: state.type != 0 ? state.type : 0,
        status: "success",
        instructionStatus: false,
        isLoading: false,
      };

    case types.DO_UPDATE_RECIPE_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        photos: state.type != 0 ? state.photos : [],
        section: state.type == 2 ? state.section : [],
        type: state.type != 0 ? state.type : 0,
        status: "success",
        instructionStatus: false,
        isLoading: false,
      };

    case types.DO_POST_RECIPE_INGREDIENTS_SUCCESS: {
      if (state.section.length > 0) {
        state.section.shift();
      }
      return {
        ...state,
        section: state.section,
        instructionStatus: action.payload?.section?.length > 0 ? false : true,
      };
    }
    case types.DO_POST_RECIPE_FAILED:
      return {
        ...state,
        status: "failed",
        isLoading: false,
      };

    case types.DO_POST_RECIPE_PHOTO:
      return {
        ...state,
        isLoading: true,
      };
    case types.DO_POST_RECIPE_PHOTO_SUCCESS:
      return {
        ...state,
        status: "success",
        isLoading: false,
      };
    case types.DO_POST_RECIPE_PHOTO_FAILED:
      return {
        ...state,
        status: "failed",
        isLoading: false,
      };
    default: {
      return state;
    }
  }
};
