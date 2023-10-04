import {
    FETCH_INDUSTRIES,
    FETCH_INDUSTRIES_SUCCESS,
    FETCH_INDUSTRIES_FAILURE,
    CREATE_INDUSTRY,
    CREATE_INDUSTRY_SUCCESS,
    CREATE_INDUSTRY_FAILURE,
    UPDATE_INDUSTRY,
    UPDATE_INDUSTRY_SUCCESS,
    UPDATE_INDUSTRY_FAILURE,
    DELETE_INDUSTRY,
    DELETE_INDUSTRY_SUCCESS,
    DELETE_INDUSTRY_FAILURE,
  } from "./IndustryActions";
  
  import { Industry } from "views/admin/IndustryList/components/table";
  
  export interface IndustryState {
    industries: Industry[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: IndustryState = {
    industries: [],
    loading: false,
    error: null,
  };
  
  const industryReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_INDUSTRIES:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_INDUSTRIES_SUCCESS:
        return {
          ...state,
          loading: false,
          industries: action.payload,
        };
      case FETCH_INDUSTRIES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CREATE_INDUSTRY:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CREATE_INDUSTRY_SUCCESS:
        return {
          ...state,
          loading: false,
          industries: [...state.industries, action.payload],
        };
      case CREATE_INDUSTRY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_INDUSTRY:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case UPDATE_INDUSTRY_SUCCESS:
        const updatedIndustries = state.industries.map((industry) =>
          industry.id === action.payload.id ? action.payload : industry
        );
        return {
          ...state,
          loading: false,
          industries: updatedIndustries,
        };
      case UPDATE_INDUSTRY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_INDUSTRY:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case DELETE_INDUSTRY_SUCCESS:
        const filteredIndustries = state.industries.filter(
          (industry) => industry.id !== action.payload
        );
        return {
          ...state,
          loading: false,
          industries: filteredIndustries,
        };
      case DELETE_INDUSTRY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default industryReducer;
  