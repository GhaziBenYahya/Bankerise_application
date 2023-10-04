import { Bank } from "views/admin/BankList/components/table";
import BankService from "services/BankService";

export const FETCH_BANKS = "FETCH_BANKS";
export const FETCH_BANKS_SUCCESS = "FETCH_BANKS_SUCCESS";
export const FETCH_BANKS_FAILURE = "FETCH_BANKS_FAILURE";

export const CREATE_BANK = "CREATE_BANK";
export const CREATE_BANK_SUCCESS = "CREATE_BANK_SUCCESS";
export const CREATE_BANK_FAILURE = "CREATE_BANK_FAILURE";

export const UPDATE_BANK = "UPDATE_BANK";
export const UPDATE_BANK_SUCCESS = "UPDATE_BANK_SUCCESS";
export const UPDATE_BANK_FAILURE = "UPDATE_BANK_FAILURE";

export const DELETE_BANK = "DELETE_BANK";
export const DELETE_BANK_SUCCESS = "DELETE_BANK_SUCCESS";
export const DELETE_BANK_FAILURE = "DELETE_BANK_FAILURE";

export const fetchBanks = () => {
  return async (dispatch: any) => {
    try {
      const response = await BankService.getBanks();
      const banks: Bank[] = response.data;
      dispatch(fetchBanksSuccess(banks));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(fetchBanksFailure(errorMessage));
    }
  };
};

export const fetchBanksSuccess = (banks: Bank[]) => ({
  type: FETCH_BANKS_SUCCESS,
  payload: banks,
});

export const fetchBanksFailure = (error: string) => ({
  type: FETCH_BANKS_FAILURE,
  payload: error,
});

export const createBank = (bank: Bank) => {
  return async (dispatch: any) => {
    try {
      const response = await BankService.createBank(bank);
      const newBank: Bank = response.data;
      dispatch(createBankSuccess(newBank));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(createBankFailure(errorMessage));
    }
  };
};

export const createBankSuccess = (bank: Bank) => ({
  type: CREATE_BANK_SUCCESS,
  payload: bank,
});

export const createBankFailure = (error: string) => ({
  type: CREATE_BANK_FAILURE,
  payload: error,
});

export const updateBank = (bank: Bank) => {
  return async (dispatch: any) => {
    try {
      const response = await BankService.updateBank(bank);
      const updatedBank: Bank = response.data;
      dispatch(updateBankSuccess(updatedBank));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(updateBankFailure(errorMessage));
    }
  };
};

export const updateBankSuccess = (bank: Bank) => ({
  type: UPDATE_BANK_SUCCESS,
  payload: bank,
});

export const updateBankFailure = (error: string) => ({
  type: UPDATE_BANK_FAILURE,
  payload: error,
});

export const deleteBank = (bankId: string) => {
  return async (dispatch: any) => {
    try {
      await BankService.deleteBank(bankId);
      dispatch(deleteBankSuccess(bankId));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(deleteBankFailure(errorMessage));
    }
  };
};

export const deleteBankSuccess = (bankId: string) => ({
  type: DELETE_BANK_SUCCESS,
  payload: bankId,
});

export const deleteBankFailure = (error: string) => ({
  type: DELETE_BANK_FAILURE,
  payload: error,
});
