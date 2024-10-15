import { INVALID_AUTHORIZATION_MESSAGES } from "../services/auth/Auth.model";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./Firebase.config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const paresFirebaseErrors = (errorCode: string): string => {
  let message: string;

  switch (errorCode) {
    case "auth/invalid-credential":
      message = "auth/invalid-credential";
      break;
    case "auth/wrong-password":
      message = INVALID_AUTHORIZATION_MESSAGES.PASSWORD;
      break;
    case "auth/email-already-in-use":
      message = INVALID_AUTHORIZATION_MESSAGES.EMAIL_EXISTS;
      break;
    case "auth/weak-password":
      message = "auth/weak-password";
      break;
    case "auth/network-request-failed":
      message = "auth/network-request-failed";
      break;
    case "auth/too-many-requests":
      message = "auth/too-many-requests";
      break;
    case "auth/user-disabled":
      message = "auth/user-disabled";
      break;
    case "auth/requires-recent-login":
      message = "auth/requires-recent-login";
      break;
    case "auth/email-already-exists":
      message = "auth/requires-recent-login";
      break;
    case "auth/credential-already-in-use":
      message = "auth/credential-already-in-use";
      break;
    case "provider-email-already-exists":
      message = "provider-email-already-exists";
      break;
    case "provider-without-email":
      message = "provider-without-email";
      break;
    case "auth/user-not-found":
      message = "auth/user-not-found";
      break;
    case "auth/account-exists-with-different-credential":
      message = "auth/account-exists-with-different-credential";
      break;
    case "auth/phone-number-already-exists":
      message = "auth/phone-number-already-exists";
      break;
    case "auth/invalid-email":
      message = "auth/invalid-email";
      break;
    case "auth/cannot-delete-own-user-account":
      message = "You cannot delete your own user account.";
      break;
    case "auth/invalid-verification-code":
      message = "auth/invalid-verification-code";
      break;
    case "auth/captcha-check-failed":
      message = "auth/captcha-check-failed";
      break;
    case "auth/invalid-phone-number":
      message = "auth/invalid-phone-number";
      break;
    case "auth/missing-phone-number":
      message = "auth/missing-phone-number";
      break;
    case "auth/quota-exceeded":
      message = "auth/quota-exceeded";
      break;
    case "auth/maximum-second-factor-count-exceeded":
      message = "auth/maximum-second-factor-count-exceeded";
      break;
    case "auth/second-factor-already-in-use":
      message = "auth/second-factor-already-in-use";
      break;
    case "auth/unsupported-first-factor":
      message = "auth/unsupported-first-factor";
      break;
    case "auth/unverified-email":
      message = "auth/unverified-email";
      break;
    case "auth/missing-verification-code":
      message = "auth/missing-verification-code";
      break;
    case "auth/code-expired":
      message = "auth/code-expired";
      break;
    case "auth/missing-verification-id":
      message = "auth/missing-verification-id";
      break;
    default:
      message = INVALID_AUTHORIZATION_MESSAGES.DEFAULT_ERROR;
      break;
  }

  return message;
};

export const getImagePathFromStorage = (photoPath: string = ""): string => {
  return photoPath
    ? `https://firebasestorage.googleapis.com/v0/b/memorial-service-e5280.appspot.com/o/${encodeURIComponent(photoPath)}?alt=media`
    : "/images/no-image.jpg";
};
