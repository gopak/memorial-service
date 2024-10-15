import { AuthModel } from "../../services/auth/Auth.model";

export const LOGIN_ATTEMPT = "LOGIN_ATTEMPT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";


export const loginAttempt = () => ({
    type: LOGIN_ATTEMPT,
});

export const loginSuccess = (payload: AuthModel) => ({
    type: LOGIN_SUCCESS,
    payload,
});
export const loginError = (error) => ({
    type: LOGIN_SUCCESS,
    error,
});