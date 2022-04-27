/* eslint-disable prettier/prettier */
import * as types from "./constants";
import * as status from "../constants";
import * as StoreUtil from "../storeUtil";

const initialState = {
  token: null,
  user: null,
  userId: null,
  errorMessage: null,
  login: {
    status: "",
  },
  fbLogin: {
    status: "",
  },
  googleLogin: {
    status: "",
  },
  appleLogin: {
    status: "",
  },
  register: {
    status: "",
  },
  pwdReset: {
    status: "",
  },
  terms: [],
  getTerms: {
    status: "",
  },
};

export default authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_USER_PROFILE: {
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    }
    case types.DO_LOGIN:
      return {
        ...state,
        login: {
          status: status.LOADING,
        },
      };
    case types.DO_LOGIN_SUCCEEDED:
      return {
        ...state,
        login: {
          status: status.SUCCESS,
        },
        token: action.response.token,
        user: action.response.user,
      };
    case types.DO_LOGIN_FAILED:
      return {
        ...state,
        login: {
          status: status.FAILED,
          errorMessage: StoreUtil.getErrorMessage(action),
        },
        token: null,
        user: null,
        userId: null,
      };

    case types.DO_FBLOGIN:
      return {
        ...state,
        fbLogin: {
          status: status.LOADING,
        },
      };
    case types.DO_FBLOGIN_SUCCEEDED:
      return {
        ...state,
        fbLogin: {
          status: status.SUCCESS,
        },
        token: action.response.token,
        user: action.response.user,
      };
    case types.DO_FBLOGIN_FAILED:
      return {
        ...state,
        fbLogin: {
          status: status.FAILED,
          errorMessage: StoreUtil.getErrorMessage(action),
        },
        token: null,
        user: null,
        userId: null,
      };

    case types.DO_GOOGLELOGIN:
      return {
        ...state,
        googleLogin: {
          status: status.LOADING,
        },
      };
    case types.DO_GOOGLELOGIN_SUCCEEDED:
      return {
        ...state,
        googleLogin: {
          status: status.SUCCESS,
        },
        token: action.response.token,
        user: action.response.user,
      };
    case types.DO_GOOGLELOGIN_FAILED:
      return {
        ...state,
        googleLogin: {
          status: status.FAILED,
          errorMessage: StoreUtil.getErrorMessage(action),
        },
        token: null,
        user: null,
        userId: null,
      };

    //apple

    case types.DO_APPLELOGIN_SUCCEEDED:
      return {
        ...state,
        appleLogin: {
          status: status.SUCCESS,
        },
        token: action.response.token,
        user: action.response.user,
      };

    case types.DO_APPLELOGIN_FAILED:
      return {
        ...state,
        appleLogin: {
          status: status.FAILED,
        },
        token: null,
        user: null,
        userId: null,
      };

    case types.DO_REGISTER:
      return {
        ...state,
        register: {
          status: status.LOADING,
        },
      };
    case types.DO_REGISTER_SUCCEEDED:
      return {
        ...state,
        register: {
          status: status.SUCCESS,
          errorMessage: null,
        },
        userId: action.response.id,
      };
    case types.DO_REGISTER_FAILED:
      return {
        ...state,
        register: {
          status: status.FAILED,
          errorMessage: StoreUtil.getErrorMessage(action),
        },
        token: null,
        user: null,
        userId: null,
      };

    case types.DO_PWDRESET:
      return {
        ...state,
        pwdReset: {
          status: status.LOADING,
          errorMessage: null,
        },
      };
    case types.DO_PWDRESET_SUCCEEDED:
      return {
        ...state,
        pwdReset: {
          status: status.SUCCESS,
          errorMessage: null,
        },
      };
    case types.DO_PWDRESET_FAILED:
      return {
        ...state,
        pwdReset: {
          status: status.FAILED,
          errorMessage: StoreUtil.getErrorMessage(action),
        },
      };

    case types.DO_GET_TERMS:
      return {
        ...state,
        getTerms: {
          status: status.LOADING,
          errorMessage: null,
        },
      };
    case types.DO_GET_TERMS_SUCCEEDED:
      return {
        ...state,
        getTerms: {
          status: status.SUCCESS,
          errorMessage: null,
        },
        terms: action.response,
      };
    case types.DO_GET_TERMS_FAILED:
      return {
        ...state,
        getTerms: {
          status: status.FAILED,
          errorMessage: StoreUtil.getErrorMessage(action),
        },
      };
    case types.DO_LOGOUT:
      return {
        ...initialState,
      };
    default: {
      return state;
    }
  }
};
