import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { loginSuccess } from "../store/actions/Auth.action";
import { useAppDispatch } from "../store/store";
import { AuthModel, FirebaseCurrentUser } from "../services/auth/Auth.model";
import { setAuthInLocalStorage } from "../services/auth/Auth.service";
import { auth } from "../firebase/Firebase.service";

interface AuthProviderProps {
  authProviderState: AuthModel | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthProviderProps | null>(null);

const AuthProvider = ({ children }) => {
  const dispatch = useAppDispatch();
  const localAuth = localStorage.getItem("auth");
  const userAuthState = localAuth ? JSON.parse(localAuth) : null;
  const [authProviderState, setAuthProviderState] = useState<AuthModel | null>(
    userAuthState,
  );
  const [loading, setLoading] = useState(!!userAuthState);

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current value of the current user", currentUser);
      const user = currentUser?.toJSON() as FirebaseCurrentUser;
      const userAuth: AuthModel | null = user
        ? {
            uid: user.uid,
            email: user.email,
            accessToken: user?.stsTokenManager?.accessToken,
            expirationTime: user?.stsTokenManager?.expirationTime,
            refreshToken: user?.stsTokenManager?.refreshToken,
            userType: user.displayName,
          }
        : null;
      setAuthProviderState(userAuth);
      setLoading(false);
      setAuthInLocalStorage(userAuth);
      dispatch(loginSuccess(userAuth));
    });

    return () => {
      unsubcribe();
    };
  }, []);

  const authValue = {
    authProviderState,
    loading,
  } as any;

  if (loading) {
    return <span className="loading-root"></span>;
  }

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
