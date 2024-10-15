import { RootState } from "../reducers";
import { AuthState } from "../reducers/Auth.reducer";

export const selectAuthState = (state: RootState): AuthState => state.auth;

