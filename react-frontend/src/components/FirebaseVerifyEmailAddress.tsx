import React from "react";

import { authInstance } from "@/components/Firebase/Base";

import { sendEmailVerification, signInWithCustomToken } from "firebase/auth";

// User store
import useUserStore from "@/stores/useUserStore";

const FirebaseVerifyEmailAddress = () => {
  const [isEmailResetSent, setIsEmailResetSent] = React.useState(false);
  const [error, setError] = React.useState("");

  // const firebaseUser = useUserStore((state) => state.firebaseUser);

  // Set interval

  React.useEffect(() => {
    const interval = setInterval(() => {
      console.log("Tick...");
      if (authInstance.currentUser) {
        console.log("Checking...");
        // Check if email is verified
        console.log("User data: ", authInstance.currentUser);
        console.log(
          "Email verified: ",
          authInstance.currentUser?.emailVerified
        );
        authInstance.currentUser?.reload();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const initiateEmailVerification = async () => {
    try {
      // const authInstance = initializeAuth(firebase);

      // // Hack to get the user object from the firebaseUser object
      // const user: User = UserImpl._fromJSON(authInstance as any, firebaseUser);
      // await authInstance.updateCurrentUser(user);
      const user = authInstance.currentUser;

      if (user) {
        setIsEmailResetSent(false);
        setError("");

        await sendEmailVerification(user);
        console.log("Email verification sent!");
        setIsEmailResetSent(true);
      } else {
        setError("No authenticated user found.");
      }
    } catch (error) {
      console.error("Error sending email verification:", error);
      setError("Error sending email verification. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-gray-700 p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">Verify Email</h2>

      <button
        onClick={initiateEmailVerification}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Send verification email!
      </button>
      {isEmailResetSent && (
        <div className="mb-4">
          <p className="mt-4 text-green-500 text-sm break-words">
            Check your email for the email verification link.
          </p>
        </div>
      )}
      {error && (
        <div className="mb-4">
          <p className="mt-4 text-red-500 text-sm break-words">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FirebaseVerifyEmailAddress;
