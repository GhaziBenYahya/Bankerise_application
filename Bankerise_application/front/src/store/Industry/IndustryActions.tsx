import { Industry } from "views/admin/IndustryList/components/table";
import IndustryService from "services/IndustryService";
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from "store/store";

export const FETCH_INDUSTRIES: string = "FETCH_INDUSTRIES";
export const FETCH_INDUSTRIES_SUCCESS: string = "FETCH_INDUSTRIES_SUCCESS";
export const FETCH_INDUSTRIES_FAILURE: string = "FETCH_INDUSTRIES_FAILURE";

export const CREATE_INDUSTRY: string = "CREATE_INDUSTRY";
export const CREATE_INDUSTRY_SUCCESS: string = "CREATE_INDUSTRY_SUCCESS";
export const CREATE_INDUSTRY_FAILURE: string = "CREATE_INDUSTRY_FAILURE";

export const UPDATE_INDUSTRY: string = "UPDATE_INDUSTRY";
export const UPDATE_INDUSTRY_SUCCESS: string = "UPDATE_INDUSTRY_SUCCESS";
export const UPDATE_INDUSTRY_FAILURE: string = "UPDATE_INDUSTRY_FAILURE";

export const DELETE_INDUSTRY: string = "DELETE_INDUSTRY";
export const DELETE_INDUSTRY_SUCCESS: string = "DELETE_INDUSTRY_SUCCESS";
export const DELETE_INDUSTRY_FAILURE: string = "DELETE_INDUSTRY_FAILURE";

export const fetchIndustries = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await IndustryService.getIndustries();
      const industries: Industry[] = response.data;
      dispatch(fetchIndustriesSuccess(industries));
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(fetchIndustriesFailure(errorMessage));
    }
  };
};

export const fetchIndustriesSuccess = (industries: Industry[]) => ({
  type: FETCH_INDUSTRIES_SUCCESS,
  payload: industries,
});

export const fetchIndustriesFailure = (error: string) => ({
  type: FETCH_INDUSTRIES_FAILURE,
  payload: error,
});

export const createIndustry = (industry: Industry): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await IndustryService.createIndustry(industry);
      const newIndustry: Industry = response.data;
      dispatch(createIndustrySuccess(newIndustry));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(createIndustryFailure(errorMessage));
    }
  };
};

export const createIndustrySuccess = (industry: Industry) => ({
  type: CREATE_INDUSTRY_SUCCESS,
  payload: industry,
});

export const createIndustryFailure = (error: string) => ({
  type: CREATE_INDUSTRY_FAILURE,
  payload: error,
});

export const updateIndustry = (industry: Industry): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await IndustryService.updateIndustry(industry);
      const updatedIndustry: Industry = response.data;
      dispatch(updateIndustrySuccess(updatedIndustry));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(updateIndustryFailure(errorMessage));
    }
  };
};

export const updateIndustrySuccess = (industry: Industry) => ({
  type: UPDATE_INDUSTRY_SUCCESS,
  payload: industry,
});

export const updateIndustryFailure = (error: string) => ({
  type: UPDATE_INDUSTRY_FAILURE,
  payload: error,
});

export const deleteIndustry = (industryId: string): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      await IndustryService.deleteIndustry(industryId);
      dispatch(deleteIndustrySuccess(industryId));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(deleteIndustryFailure(errorMessage));
    }
  };
};

export const deleteIndustrySuccess = (industryId: string) => ({
  type: DELETE_INDUSTRY_SUCCESS,
  payload: industryId,
});

export const deleteIndustryFailure = (error: string) => ({
  type: DELETE_INDUSTRY_FAILURE,
  payload: error,
});
