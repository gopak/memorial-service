import { doc, getDoc, setDoc } from "firebase/firestore";
import auth, { db } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { Customer } from "./customer.model";
import { loginSuccess } from "../../store/actions/Auth.action";
import { setAuthInLocalStorage } from "../auth/Auth.service";

// const customerService = {
//     createCustomers: async (customer: Customer, email: string, password: string): Promise<void> => {
//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             await setDoc(doc(db, "customers", 'userCredential.user.uid'), null);
//             console.log('userService createCustomers success');
//         } catch (error) {
//             console.log('userService createCustomers', error);
//             throw new Error();
//         }
//     }
// }
//
//
//
// export default customerService;

export const getCustomerInfo = (id: string) => async (dispatch): Promise<void> => {
    console.log('getCustomerInfo createCustomers attmp', id);
    try {
        const docRef = doc(db, "customers", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (error) {
        console.log('getCustomerInfo createCustomers', error);
        throw new Error();
    }
};