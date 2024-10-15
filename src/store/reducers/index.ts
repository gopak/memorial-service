import { combineReducers } from "redux";

import { authReducer, AuthState } from "./Auth.reducer";
import { Reducer } from "@reduxjs/toolkit";
import { customerReducer, CustomerState } from "./Customer.reducer";
import { consultantReducer, ConsultantState } from "./Consultant.reducer";

export interface RootState {
  auth: AuthState;
  customer: CustomerState;
  consultant: ConsultantState;
}
const rootReducer: Reducer<RootState> = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  consultant: consultantReducer,
});

export default rootReducer;
