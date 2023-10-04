import { CardProductList } from "views/admin/CardProductList/components/table";
import CardProductListService from "services/CardProductListService";
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from "store/store";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const FETCH_CARD_PRODUCT_LISTS: string = "FETCH_CARD_PRODUCT_LISTS";
export const FETCH_CARD_PRODUCT_LISTS_SUCCESS: string = "FETCH_CARD_PRODUCT_LISTS_SUCCESS";
export const FETCH_CARD_PRODUCT_LISTS_FAILURE: string = "FETCH_CARD_PRODUCT_LISTS_FAILURE";

export const CREATE_CARD_PRODUCT_LIST: string = "CREATE_CARD_PRODUCT_LIST";
export const CREATE_CARD_PRODUCT_LIST_SUCCESS: string = "CREATE_CARD_PRODUCT_LIST_SUCCESS";
export const CREATE_CARD_PRODUCT_LIST_FAILURE: string = "CREATE_CARD_PRODUCT_LIST_FAILURE";

export const UPDATE_CARD_PRODUCT_LIST: string = "UPDATE_CARD_PRODUCT_LIST";
export const UPDATE_CARD_PRODUCT_LIST_SUCCESS: string = "UPDATE_CARD_PRODUCT_LIST_SUCCESS";
export const UPDATE_CARD_PRODUCT_LIST_FAILURE: string = "UPDATE_CARD_PRODUCT_LIST_FAILURE";

export const DELETE_CARD_PRODUCT_LIST: string = "DELETE_CARD_PRODUCT_LIST";
export const DELETE_CARD_PRODUCT_LIST_SUCCESS: string = "DELETE_CARD_PRODUCT_LIST_SUCCESS";
export const DELETE_CARD_PRODUCT_LIST_FAILURE: string = "DELETE_CARD_PRODUCT_LIST_FAILURE";

export const fetchCardProductLists = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await CardProductListService.getCardProductLists();
      const cardProductLists: CardProductList[] = response.data;
      dispatch(fetchCardProductListsSuccess(cardProductLists));
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(fetchCardProductListsFailure(errorMessage));
    }
  };
};

export const fetchCardProductListsSuccess = (cardProductLists: CardProductList[]) => ({
  type: FETCH_CARD_PRODUCT_LISTS_SUCCESS,
  payload: cardProductLists,
});

export const fetchCardProductListsFailure = (error: string) => ({
  type: FETCH_CARD_PRODUCT_LISTS_FAILURE,
  payload: error,
});


export const createCardProductList = (cardProductList: CardProductList): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await CardProductListService.createCardProductList(cardProductList);
      const newCardProductList: CardProductList = response.data;
      console.log(cardProductList)
      dispatch(createCardProductListSuccess(newCardProductList));
      toast.success('Card Products added successfully!');
    } catch (error) {
      console.log( error)
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(createCardProductListFailure(errorMessage));
    }
  };
};

export const createCardProductListSuccess = (cardProductList: CardProductList) => ({
  type: CREATE_CARD_PRODUCT_LIST_SUCCESS,
  payload: cardProductList,
});

export const createCardProductListFailure = (error: string) => ({
  type: CREATE_CARD_PRODUCT_LIST_FAILURE,
  payload: error,
});

export const updateCardProductList = (cardProductList: CardProductList): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await CardProductListService.updateCardProductList(cardProductList);
      const updatedCardProductList: CardProductList = cardProductList;
      toast.success('Card Products updated successfully!');
      dispatch(updateCardProductListSuccess(updatedCardProductList));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      toast.warning('No changes found!');
      dispatch(updateCardProductListFailure(errorMessage));
    }
  };
};

export const updateCardProductListSuccess = (cardProductList: CardProductList) => ({
  type: UPDATE_CARD_PRODUCT_LIST_SUCCESS,
  payload: cardProductList,
});

export const updateCardProductListFailure = (error: string) => ({
  type: UPDATE_CARD_PRODUCT_LIST_FAILURE,
  payload: error,
});

export const deleteCardProductList = (cardProductListId: string): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      await CardProductListService.deleteCardProductList(cardProductListId);
      dispatch(deleteCardProductListSuccess(cardProductListId));
      toast.success('Card Products deleted successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(deleteCardProductListFailure(errorMessage));
    }
  };
};

export const deleteCardProductListSuccess = (cardProductListId: string) => ({
  type: DELETE_CARD_PRODUCT_LIST_SUCCESS,
  payload: cardProductListId,
});

export const deleteCardProductListFailure = (error: string) => ({
  type: DELETE_CARD_PRODUCT_LIST_FAILURE,
  payload: error,
});
