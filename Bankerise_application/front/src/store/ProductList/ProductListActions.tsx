import { ProductList } from "views/admin/ProductList/components/table";
import ProductListService from "services/ProductListService";
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from "store/store";

export const FETCH_PRODUCT_LISTS: string = "FETCH_PRODUCT_LISTS";
export const FETCH_PRODUCT_LISTS_SUCCESS: string = "FETCH_PRODUCT_LISTS_SUCCESS";
export const FETCH_PRODUCT_LISTS_FAILURE: string = "FETCH_PRODUCT_LISTS_FAILURE";

export const CREATE_PRODUCT_LIST: string = "CREATE_PRODUCT_LIST";
export const CREATE_PRODUCT_LIST_SUCCESS: string = "CREATE_PRODUCT_LIST_SUCCESS";
export const CREATE_PRODUCT_LIST_FAILURE: string = "CREATE_PRODUCT_LIST_FAILURE";

export const UPDATE_PRODUCT_LIST: string = "UPDATE_PRODUCT_LIST";
export const UPDATE_PRODUCT_LIST_SUCCESS: string = "UPDATE_PRODUCT_LIST_SUCCESS";
export const UPDATE_PRODUCT_LIST_FAILURE: string = "UPDATE_PRODUCT_LIST_FAILURE";

export const DELETE_PRODUCT_LIST: string = "DELETE_PRODUCT_LIST";
export const DELETE_PRODUCT_LIST_SUCCESS: string = "DELETE_PRODUCT_LIST_SUCCESS";
export const DELETE_PRODUCT_LIST_FAILURE: string = "DELETE_PRODUCT_LIST_FAILURE";

export const fetchProductLists = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await ProductListService.getProductLists();
      const productLists: ProductList[] = response.data;
      dispatch(fetchProductListsSuccess(productLists));
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(fetchProductListsFailure(errorMessage));
    }
  };
};

export const fetchProductListsSuccess = (productLists: ProductList[]) => ({
  type: FETCH_PRODUCT_LISTS_SUCCESS,
  payload: productLists,
});

export const fetchProductListsFailure = (error: string) => ({
  type: FETCH_PRODUCT_LISTS_FAILURE,
  payload: error,
});

export const createProductList = (productList: ProductList): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await ProductListService.createProductList(productList);
      const newProductList: ProductList = response.data;
      dispatch(createProductListSuccess(newProductList));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(createProductListFailure(errorMessage));
    }
  };
};

export const createProductListSuccess = (productList: ProductList) => ({
  type: CREATE_PRODUCT_LIST_SUCCESS,
  payload: productList,
});

export const createProductListFailure = (error: string) => ({
  type: CREATE_PRODUCT_LIST_FAILURE,
  payload: error,
});

export const updateProductList = (productList: ProductList): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await ProductListService.updateProductList(productList);
      const updatedProductList: ProductList = response.data;
      dispatch(updateProductListSuccess(updatedProductList));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(updateProductListFailure(errorMessage));
    }
  };
};

export const updateProductListSuccess = (productList: ProductList) => ({
  type: UPDATE_PRODUCT_LIST_SUCCESS,
  payload: productList,
});

export const updateProductListFailure = (error: string) => ({
  type: UPDATE_PRODUCT_LIST_FAILURE,
  payload: error,
});

export const deleteProductList = (productListId: string): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      await ProductListService.deleteProductList(productListId);
      dispatch(deleteProductListSuccess(productListId));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(deleteProductListFailure(errorMessage));
    }
  };
};

export const deleteProductListSuccess = (productListId: string) => ({
  type: DELETE_PRODUCT_LIST_SUCCESS,
  payload: productListId,
});

export const deleteProductListFailure = (error: string) => ({
  type: DELETE_PRODUCT_LIST_FAILURE,
  payload: error,
});
