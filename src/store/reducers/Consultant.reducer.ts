import * as types from "../actions/Customer.action";
import { Customer } from "../../services/customer/Customer.model";
import { RequestError } from "../../app.types";

export interface CustomerState {
  profile: Customer | null;
  profileLoading: boolean;
  error: RequestError | null;
}

const initialState: CustomerState = {
  profile: null,
  profileLoading: false,
  error: null,
};

export const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CUSTOMER_PROFILE_ATTEMPT:
      return {
        ...state,
        profileLoading: true,
      };
    case types.GET_CUSTOMER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        profileLoading: false,
      };
    case types.GET_CUSTOMER_PROFILE_ERROR:
      return {
        ...state,
        error: action.error,
        profileLoading: false,
      };
    default:
      return state;
  }
};
