import * as types from "../actions/Auth";
import { AuthModel } from "../../services/auth/Auth.model";

export interface AuthState extends AuthModel {
    loading: boolean;
}

const initialState: AuthState = {
    email: "",
    idToken: "",
    localId: "",
    expiresIn: "",
    refreshToken: "",
    loading: false,
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_ATTEMPT:
            return {
                ...state,
                loading: true,
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                email: action.payload.email,
                idToken: action.payload.idToken,
                localId: action.payload.localId,
                expiresIn: action.payload.expiresIn,
                refreshToken: action.payload.refreshToken,
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
