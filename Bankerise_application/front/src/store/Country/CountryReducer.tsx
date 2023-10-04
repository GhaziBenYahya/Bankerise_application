import {
  FETCH_COUNTRIES,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
  CREATE_COUNTRY,
  CREATE_COUNTRY_SUCCESS,
  CREATE_COUNTRY_FAILURE,
  UPDATE_COUNTRY,
  UPDATE_COUNTRY_SUCCESS,
  UPDATE_COUNTRY_FAILURE,
  DELETE_COUNTRY,
  DELETE_COUNTRY_SUCCESS,
  DELETE_COUNTRY_FAILURE,
} from "./CountryActions";

import { Country } from "views/admin/CountryList/components/table";

export interface CountryState {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
};

const countryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_COUNTRIES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        countries: action.payload,
      };
    case FETCH_COUNTRIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_COUNTRY:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_COUNTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        countries: [...state.countries, action.payload],
      };
    case CREATE_COUNTRY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_COUNTRY:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_COUNTRY_SUCCESS:
      const updatedCountries = state.countries.map((country) =>
        country.id === action.payload.id ? action.payload : country
      );
      return {
        ...state,
        loading: false,
        countries: updatedCountries,
      };
    case UPDATE_COUNTRY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_COUNTRY:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_COUNTRY_SUCCESS:
      const filteredCountries = state.countries.filter(
        (country) => country.id !== action.payload
      );
      return {
        ...state,
        loading: false,
        countries: filteredCountries,
      };
    case DELETE_COUNTRY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default countryReducer;
