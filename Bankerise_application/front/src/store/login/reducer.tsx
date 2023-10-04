import { Reducer } from 'redux';
import { ActionTypes, AuthAction } from './actions';

interface User {
  id: number;
  username: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null; 
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  token: null, 
};

const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        token: null,
      };
      case ActionTypes.LOGOUT:
        return initialState;
      default:
        return state;
  }
};

export default authReducer;
