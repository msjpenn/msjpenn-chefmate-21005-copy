import * as types from "./constants";

export const doGetGroceriesListSuccess = response => ({
    type: types.GET_GROCERIES_LIST_SUCCESS,
    payload: response?.results,
});

export const doGetGroceriesList = (id) => ({
    type: types.GET_GROCERIES_LIST,
    payload:id
});

export const doGetGroceriesListFail = err =>({
    type: types.GET_GROCERIES_LIST_FAIL,
    payload:err
});

export const doPostGroceriesListItem = payload =>({
    type: types.POST_GROCERIES_LIST_ITEM,
    payload:payload
});

export const doPostGroceriesListItemFails = () =>({
    type: types.POST_GROCERIES_LIST_ITEM_FAIL
});

export const doPostGroceriesListItemSuccess = (payload) =>({
    type: types.POST_GROCERIES_LIST_ITEM_SUCCESS,
    payload:payload
});

export const doDeleteGroceriesListItemSuccess = (payload) =>({
    type: types.GET_GROCERIES_LIST_SUCCESS,
    payload:payload
});