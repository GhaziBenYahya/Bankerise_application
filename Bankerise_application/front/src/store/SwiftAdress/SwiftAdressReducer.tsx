import {
    FETCH_SWIFTADDRESSES,
    FETCH_SWIFTADDRESSES_SUCCESS,
    FETCH_SWIFTADDRESSES_FAILURE,
    CREATE_SWIFTADDRESS,
    CREATE_SWIFTADDRESS_SUCCESS,
    CREATE_SWIFTADDRESS_FAILURE,
    UPDATE_SWIFTADDRESS,
    UPDATE_SWIFTADDRESS_SUCCESS,
    UPDATE_SWIFTADDRESS_FAILURE,
    DELETE_SWIFTADDRESS,
    DELETE_SWIFTADDRESS_SUCCESS,
    DELETE_SWIFTADDRESS_FAILURE,
  } from "./SwiftAdressActions";
  
  import { SwiftAddress } from "views/admin/SwiftAddressList/components/table";
  
  export interface SwiftAddressState {
    swiftAddresses: SwiftAddress[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: SwiftAddressState = {
    swiftAddresses: [],
    loading: false,
    error: null,
  };
  
  const swiftAddressReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_SWIFTADDRESSES:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_SWIFTADDRESSES_SUCCESS:
        return {
          ...state,
          loading: false,
          swiftAddresses: action.payload,
        };
      case FETCH_SWIFTADDRESSES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CREATE_SWIFTADDRESS:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CREATE_SWIFTADDRESS_SUCCESS:
        return {
          ...state,
          loading: false,
          swiftAddresses: [...state.swiftAddresses, action.payload],
        };
      case CREATE_SWIFTADDRESS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_SWIFTADDRESS:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case UPDATE_SWIFTADDRESS_SUCCESS:
        const updatedSwiftAddresses = state.swiftAddresses.map((swiftAddress) =>
          swiftAddress.id === action.payload.id ? action.payload : swiftAddress
        );
        return {
          ...state,
          loading: false,
          swiftAddresses: updatedSwiftAddresses,
        };
      case UPDATE_SWIFTADDRESS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_SWIFTADDRESS:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case DELETE_SWIFTADDRESS_SUCCESS:
        const filteredSwiftAddresses = state.swiftAddresses.filter(
          (swiftAddress) => swiftAddress.id !== action.payload
        );
        return {
          ...state,
          loading: false,
          swiftAddresses: filteredSwiftAddresses,
        };
      case DELETE_SWIFTADDRESS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default swiftAddressReducer;
  