import { Profession } from "views/admin/ProfessionList/components/table";
import ProfessionService from "services/ProfessionService";
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from 'store/store'; 


export const FETCH_PROFESSIONS: string = "FETCH_PROFESSIONS";
export const FETCH_PROFESSIONS_SUCCESS: string = "FETCH_PROFESSIONS_SUCCESS";
export const FETCH_PROFESSIONS_FAILURE: string = "FETCH_PROFESSIONS_FAILURE";

export const CREATE_PROFESSION: string = "CREATE_PROFESSION";
export const CREATE_PROFESSION_SUCCESS: string = "CREATE_PROFESSION_SUCCESS";
export const CREATE_PROFESSION_FAILURE: string = "CREATE_PROFESSION_FAILURE";

export const UPDATE_PROFESSION: string = "UPDATE_PROFESSION";
export const UPDATE_PROFESSION_SUCCESS: string = "UPDATE_PROFESSION_SUCCESS";
export const UPDATE_PROFESSION_FAILURE: string = "UPDATE_PROFESSION_FAILURE";

export const DELETE_PROFESSION: string = "DELETE_PROFESSION";
export const DELETE_PROFESSION_SUCCESS: string = "DELETE_PROFESSION_SUCCESS";
export const DELETE_PROFESSION_FAILURE: string = "DELETE_PROFESSION_FAILURE";

export const fetchProfessions = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await ProfessionService.getProfessions();
      const professions: Profession[] = response.data;
      dispatch(fetchProfessionsSuccess(professions));
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(fetchProfessionsFailure(errorMessage));
    }
  };
};

export const fetchProfessionsSuccess = (professions: Profession[]) => ({
  type: FETCH_PROFESSIONS_SUCCESS,
  payload: professions,
});

export const fetchProfessionsFailure = (error: string) => ({
  type: FETCH_PROFESSIONS_FAILURE,
  payload: error,
});

export const createProfession = (profession: Profession): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await ProfessionService.createProfession(profession);
      const newProfession: Profession = response.data;
      dispatch(createProfessionSuccess(newProfession));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(createProfessionFailure(errorMessage));
    }
  };
};

export const createProfessionSuccess = (profession: Profession) => ({
  type: CREATE_PROFESSION_SUCCESS,
  payload: profession,
});

export const createProfessionFailure = (error: string) => ({
  type: CREATE_PROFESSION_FAILURE,
  payload: error,
});

export const updateProfession = (profession: Profession): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await ProfessionService.updateProfession(profession);
      const updatedProfession: Profession = response.data;
      dispatch(updateProfessionSuccess(updatedProfession));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(updateProfessionFailure(errorMessage));
    }
  };
};

export const updateProfessionSuccess = (profession: Profession) => ({
  type: UPDATE_PROFESSION_SUCCESS,
  payload: profession,
});

export const updateProfessionFailure = (error: string) => ({
  type: UPDATE_PROFESSION_FAILURE,
  payload: error,
});

export const deleteProfession = (professionId: string): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      await ProfessionService.deleteProfession(professionId);
      dispatch(deleteProfessionSuccess(professionId));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(deleteProfessionFailure(errorMessage));
    }
  };
};

export const deleteProfessionSuccess = (professionId: string) => ({
  type: DELETE_PROFESSION_SUCCESS,
  payload: professionId,
});

export const deleteProfessionFailure = (error: string) => ({
  type: DELETE_PROFESSION_FAILURE,
  payload: error,
});