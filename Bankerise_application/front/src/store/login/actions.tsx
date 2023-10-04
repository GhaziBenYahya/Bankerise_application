import { Action } from 'redux';

export enum ActionTypes {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT = 'LOGOUT', 
}

export interface User {
  id: number;
  username: string;
  token: string; 
}

interface LoginRequestAction extends Action<ActionTypes.LOGIN_REQUEST> {
  payload: {
    username: string;
    password: string;
  };
}

interface LoginSuccessAction extends Action<ActionTypes.LOGIN_SUCCESS> {
  payload: {
    user: User;
    token: string; 
  };
}

interface LoginFailureAction extends Action<ActionTypes.LOGIN_FAILURE> {
  payload: {
    error: string;
  };
}

interface LogoutAction extends Action<ActionTypes.LOGOUT> {} 

export type AuthAction = LoginRequestAction | LoginSuccessAction | LoginFailureAction | LogoutAction;

export const loginRequest = (username: string, password: string): AuthAction => ({
  type: ActionTypes.LOGIN_REQUEST,
  payload: { username, password },
});

export const loginSuccess = (user: User, token: string): AuthAction => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload: { user, token },
});

export const loginFailure = (error: string): AuthAction => ({
  type: ActionTypes.LOGIN_FAILURE,
  payload: { error },
});

export const logout = (): AuthAction => ({
  type: ActionTypes.LOGOUT,
});
