import {
  FETCH_CARD_PRODUCT_LISTS,
  FETCH_CARD_PRODUCT_LISTS_SUCCESS,
  FETCH_CARD_PRODUCT_LISTS_FAILURE,
  CREATE_CARD_PRODUCT_LIST,
  CREATE_CARD_PRODUCT_LIST_SUCCESS,
  CREATE_CARD_PRODUCT_LIST_FAILURE,
  UPDATE_CARD_PRODUCT_LIST,
  UPDATE_CARD_PRODUCT_LIST_SUCCESS,
  UPDATE_CARD_PRODUCT_LIST_FAILURE,
  DELETE_CARD_PRODUCT_LIST,
  DELETE_CARD_PRODUCT_LIST_SUCCESS,
  DELETE_CARD_PRODUCT_LIST_FAILURE,
} from "./CardProductListActions";

import { CardProductList } from "views/admin/CardProductList/components/table";

export interface CardProductListState {
  cardProductLists: CardProductList[];
  loading: boolean;
  error: string | null;
}

const initialState: CardProductListState = {
  cardProductLists: [],
  loading: false,
  error: null,
};

const cardProductListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_CARD_PRODUCT_LISTS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CARD_PRODUCT_LISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        cardProductLists: action.payload,
      };
    case FETCH_CARD_PRODUCT_LISTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_CARD_PRODUCT_LIST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_CARD_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        cardProductLists: [...state.cardProductLists, action.payload],
      };
    case CREATE_CARD_PRODUCT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_CARD_PRODUCT_LIST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_CARD_PRODUCT_LIST_SUCCESS:
      const updatedCardProductLists = state.cardProductLists.map((cardProductList) =>
        cardProductList.id === action.payload.id ? action.payload : cardProductList
      );
      return {
        ...state,
        loading: false,
        cardProductLists: updatedCardProductLists,
      };
    case UPDATE_CARD_PRODUCT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_CARD_PRODUCT_LIST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_CARD_PRODUCT_LIST_SUCCESS:
      const filteredCardProductLists = state.cardProductLists.filter(
        (cardProductList) => cardProductList.id !== action.payload
      );
      return {
        ...state,
        loading: false,
        cardProductLists: filteredCardProductLists,
      };
    case DELETE_CARD_PRODUCT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cardProductListReducer;
