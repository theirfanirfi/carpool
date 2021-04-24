import React, { useState, createContext, useEffect } from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { getProfilePicture } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [initializing, setInitializing] = useState(true);
  const [onboarding, setOnboarding] = useState(false)
  const [currentAuth, setCurrentAuth] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [profilePic, setProfilePic] = useState(null)

  function onAuthStateChanged(auth) {
    setCurrentAuth(auth);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [])

  useEffect(() => {
    console.log('AuthContext currentAuth Changed', currentAuth)

    if (currentAuth) {
      const subscriber = firestore().collection('users').doc(currentAuth.uid)
      .onSnapshot(documentSnapshot => {
    
        //check if user active here
        if (documentSnapshot.exists) {
          console.log('authContext getUser exists', documentSnapshot.data())
          let user = {
              id: currentAuth.uid,
              ...documentSnapshot.data()
          }
          setCurrentUser(user)
        } else {
          console.log('authContext getUser doesnt exist')
          setCurrentUser(null)
        }
        
            
      });

      return () => subscriber()

    } else {
      setCurrentUser(null)
    }
  },[currentAuth])

  useEffect(() => {
    if (currentUser) {
      // getProfilePicture(currentAuth.uid, setProfilePic)
    }
  }, [currentUser])

  if (initializing) return null;

  return (
    <AuthContext.Provider value={{
      onboarding, setOnboarding,
      currentAuth, setCurrentAuth,
      currentUser, setCurrentUser,
      profilePic, setProfilePic
      }}>
      {children}
    </AuthContext.Provider>
  );
};
