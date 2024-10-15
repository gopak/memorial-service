import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  arrayUnion,
} from "firebase/firestore";
import { updateDoc } from "@firebase/firestore";
import { logOut } from "../auth/Auth.service";
import { alertMessage } from "../../components/alert-message/AlertMessage";
import { DEFAULT_MESSAGES_ERROR } from "../../app.types";
import { db } from "../../firebase/Firebase.service";
import { Consultant, ConsultantPayload } from "./Consultant.model";
import {
  getConsultantProfileAttempt,
  getConsultantProfileError,
  getConsultantProfileSuccess,
} from "../../store/actions/Consultant.action";
import { Customer } from "../customer/Customer.model";

export const createConsultantProfile =
  (id: string, payload: ConsultantPayload) =>
  async (dispatch): Promise<void> => {
    console.log("consultantService createConsultantProfile attempt", id);

    try {
      await setDoc(doc(db, "consultants", id), {
        ...payload,
        id,
      });
      console.log("consultantService createConsultantProfile success");
    } catch (error) {
      console.log("consultantService createConsultantProfile error", error);
      throw new Error();
    }
  };

export const getConsultantProfile =
  (id: string, needSetToStore = true) =>
  async (dispatch): Promise<Consultant> => {
    console.log("consultantService getConsultantProfile attempt", id);

    if (needSetToStore) {
      dispatch(getConsultantProfileAttempt());
    }

    try {
      const docRef = doc(db, "consultants", id);
      const docSnap = await getDoc(docRef);
      console.log(
        "consultantService getConsultantProfile success",
        docSnap.exists(),
      );

      if (docSnap.exists()) {
        const data = docSnap.data() as Consultant;
        console.log("consultantService getConsultantProfile data:", data);
        if (needSetToStore) {
          dispatch(getConsultantProfileSuccess(data));
        }

        return data;
      } else {
        console.log("No such document!");
        throw new Error();
      }
    } catch (error: any) {
      console.log("consultantService getConsultantProfile error", {
        error,
        errorCode: error?.code,
        errorMessage: error.message,
      });
      alertMessage({
        type: "error",
        message: DEFAULT_MESSAGES_ERROR,
      });

      if (needSetToStore) {
        dispatch(getConsultantProfileError(error));
      }

      if (error?.code === "permission-denied") {
        dispatch(logOut());
      }
      throw new Error();
    }
  };

export const updateConsultantProfile =
  (id: string, payload: ConsultantPayload) =>
  async (dispatch): Promise<void> => {
    console.log("consultantService updateConsultantProfile attempt", {
      id,
      payload,
    });

    try {
      await updateDoc(doc(db, "consultants", id), {
        ...payload,
      });
      console.log("consultantService updateConsultantProfile success");
    } catch (error) {
      console.log("consultantService updateConsultantProfile error", error);
      throw new Error();
    }
  };

export const setConsultantClient =
  (id: string, clientId: string) =>
  async (dispatch): Promise<void> => {
    console.log("consultantService setConsultantClient attempt", {
      id,
      clientId,
    });

    try {
      await setDoc(
        doc(db, "consultants", id),
        {
          clientIds: arrayUnion(clientId),
        },
        { merge: true },
      );
      console.log("consultantService setConsultantClient success");
    } catch (error) {
      console.log("consultantService setConsultantClient error", error);
      throw new Error();
    }
  };

export const getConsultantCustomersList =
  (id: string) =>
  async (dispatch): Promise<Customer[]> => {
    console.log("consultantService getConsultantCustomersList attempt");

    try {
      const q = query(
        collection(db, "customers"),
        where("consultantId", "==", id),
      );
      const querySnapshot = await getDocs(q);
      console.log("consultantService getConsultantCustomersList success");
      const customers: Customer[] = [];
      querySnapshot.forEach((doc) => {
        customers.push(doc.data() as Customer);
      });
      return customers;
    } catch (error: any) {
      console.log("consultantService getConsultantCustomersList error", {
        error,
        errorCode: error?.code,
        errorMessage: error.message,
      });
      alertMessage({
        type: "error",
        message: DEFAULT_MESSAGES_ERROR,
      });

      throw new Error();
    }
  };

export const getConsultantsList =
  () =>
  async (dispatch): Promise<Consultant[]> => {
    console.log("consultantService getConsultantsList attempt");

    try {
      const q = query(collection(db, "consultants"));
      const querySnapshot = await getDocs(q);

      const consultants: Consultant[] = [];
      querySnapshot.forEach((doc) => {
        consultants.push(doc.data() as Consultant);
      });

      console.log("consultantService getConsultantsList success", consultants);

      return consultants;
    } catch (error: any) {
      console.log("consultantService getConsultantsList error", {
        error,
        errorCode: error?.code,
        errorMessage: error.message,
      });
      alertMessage({
        type: "error",
        message: DEFAULT_MESSAGES_ERROR,
      });

      throw new Error();
    }
  };
