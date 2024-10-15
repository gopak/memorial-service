import { DEFAULT_MESSAGES_ERROR, UserType } from "../../app.types";

export interface AuthModel {
  uid: string;
  email: string;
  accessToken: string;
  expirationTime: number;
  refreshToken: string;
  userType: UserType;
}

export interface FirebaseCurrentUser {
  uid: string;
  email: string;
  displayName: UserType;
  stsTokenManager: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
  };
}
export const INVALID_AUTHORIZATION_MESSAGES = {
  DEFAULT_ERROR: DEFAULT_MESSAGES_ERROR,
  EMAIL_EXISTS:
    "Користувач із цією електронною адресою вже існує. Будь ласка, використовуйте іншу електронну адресу або увійдіть",
  PASSWORD: "Недійсний пароль",
};
