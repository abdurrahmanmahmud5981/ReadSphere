import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import LoadingSpinner from "../components/LoadingSpinner";
import { axiosSecure } from "../hooks/useAxiosSecure";

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  const logOut = () => {
    setLoader(true);
    setUser(null);
    return signOut(auth);
  };
  const sendResetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoader(false);
      if (currentUser?.email) {
        console.log("User Logged In");
        const { data } = await axiosSecure.post(
          `/jwt`,
          {
            email: currentUser?.email,
          }
        );
        console.log('kjdshfkjadhfakdsa',data);
      } else {
        console.log("User Logged Out");
        const { data } = await axiosSecure.get(
          `/logout`
        );
        console.log(data);
      }
      return () => {
        unsubscribe();
      };
    });
  }, []);

  const userInformation = {
    user,
    createUser,
    signIn,
    googleSignIn,
    updateUserProfile,
    logOut,
    sendResetPassword,
    loader,
    setLoader,
    setUser,
  };

  if (loader) {
    return <LoadingSpinner />;
  }
  return (
    <AuthContext.Provider value={userInformation}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
