import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  onAuthStateChanged,
  browserLocalPersistence,
} from "firebase/auth";

import firebaseConfig from "@/utils/firebaseConfig";

// Find these options in your Firebase console
export const firebase = initializeApp(firebaseConfig);

// Init auth
export const authInstance = initializeAuth(firebase, {
  persistence: [browserLocalPersistence], // This works...
});

// Callback for auth state changes
export const onAuthStateChange = (callback: any) => {
  onAuthStateChanged(authInstance, callback);
};
onAuthStateChange((user) => {
  console.log("Auth state changed");
  console.log(user);
  if (user) {
    // Check if email is verified
    console.log("Email verified: ", user.emailVerified);
  }
});

// This will not work as expected, onAuthStateChanged will never be called on refresh,
// but it will save the state to LocalStorage... it is just that the only way to get
// onAuthStateChanged to trigger is to have
// persistence: [browserLocalPersistence], in the initializeAuth
// authInstance
//   .setPersistence(browserLocalPersistence)
//   .then(() => {})
//   .catch((error) => {
//     console.log("Error setting persistence: ", error);
//   });

export default { firebase, authInstance };
