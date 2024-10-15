import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  loginAttempt,
  loginError,
  loginSuccess,
} from "../../store/actions/Auth.action";
import { AuthModel, FirebaseCurrentUser } from "./Auth.model";
import { UserCredential } from "@firebase/auth";
import { createCustomerProfile } from "../customer/Customer.service";
import { CustomerPayload } from "../customer/Customer.model";
import { auth, paresFirebaseErrors } from "../../firebase/Firebase.service";
import { UserType } from "../../app.types";
import { createConsultantProfile } from "../consultant/Consultant.service";
import { clearCustomerSate } from "../../store/actions/Customer.action";
import { clearConsultantSate } from "../../store/actions/Consultant.action";

export const createUser =
  (
    userType: UserType,
    email: string,
    password: string,
    payload: CustomerPayload,
  ) =>
  async (dispatch): Promise<UserCredential> => {
    dispatch(loginAttempt());
    console.log("authService createUser attempt");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log("authService createUser success 1", userCredential);

      const user = userCredential.user.toJSON() as FirebaseCurrentUser;

      await updateProfile(userCredential.user, { displayName: userType });

      const userAuth: AuthModel = {
        uid: user.uid,
        email: user.email,
        accessToken: user?.stsTokenManager?.accessToken,
        expirationTime: user?.stsTokenManager?.expirationTime,
        refreshToken: user?.stsTokenManager?.refreshToken,
        userType,
      };

      let dispatchRequest;

      switch (userType) {
        case "customer":
          dispatchRequest = createCustomerProfile(user.uid, payload);
          break;
        case "consultant":
          dispatchRequest = createConsultantProfile(user.uid, payload);
          break;
        case "ritual-service":
          break;
      }

      await dispatch(dispatchRequest);

      setAuthInLocalStorage(userAuth);
      dispatch(loginSuccess(userAuth));

      return userCredential;
    } catch (error: any) {
      console.log("authService createUser error", {
        error,
        errorCode: error?.code,
        errorMessage: error.message,
      });
      dispatch(
        loginError({
          detail: paresFirebaseErrors(error?.code),
        }),
      );
      throw new Error();
    }
  };

export const loginUser =
  (email: string, password: string, userType: UserType) =>
  async (dispatch): Promise<UserCredential> => {
    dispatch(loginAttempt());
    console.log("authService loginUser attempt");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log("authService loginUser success", userCredential);
      const user = userCredential.user.toJSON() as FirebaseCurrentUser;
      const userAuth: AuthModel = {
        uid: user.uid,
        email: user.email,
        accessToken: user?.stsTokenManager?.accessToken,
        expirationTime: user?.stsTokenManager?.expirationTime,
        refreshToken: user?.stsTokenManager?.refreshToken,
        userType: user.displayName,
      };
      setAuthInLocalStorage(userAuth);
      dispatch(loginSuccess(userAuth));

      return userCredential;
    } catch (error: any) {
      console.log("authService loginUser error", {
        error,
        errorCode: error?.code,
        errorMessage: error.message,
      });
      dispatch(
        loginError({
          detail: paresFirebaseErrors(error?.code),
        }),
      );
      throw new Error();
    }
  };

export const logOut =
  () =>
  async (dispatch): Promise<void> => {
    try {
      await signOut(auth);
      console.log("authService logOut success");
      setAuthInLocalStorage(null);
      dispatch(loginSuccess(null));
      dispatch(clearCustomerSate());
      dispatch(clearConsultantSate());
    } catch (error) {
      console.log("authService logOut", error);
      throw new Error();
    }
  };

export const setAuthInLocalStorage = (userAuth: AuthModel | null): void => {
  localStorage.setItem("auth", userAuth ? JSON.stringify(userAuth) : "");
};
