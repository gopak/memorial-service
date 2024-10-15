import { RootState } from "../reducers";
import { CustomerState } from "../reducers/Customer.reducer";

export const selectCustomerState = (state: RootState): CustomerState => state.customer;

