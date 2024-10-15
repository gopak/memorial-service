import { AuthModel } from "../../services/auth/Auth.model";
import { RequestError } from "../../app.types";

export const LOGIN_ATTEMPT = "LOGIN_ATTEMPT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const CLEAR_LOGIN_ERROR = "CLEAR_LOGIN_ERROR";

export const loginAttempt = () => ({
  type: LOGIN_ATTEMPT,
});

export const loginSuccess = (payload: AuthModel | null) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginError = (error: RequestError) => ({
  type: LOGIN_ERROR,
  error,
});

export const clearLoginError = () => ({
  type: CLEAR_LOGIN_ERROR,
});
