import React, { createContext, useContext } from 'react';
import { initializeFirebase } from '../../config/FirebaseConfig';

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const firebase = initializeFirebase();
  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  return useContext(FirebaseContext);
};
