import * as types from "../actions/Auth.action";
import { AuthModel } from "../../services/auth/Auth.model";

export interface AuthState extends AuthModel {
    loading: boolean;
}

const initialState: AuthState = {
    uid: "",
    email: "",
    accessToken: "",
    expirationTime: 0,
    refreshToken: "",
    loading: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_ATTEMPT:
            return {
                ...state,
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
                loading: false,
            };
        case types.LOGIN_ERROR:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
