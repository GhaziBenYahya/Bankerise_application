import { SwiftAddress } from "views/admin/SwiftAddressList/components/table";
import SwiftAdressService from "services/SwiftAdressService";
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from 'store/store'; 


export const FETCH_SWIFTADDRESSES: string = "FETCH_SWIFTADDRESSES";
export const FETCH_SWIFTADDRESSES_SUCCESS: string = "FETCH_SWIFTADDRESSES_SUCCESS";
export const FETCH_SWIFTADDRESSES_FAILURE: string = "FETCH_SWIFTADDRESSES_FAILURE";

export const CREATE_SWIFTADDRESS: string = "CREATE_SWIFTADDRESS";
export const CREATE_SWIFTADDRESS_SUCCESS: string = "CREATE_SWIFTADDRESS_SUCCESS";
export const CREATE_SWIFTADDRESS_FAILURE: string = "CREATE_SWIFTADDRESS_FAILURE";

export const UPDATE_SWIFTADDRESS: string = "UPDATE_SWIFTADDRESS";
export const UPDATE_SWIFTADDRESS_SUCCESS: string = "UPDATE_SWIFTADDRESS_SUCCESS";
export const UPDATE_SWIFTADDRESS_FAILURE: string = "UPDATE_SWIFTADDRESS_FAILURE";

export const DELETE_SWIFTADDRESS: string = "DELETE_SWIFTADDRESS";
export const DELETE_SWIFTADDRESS_SUCCESS: string = "DELETE_SWIFTADDRESS_SUCCESS";
export const DELETE_SWIFTADDRESS_FAILURE: string = "DELETE_SWIFTADDRESS_FAILURE";

export const fetchSwiftAddresses = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await SwiftAdressService.getSwiftAddresses();
      const swiftAddresses: SwiftAddress[] = response.data;
      dispatch(fetchSwiftAddressesSuccess(swiftAddresses));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(fetchSwiftAddressesFailure(errorMessage));
    }
  };
};

export const fetchSwiftAddressesSuccess = (swiftAddresses: SwiftAddress[]) => ({
  type: FETCH_SWIFTADDRESSES_SUCCESS,
  payload: swiftAddresses,
});

export const fetchSwiftAddressesFailure = (error: string) => ({
  type: FETCH_SWIFTADDRESSES_FAILURE,
  payload: error,
});

export const createSwiftAddress = (swiftAddress: SwiftAddress): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await SwiftAdressService.createSwiftAddress(swiftAddress);
      const newSwiftAddress: SwiftAddress = response.data;
      dispatch(createSwiftAddressSuccess(newSwiftAddress));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(createSwiftAddressFailure(errorMessage));
    }
  };
};

export const createSwiftAddressSuccess = (swiftAddress: SwiftAddress) => ({
  type: CREATE_SWIFTADDRESS_SUCCESS,
  payload: swiftAddress,
});

export const createSwiftAddressFailure = (error: string) => ({
  type: CREATE_SWIFTADDRESS_FAILURE,
  payload: error,
});

export const updateSwiftAddress = (swiftAddress: SwiftAddress): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await SwiftAdressService.updateSwiftAddress(swiftAddress);
      const updatedSwiftAddress: SwiftAddress = response.data;
      dispatch(updateSwiftAddressSuccess(updatedSwiftAddress));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(updateSwiftAddressFailure(errorMessage));
    }
  };
};

export const updateSwiftAddressSuccess = (swiftAddress: SwiftAddress) => ({
  type: UPDATE_SWIFTADDRESS_SUCCESS,
  payload: swiftAddress,
});

export const updateSwiftAddressFailure = (error: string) => ({
  type: UPDATE_SWIFTADDRESS_FAILURE,
  payload: error,
});

export const deleteSwiftAddress = (swiftAddressId: string): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      await SwiftAdressService.deleteSwiftAddress(swiftAddressId);
      dispatch(deleteSwiftAddressSuccess(swiftAddressId));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(deleteSwiftAddressFailure(errorMessage));
    }
  };
};

export const deleteSwiftAddressSuccess = (swiftAddressId: string) => ({
  type: DELETE_SWIFTADDRESS_SUCCESS,
  payload: swiftAddressId,
});

export const deleteSwiftAddressFailure = (error: string) => ({
  type: DELETE_SWIFTADDRESS_FAILURE,
  payload: error,
});
