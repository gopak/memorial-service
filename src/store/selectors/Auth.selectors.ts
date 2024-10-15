import { RootState } from '../reducers';
import { UserState } from '../types/User.type';

export const selectUserState = (state: RootState): UserState => state.user;
export const selectUserAccessToken = (state: RootState) =>
  state.user.access_token;
export const selectUserProfile = (state: RootState) => state.user.profile;
export const selectUserGarage = (state: RootState) => ({
  garageCars: state.user.garageCars,
  garageCarsLoading: state.user.garageCarsLoading,
  garageCarsError: state.user.garageCarsError,
});

export const selectPromoteBiometricsPopup = (state: RootState) =>
  state.user.promoteBiometricsPopup;
