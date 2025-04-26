// import defaultData from './firebase-config.json';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APP_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_APP_MEASUREMENT_ID,
};

// const firebaseConfig = {
//   apiKey: defaultData.apiKey,
//   authDomain: defaultData.authDomain,
//   projectId: defaultData.projectId,
//   storageBucket: defaultData.storageBucket,
//   messagingSenderId: defaultData.messagingSenderId,
//   appId: defaultData.appId,
//   measurementId: defaultData.measurementId,
// };

export default firebaseConfig;
