import * as types from "./constants"
import * as status from '../constants'
import * as StoreUtil from '../storeUtil'

const initialState = {
    groceryList:[],
    err:undefined,
    isLoading:false
};

export default groceryReducer = (state = initialState, action) => {
    switch(action.type){
        case types.GET_GROCERIES_LIST_SUCCESS:
            return {
                ...state,
                groceryList:[...action.payload],
                isLoading:false
            }
        case types.GET_GROCERIES_LIST_FAIL :
            return {
                ...state,
                err:action.payload?.response,
                isLoading:false
            }
        case types.POST_GROCERIES_LIST_ITEM_SUCCESS:{
            return{
                ...state,
                groceryList:[...state.groceryList,action.payload],
                isLoading:false
            }
        }
        case types.POST_GROCERIES_LIST_ITEM:{
            return{
                ...state,
                isLoading:true
            }
        }
        case types.POST_GROCERIES_LIST_ITEM_FAIL:{
            return{
                ...state,
                isLoading:false
            }
        }
        case types.GET_GROCERIES_LIST:{
            return{
                ...state,
                isLoading:true
            }
        }
        default: {
            return state;
        }
}
};