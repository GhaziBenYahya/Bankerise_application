import { combineReducers } from 'redux';
import authReducer, { AuthState } from './reducer'; 

export interface RootState {
  auth: AuthState;
}

const authrootReducer = combineReducers<RootState>({
  auth: authReducer,
});

export default authrootReducer;
