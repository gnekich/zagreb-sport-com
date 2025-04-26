import React from "react";

import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";

// User store
import useUserStore from "@/stores/useUserStore";
import firebaseConfig from "@/utils/firebaseConfig";

// Find these options in your Firebase console
const firebase = initializeApp(firebaseConfig);

const FirebasePasswordReset = () => {
  const [isEmailResetSent, setIsEmailResetSent] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const [oobCode, setOobCode] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  const token = useUserStore((state) => state.token);
  const setToken = useUserStore((state) => state.setToken);

  const initiatePasswordReset = async () => {
    try {
      const authInstance = initializeAuth(firebase);
      const sendPasswordResetEmailObj = await sendPasswordResetEmail(
        authInstance,
        email
      );

      setIsEmailResetSent(true);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const completePasswordReset = async () => {
    try {
      const authInstance = initializeAuth(firebase);
      const confirmPasswordResetObj = await confirmPasswordReset(
        authInstance,
        oobCode,
        newPassword
      );

      setIsEmailResetSent(true);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-gray-700 p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">Reset password</h2>

      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={initiatePasswordReset}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Reset password!
      </button>
      {isEmailResetSent && (
        <div className="mb-4">
          <p className="mt-4 text-green-500 text-sm break-words">
            Check your email for the password reset link.
          </p>
        </div>
      )}
      {/* <hr className="my-6" />
      {isEmailResetSent && (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Code"
              value={oobCode}
              onChange={(e) => setOobCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={completePasswordReset}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
          >
            Complete password reset
          </button>
        </>
      )} */}
    </div>
  );
};

export default FirebasePasswordReset;
