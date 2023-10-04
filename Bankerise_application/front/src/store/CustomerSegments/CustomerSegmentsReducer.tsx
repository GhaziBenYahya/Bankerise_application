import {
  FETCH_CUSTOMERS,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILURE,
  CREATE_CUSTOMER,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAILURE,
  UPDATE_CUSTOMER,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAILURE,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILURE,
} from "./CustomerSegmentsActions";

import { Customer } from "views/admin/CustomerSegments/components/table";

export interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  customers: [],
  loading: false,
  error: null,
};

const customerSettingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_CUSTOMERS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CUSTOMERS_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: action.payload,
      };
    case FETCH_CUSTOMERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_CUSTOMER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: [...state.customers, action.payload],
      };
    case CREATE_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_CUSTOMER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_CUSTOMER_SUCCESS:
      const updatedCustomers = state.customers.map((customer) =>
        customer.id === action.payload.id ? action.payload : customer
      );
      return {
        ...state,
        loading: false,
        customers: updatedCustomers,
      };
    case UPDATE_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_CUSTOMER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_CUSTOMER_SUCCESS:
      const filteredCustomers = state.customers.filter(
        (customer) =>customer.id !== action.payload
      


      );
      console.log(action.payload)

      console.log(filteredCustomers)

      return {
        ...state,
        loading: false,
        customers: filteredCustomers,
      };
    case DELETE_CUSTOMER_FAILURE:
      console.log(action.payload)

      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default customerSettingReducer;
