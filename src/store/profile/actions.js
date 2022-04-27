import * as types from "./constants";

export const doUploadImage = (login, password) => ({
  type: types.DO_UPLOADIMAGE,
  login,
  password,
});
export const doUploadImageSucceeded = (response) => ({
  type: types.DO_UPLOADIMAGE_SUCCEEDED,
  response,
});
export const doUploadImageFailed = (error) => ({
  type: types.DO_UPLOADIMAGE_FAILED,
  error,
});

export const doUpdateProfileSuccess = (response) => ({
  type: types.DO_CHANGE_PROFILE_DETAILS_SUCCEEDED,
  response,
});
export const doUpdateProfileFailed = (error) => ({
  type: types.DO_CHANGE_PROFILE_DETAILS_FAILED,
  error,
});

export const doResetUsername = (userid, username) => ({
  type: types.DO_RESETUSERNAME,
  userid,
  username,
});
export const doResetUsernameSucceeded = (response) => ({
  type: types.DO_RESETUSERNAME_SUCCEEDED,
  response,
});
export const doResetUsernameFailed = (error) => ({
  type: types.DO_RESETUSERNAME_FAILED,
  error,
});

export const doEditPhone = (email, phone) => ({
  type: types.DO_EDITPHONE,
  email,
  phone,
});
export const doEditPhoneSucceeded = (response) => ({
  type: types.DO_EDITPHONE_SUCCEEDED,
  response,
});
export const doEditPhoneFailed = (error) => ({
  type: types.DO_EDITPHONE_FAILED,
  error,
});

export const doGetUsersByPhoneNumbers = (userId, phoneNumbers) => ({
  type: types.DO_GETUSERSBYPHONENUMBERS,
  userId,
  phoneNumbers,
});
export const doGetUsersByPhoneNumbersSucceeded = (
  response,
  inputPhoneNumbersTemp
) => ({
  type: types.DO_GETUSERSBYPHONENUMBERS_SUCCEEDED,
  response,
  inputPhoneNumbersTemp,
});
export const doGetUsersByPhoneNumbersFailed = (error) => ({
  type: types.DO_GETUSERSBYPHONENUMBERS_FAILED,
  error,
});

export const doGetCategories = (email) => ({
  type: types.DO_GET_CATEGORIES,
  email,
});
export const doGetCategoriesSucceeded = (response) => ({
  type: types.DO_GET_CATEGORIES_SUCCEEDED,
  response,
});
export const doGetCategoriesFailed = (error) => ({
  type: types.DO_GET_CATEGORIES_FAILED,
  error,
});

export const doUpdateCategories = (userId, categoryIds) => ({
  type: types.DO_UPDATE_CATEGORIES,
  userId,
  categoryIds,
});
export const doUpdateCategoriesSucceeded = (response, categoryIds) => ({
  type: types.DO_UPDATE_CATEGORIES_SUCCEEDED,
  response,
  categoryIds,
});
export const doUpdateCategoriesFailed = (error) => ({
  type: types.DO_UPDATE_CATEGORIES_FAILED,
  error,
});

export const doEditMeasurement = (payload) => ({
  type: types.DO_EDITMEASUREMENT,
  payload,
});
export const doEditMeasurementSucceeded = (response) => ({
  type: types.DO_EDITMEASUREMENT_SUCCEEDED,
  response,
});
export const doEditMeasurementFailed = (error) => ({
  type: types.DO_EDITMEASUREMENT_FAILED,
  error,
});

export const doFollowAllUsers = (userId, allUserIdsToFollow) => ({
  type: types.DO_FOLLOWALL,
  userId,
  allUserIdsToFollow,
});
export const doFollowAllUsersSucceeded = (response) => ({
  type: types.DO_FOLLOWALL_SUCCEEDED,
  response,
});
export const doFollowAllUsersFailed = (error) => ({
  type: types.DO_FOLLOWALL_FAILED,
  error,
});

export const doFollowAllFBUsers = (userId, allUserIdsToFollow) => ({
  type: types.DO_FOLLOWALLFB,
  userId,
  allUserIdsToFollow,
});
export const doFollowAllFBUsersSucceeded = (response) => ({
  type: types.DO_FOLLOWALLFB_SUCCEEDED,
  response,
});
export const doFollowAllFBUsersFailed = (error) => ({
  type: types.DO_FOLLOWALLFB_FAILED,
  error,
});

export const doFollowUser = (userId, userIdToFollow) => ({
  type: types.DO_FOLLOWUSER,
  userId,
  userIdToFollow,
});
export const doFollowUserSucceeded = (response, userIdToFollow) => ({
  type: types.DO_FOLLOWUSER_SUCCEEDED,
  response,
  userIdToFollow,
});
export const doFollowUserFailed = (error) => ({
  type: types.DO_FOLLOWUSER_FAILED,
  error,
});

export const doUnFollowUser = (userId, userIdToUnfollow) => ({
  type: types.DO_UNFOLLOWUSER,
  userId,
  userIdToUnfollow,
});
export const doUnFollowUserSucceeded = (response) => ({
  type: types.DO_UNFOLLOWUSER_SUCCEEDED,
  response,
});
export const doUnFollowUserFailed = (error) => ({
  type: types.DO_UNFOLLOWUSER_FAILED,
  error,
});
