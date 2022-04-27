import * as types from "./constants";
import * as status from "../constants";
import * as StoreUtil from "../storeUtil";

const initialState = {
  uploadImage: {
    status: "",
  },
  resetUsername: {
    status: "",
  },
  editPhone: {
    status: "",
  },
  getCategories: {
    status: "",
  },
  categories: [],
  updateCategories: {
    status: "",
  },
  editMeasurement: {
    status: "",
  },
  measurementSystem: "",
  usersFromContactStatus: {
    status: "",
  },
  usersFromContact: [
    /* {
            userId: "1",
            name: "First Contact",
            image: null,
            isFollowing: false,
        },
        {
            userId: "2",
            name: "Second Contact",
            image: null,
            isFollowing: false,
        },
        {
            userId: "3",
            name: "Third Contact",
            image: null,
            isFollowing: true,
        },
        {
            userId: "4",
            name: "Fourth Contact",
            image: null,
            isFollowing: false,
        },
        {
            userId: "5",
            name: "Fifth Contact",
            image: null,
            isFollowing: false,
        },
        {
            userId: "6",
            name: "Sixth Contact",
            image: null,
            isFollowing: false,
        }*/
  ],
  usersFromFB: [
    {
      userId: "7",
      name: "First FB Friend",
      image: null,
      isFollowing: false,
    },
    {
      userId: "8",
      name: "Second FB Friend",
      image: null,
      isFollowing: false,
    },
    {
      userId: "9",
      name: "Third FB Friend",
      image: null,
      isFollowing: true,
    },
    {
      userId: "10",
      name: "Fourth FB Friend",
      image: null,
      isFollowing: false,
    },
  ],
};

export default profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DO_UPLOADIMAGE:
      return {
        ...state,
        uploadImage: {
          status: status.LOADING,
          errorMessage: null,
        },
      };
    case types.DO_UPLOADIMAGE_SUCCEEDED:
      return {
        ...state,
        uploadImage: {
          status: status.SUCCESS,
          errorMessage: null,
        },
      };
    case types.DO_UPLOADIMAGE_FAILED:
      return {
        ...state,
        uploadImage: {
          status: status.FAILED,
          errorMessage: JSON.stringify(action.error),
        },
      };

    case types.DO_RESETUSERNAME:
      return {
        ...state,
        resetUsername: {
          status: status.LOADING,
          errorMessage: null,
        },
      };
    case types.DO_RESETUSERNAME_SUCCEEDED:
      return {
        ...state,
        resetUsername: {
          status: status.SUCCESS,
          errorMessage: null,
        },
      };
    case types.DO_RESETUSERNAME_FAILED:
      return {
        ...state,
        resetUsername: {
          status: status.FAILED,
          errorMessage: JSON.stringify(action.error.response.data),
        },
      };

    case types.DO_EDITPHONE:
      return {
        ...state,
        editPhone: {
          status: status.LOADING,
          errorMessage: null,
        },
      };
    case types.DO_EDITPHONE_SUCCEEDED:
      return {
        ...state,
        editPhone: {
          status: status.SUCCESS,
          errorMessage: null,
        },
      };
    case types.DO_EDITPHONE_FAILED:
      return {
        ...state,
        editPhone: {
          status: status.FAILED,
          errorMessage: JSON.stringify(action.error.response.data),
        },
      };

    case types.DO_GET_CATEGORIES:
      return {
        ...state,
        getCategories: {
          status: status.LOADING,
          errorMessage: null,
        },
      };
    case types.DO_GET_CATEGORIES_SUCCEEDED:
      return {
        ...state,
        getCategories: {
          status: status.SUCCESS,
          errorMessage: null,
        },
        categories: action.response,
      };
    case types.DO_GET_CATEGORIES_FAILED:
      return {
        ...state,
        getCategories: {
          status: status.FAILED,
          errorMessage: StoreUtil.getErrorMessage(action),
        },
      };

    case types.DO_UPDATE_CATEGORIES:
      return {
        ...state,
        updateCategories: {
          status: status.LOADING,
          errorMessage: null,
        },
      };
    case types.DO_UPDATE_CATEGORIES_SUCCEEDED:
      let updatedCategories = state.categories;
      updatedCategories.forEach((element) => {
        if (action.categoryIds.indexOf(element.id) === -1) {
          element.isSelected = false;
        } else {
          element.isSelected = true;
        }
      });
      return {
        ...state,
        updateCategories: {
          status: status.SUCCESS,
          errorMessage: null,
        },
        categories: updatedCategories,
      };
    case types.DO_UPDATE_CATEGORIES_FAILED:
      return {
        ...state,
        updateCategories: {
          status: status.FAILED,
          errorMessage: StoreUtil.getErrorMessage(action),
        },
      };

    case types.DO_EDITMEASUREMENT:
      return {
        ...state,
        editMeasurement: {
          status: status.LOADING,
          errorMessage: null,
        },
      };
    case types.DO_EDITMEASUREMENT_SUCCEEDED:
      return {
        ...state,
        editMeasurement: {
          status: status.SUCCESS,
          errorMessage: null,
        },
      };
    case types.DO_EDITMEASUREMENT_FAILED:
      return {
        ...state,
        editMeasurement: {
          status: status.FAILED,
          errorMessage: StoreUtil.getErrorMessage(action),
        },
      };

    case types.DO_GETUSERSBYPHONENUMBERS:
      return {
        ...state,
        usersFromContactStatus: {
          status: status.LOADING,
        },
      };
    case types.DO_GETUSERSBYPHONENUMBERS_SUCCEEDED:
      const inputPhoneNumbers = action.inputPhoneNumbersTemp;
      const updatedUsersFromAllContact = [];

      if (inputPhoneNumbers != null && inputPhoneNumbers.length > 0) {
        action.response.users.map((usr) => {
          if (usr.users_demo != null) {
            let phone = usr.users_demo.mobile;
            if (inputPhoneNumbers.indexOf(phone) != -1) {
              updatedUsersFromAllContact.push({
                userId: usr.id,
                name: usr.name,
                image: usr.users_demo.image,
                isFollowing: false,
              });
            }
          }
        });
      }
      return {
        ...state,
        usersFromContact: updatedUsersFromAllContact,
        usersFromContactStatus: {
          status: status.SUCCESS,
        },
      };
    case types.DO_GETUSERSBYPHONENUMBERS_FAILED:
      return {
        ...state,
        usersFromContactStatus: {
          status: status.FAILED,
        },
      };

    /*case types.DO_GETUSERSBYPHONENUMBERS:
            return {
                ...state,
                usersFromContactStatus: {
                    status: status.LOADING
                }
            }
        case types.DO_GETUSERSBYPHONENUMBERS_SUCCEEDED:
            return {
                ...state,
                usersFromContact: action.response,
                usersFromContactStatus: {
                    status: status.SUCCESS
                }
            }
        case types.DO_GETUSERSBYPHONENUMBERS_FAILED:
            return {
                ...state,
                usersFromContactStatus: {
                    status: status.FAILED
                }
            }*/

    case types.DO_FOLLOWALL:
      return {
        ...state,
      };
    case types.DO_FOLLOWALL_SUCCEEDED:
      let updatedUsersFromContact = [];
      state.usersFromContact.map((contact) => {
        contact.isFollowing = true;
        updatedUsersFromContact.push(contact);
      });
      return {
        ...state,
        usersFromContact: updatedUsersFromContact,
      };
    case types.DO_FOLLOWALL_FAILED:
      return {
        ...state,
      };

    case types.DO_FOLLOWALLFB:
      return {
        ...state,
      };
    case types.DO_FOLLOWALLFB_SUCCEEDED:
      let updatedUsersFromFB = [];
      usersFromFB.map((contact) => {
        contact.isFollowing = true;
        updatedUsersFromFB.push(contact);
      });
      return {
        ...state,
        usersFromFB: updatedUsersFromFB,
      };
    case types.DO_FOLLOWALLFB_FAILED:
      return {
        state,
      };

    case types.DO_FOLLOWUSER:
      return {
        ...state,
      };
    case types.DO_FOLLOWUSER_SUCCEEDED:
      let index = state.usersFromContact.findIndex((contact) => {
        return contact.userId === action.userIdToFollow;
      });
      let updatedUsersFromContactForFollow = [...state.usersFromContact];
      updatedUsersFromContactForFollow[index].isFollowing = true;
      return {
        ...state,
        usersFromContact: updatedUsersFromContactForFollow,
      };
    case types.DO_FOLLOWUSER_FAILED:
      return {
        ...state,
      };

    case types.DO_UNFOLLOWUSER:
      return {
        state,
      };
    case types.DO_UNFOLLOWUSER_SUCCEEDED:
      {
        let index = state.usersFromContact.findIndex((contact) => {
          contact.userId === action.payload.userIdToFollow;
        });
        const updatedUsersFromContact = [...state.usersFromContact];
        updatedUsersFromContact[index].isFollowing = false;
      }
      return {
        ...state,
        usersFromContact: updatedUsersFromContact,
      };
    case types.DO_UNFOLLOWUSER_FAILED:
      return {
        state,
      };
    // case types.DO_EDITMEASUREMENT:
    //     return {
    //         ...state,
    //         uploadImage: {
    //             status: status.SUCCESS,
    //             errorMessage: null,
    //         },
    //     }

    default: {
      return state;
    }
  }
};
