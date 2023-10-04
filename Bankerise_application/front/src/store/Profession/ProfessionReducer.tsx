import {
  FETCH_PROFESSIONS,
  FETCH_PROFESSIONS_SUCCESS,
  FETCH_PROFESSIONS_FAILURE,
  CREATE_PROFESSION,
  CREATE_PROFESSION_SUCCESS,
  CREATE_PROFESSION_FAILURE,
  UPDATE_PROFESSION,
  UPDATE_PROFESSION_SUCCESS,
  UPDATE_PROFESSION_FAILURE,
  DELETE_PROFESSION,
  DELETE_PROFESSION_SUCCESS,
  DELETE_PROFESSION_FAILURE,
} from "./ProfessionActions";

import { Profession } from "views/admin/ProfessionList/components/table";

export interface ProfessionState {
  professions: Profession[];
  loading: boolean;
  error: string | null;
}

const initialState: ProfessionState = {
  professions: [],
  loading: false,
  error: null,
};

const professionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_PROFESSIONS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROFESSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        professions: action.payload,
      };
    case FETCH_PROFESSIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_PROFESSION:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_PROFESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        professions: [...state.professions, action.payload],
      };
    case CREATE_PROFESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PROFESSION:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_PROFESSION_SUCCESS:
      const updatedProfessions = state.professions.map((profession) =>
        profession.id === action.payload.id ? action.payload : profession
      );
      return {
        ...state,
        loading: false,
        professions: updatedProfessions,
      };
    case UPDATE_PROFESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PROFESSION:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_PROFESSION_SUCCESS:
      const filteredProfessions = state.professions.filter(
        (profession) => profession.id !== action.payload
      );
      return {
        ...state,
        loading: false,
        professions: filteredProfessions,
      };
    case DELETE_PROFESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default professionReducer;
