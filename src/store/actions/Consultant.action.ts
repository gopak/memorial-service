import { Customer } from "../../services/customer/Customer.model";
import { RequestError } from "../../app.types";

export const GET_CUSTOMER_PROFILE_ATTEMPT = "GET_CUSTOMER_PROFILE_ATTEMPT";
export const GET_CUSTOMER_PROFILE_SUCCESS = "GET_CUSTOMER_PROFILE_SUCCESS";
export const GET_CUSTOMER_PROFILE_ERROR = "GET_CUSTOMER_PROFILE_ERROR";

export const getCustomerProfileAttempt = () => ({
  type: GET_CUSTOMER_PROFILE_ATTEMPT,
});

export const getCustomerProfileSuccess = (payload: Customer) => ({
  type: GET_CUSTOMER_PROFILE_SUCCESS,
  payload,
});
export const getCustomerProfileError = (error: RequestError) => ({
  type: GET_CUSTOMER_PROFILE_ERROR,
  error,
});
