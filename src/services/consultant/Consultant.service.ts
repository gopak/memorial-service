import { doc, getDoc, setDoc } from "firebase/firestore";
import { Customer, CustomerPayload } from "./Consultant.model";
import {
  getCustomerProfileAttempt,
  getCustomerProfileError,
  getCustomerProfileSuccess,
} from "../../store/actions/Customer.action";
import { updateDoc } from "@firebase/firestore";
import { logOut } from "../auth/Auth.service";
import { alertMessage } from "../../components/alert-message/AlertMessage";
import { DEFAULT_MESSAGES_ERROR } from "../../app.types";
import { db } from "../../firebase/Firebase.service";

export const createCustomerProfile =
  (id: string, payload: CustomerPayload) =>
  async (dispatch): Promise<void> => {
    console.log("customerService createCustomerProfile attempt", id);

    try {
      await setDoc(doc(db, "customers", id), {
        ...payload,
        id,
      });
      console.log("customerService createCustomerProfile success");
    } catch (error) {
      console.log("customerService createCustomerProfile error", error);
      throw new Error();
    }
  };

export const getCustomerProfile =
  (id: string) =>
  async (dispatch): Promise<void> => {
    console.log("customerService getCustomerProfile attempt", id);
    dispatch(getCustomerProfileAttempt());

    try {
      const docRef = doc(db, "customers", id);
      const docSnap = await getDoc(docRef);
      console.log(
        "customerService getCustomerProfile success",
        docSnap.exists(),
      );

      if (docSnap.exists()) {
        const data = docSnap.data() as Customer;
        console.log("customerService getCustomerProfile data:", data);
        dispatch(getCustomerProfileSuccess(data));
      } else {
        console.log("No such document!");
      }
    } catch (error: any) {
      console.log("customerService getCustomerProfile error", {
        error,
        errorCode: error?.code,
        errorMessage: error.message,
      });
      alertMessage({
        type: "error",
        message: DEFAULT_MESSAGES_ERROR,
      });
      dispatch(getCustomerProfileError(error));

      if (error?.code === "permission-denied") {
        dispatch(logOut());
      }
      throw new Error();
    }
  };

export const updateCustomerProfile =
  (id: string, payload: CustomerPayload) =>
  async (dispatch): Promise<void> => {
    console.log("customerService updateCustomerProfile attempt", {
      id,
      payload,
    });

    try {
      await updateDoc(doc(db, "customers", id), {
        ...payload,
      });
      console.log("customerService updateCustomerProfile success");
    } catch (error) {
      console.log("customerService updateCustomerProfile error", error);
      throw new Error();
    }
  };
