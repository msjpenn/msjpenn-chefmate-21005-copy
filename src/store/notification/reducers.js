import * as types from "./constants";

const initialState = {
  notifications: [],
  hasNewNotications: false,
};

export default notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_NOTIFICATIONS_LIST_SUCCESS:
      console.log("action.payload", action);

      let newNots = false;
      if (Array.isArray(action?.payload)) {
        if (action.payload.some((e) => e.is_read === false)) {
          newNots = true;
        } else {
          newNots = false;
        }
      }

      return {
        ...state,
        notifications: [...action?.payload],
        hasNewNotications: newNots,
      };

    case types.TURN_OFF_BELL:
      return {
        ...state,
        hasNewNotications: false,
      };
    default: {
      return state;
    }
  }
};
