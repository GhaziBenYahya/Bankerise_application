import {
    FETCH_BANKS,
    FETCH_BANKS_SUCCESS,
    FETCH_BANKS_FAILURE,
    CREATE_BANK,
    CREATE_BANK_SUCCESS,
    CREATE_BANK_FAILURE,
    UPDATE_BANK,
    UPDATE_BANK_SUCCESS,
    UPDATE_BANK_FAILURE,
    DELETE_BANK,
    DELETE_BANK_SUCCESS,
    DELETE_BANK_FAILURE,
} from "./bankActions";
  
import { Bank } from "views/admin/BankList/components/table";
  
  export interface BankState {
    banks: Bank[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: BankState = {
    banks: [],
    loading: false,
    error: null,
  };
  
  const bankReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_BANKS:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_BANKS_SUCCESS:
        return {
          ...state,
          loading: false,
          banks: action.payload,
        };
      case FETCH_BANKS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CREATE_BANK:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CREATE_BANK_SUCCESS:
        return {
          ...state,
          loading: false,
          banks: [...state.banks, action.payload],
        };
      case CREATE_BANK_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_BANK:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case UPDATE_BANK_SUCCESS:
        const updatedBanks = state.banks.map((bank) =>
          bank.id === action.payload.id ? action.payload : bank
        );
        return {
          ...state,
          loading: false,
          banks: updatedBanks,
        };
      case UPDATE_BANK_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_BANK:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case DELETE_BANK_SUCCESS:
        const filteredBanks = state.banks.filter(
          (bank) => bank.id !== action.payload
        );
        return {
          ...state,
          loading: false,
          banks: filteredBanks,
        };
      case DELETE_BANK_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default bankReducer;
  