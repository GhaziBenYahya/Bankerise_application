import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import CustomerService from 'services/CustomerService';
import { RootState } from 'store/store'; 
import { Customer } from 'views/admin/Customer/components/table';
import Swal from 'sweetalert2';


export const FETCH_CUSTOMERS: string = "FETCH_CUSTOMERS";
export const FETCH_CUSTOMERS_SUCCESS: string = "FETCH_CUSTOMERS_SUCCESS";
export const FETCH_CUSTOMERS_FAILURE: string = "FETCH_CUSTOMERS_FAILURE";

export const CREATE_CUSTOMER: string = "CREATE_CUSTOMER";
export const CREATE_CUSTOMER_SUCCESS: string = "CREATE_CUSTOMER_SUCCESS";
export const CREATE_CUSTOMER_FAILURE: string = "CREATE_CUSTOMER_FAILURE";

export const UPDATE_CUSTOMER: string = "UPDATE_CUSTOMER";
export const UPDATE_CUSTOMER_SUCCESS: string = "UPDATE_CUSTOMER_SUCCESS";
export const UPDATE_CUSTOMER_FAILURE: string = "UPDATE_CUSTOMER_FAILURE";

export const DELETE_CUSTOMER: string = "DELETE_CUSTOMER";
export const DELETE_CUSTOMER_SUCCESS: string = "DELETE_CUSTOMER_SUCCESS";
export const DELETE_CUSTOMER_FAILURE: string = "DELETE_CUSTOMER_FAILURE";


export const fetchCustomer = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await CustomerService.getCustomer();
      const customers: Customer[] = response.data;
      dispatch(fetchCustomersSuccess(customers));
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(fetchCustomersFailure(errorMessage));
    }
  };
};

export const fetchCustomersSuccess = (customers: Customer[]) => ({
  type: FETCH_CUSTOMERS_SUCCESS,
  payload: customers,
});

export const fetchCustomersFailure = (error: string) => ({
  type: FETCH_CUSTOMERS_FAILURE,
  payload: error,
});

export const createCustomer = (customer: Customer): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await CustomerService.createCustomer(customer);
      const newCustomer: Customer = response.data;
      dispatch(createCustomerSuccess(newCustomer));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(createCustomerFailure(errorMessage));
    }
  };
};

export const createCustomerSuccess = (customer: Customer) => ({
  type: CREATE_CUSTOMER_SUCCESS,
  payload: customer,
});

export const createCustomerFailure = (error: string) => ({
  type: CREATE_CUSTOMER_FAILURE,
  payload: error,
});

export const updateCustomer = (customer: Customer): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await CustomerService.updateCustomer(customer);
      const updatedCustomer: Customer = response.data;

      dispatch(updateCustomerSuccess(updatedCustomer));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(updateCustomerFailure(errorMessage));
    }
  };
};

export const updateCustomerSuccess = (customer: Customer) => ({
  type: UPDATE_CUSTOMER_SUCCESS,
  payload: customer,
});

export const updateCustomerFailure = (error: string) => ({
  type: UPDATE_CUSTOMER_FAILURE,
  payload: error,
});

export const deleteCustomer = (customerId: number): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    Swal.fire({
      text: 'Are you sure to delete this customer?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#ff6873'
    }).then( async(result) => {
      if (result.isConfirmed) {
   
    try {      
      console.log(customerId)
       CustomerService.deleteCustomer(customerId);
      dispatch(deleteCustomerSuccess(customerId));
      Swal.fire({
        text: 'The customer was deleted successfully',
        confirmButtonText: 'OK',
        icon: 'success',
        confirmButtonColor: '#979292'
      });
      
    } catch (error) {
      console.log(error); // Log the error to see the details
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(deleteCustomerFailure(errorMessage));}}
      else {
        Swal.fire({
          text: 'Cancelled',
          confirmButtonText: 'OK',
          icon: 'error',
          confirmButtonColor: '#ff6873'
        });}})}}

export const deleteCustomerSuccess = (customerId: number) => ({
  type: DELETE_CUSTOMER_SUCCESS,
  payload: customerId,
});

export const deleteCustomerFailure = (error: string) => ({
  type: DELETE_CUSTOMER_FAILURE,
  payload: error,
});
