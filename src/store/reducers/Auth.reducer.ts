import * as types from "../actions/Auth.action";
import { AuthModel } from "../../services/auth/Auth.model";
import { RequestError } from "../../app.types";

export interface AuthState extends AuthModel {
  loading: boolean;
  error: RequestError | null;
}

const initialState: AuthState = {
  uid: "",
  email: "",
  accessToken: "",
  expirationTime: 0,
  refreshToken: "",
  userType: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_ATTEMPT:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        uid: action.payload?.uid,
        email: action.payload?.email,
        accessToken: action.payload?.accessToken,
        expirationTime: action.payload?.expirationTime,
        refreshToken: action.payload?.refreshToken,
        userType: action.payload?.userType,
        loading: false,
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case types.CLEAR_LOGIN_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
