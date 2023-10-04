import {
  FETCH_PRODUCT_LISTS,
  FETCH_PRODUCT_LISTS_SUCCESS,
  FETCH_PRODUCT_LISTS_FAILURE,
  CREATE_PRODUCT_LIST,
  CREATE_PRODUCT_LIST_SUCCESS,
  CREATE_PRODUCT_LIST_FAILURE,
  UPDATE_PRODUCT_LIST,
  UPDATE_PRODUCT_LIST_SUCCESS,
  UPDATE_PRODUCT_LIST_FAILURE,
  DELETE_PRODUCT_LIST,
  DELETE_PRODUCT_LIST_SUCCESS,
  DELETE_PRODUCT_LIST_FAILURE,
} from "./ProductListActions";

import { ProductList } from "views/admin/ProductList/components/table";

export interface ProductListState {
  productLists: ProductList[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductListState = {
  productLists: [],
  loading: false,
  error: null,
};

const productListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_PRODUCT_LISTS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PRODUCT_LISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        productLists: action.payload,
      };
    case FETCH_PRODUCT_LISTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_PRODUCT_LIST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        productLists: [...state.productLists, action.payload],
      };
    case CREATE_PRODUCT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PRODUCT_LIST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_PRODUCT_LIST_SUCCESS:
      const updatedProductLists = state.productLists.map((productList) =>
        productList.id === action.payload.id ? action.payload : productList
      );
      return {
        ...state,
        loading: false,
        productLists: updatedProductLists,
      };
    case UPDATE_PRODUCT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PRODUCT_LIST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_PRODUCT_LIST_SUCCESS:
      const filteredProductLists = state.productLists.filter(
        (productList) => productList.id !== action.payload
      );
      return {
        ...state,
        loading: false,
        productLists: filteredProductLists,
      };
    case DELETE_PRODUCT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productListReducer;
