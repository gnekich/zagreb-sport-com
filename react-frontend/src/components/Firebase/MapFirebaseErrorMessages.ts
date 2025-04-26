export const FirebaseErrorMessages = {
  "auth/invalid-credential": {
    firebaseMessage: "Firebase: Error (auth/invalid-credential).",
    message:
      "Invalid credential provided. Please check your credentials and try again.",
    severity: "error",
  },
  "auth/invalid-email": {
    firebaseMessage:
      "Firebase: The email address is badly formatted (auth/invalid-email).",
    message:
      "The email address is badly formatted. Please check and try again.",
    severity: "error",
  },
  "auth/invalid-verification-code": {
    firebaseMessage:
      "Firebase: The verification code is invalid (auth/invalid-verification-code).",
    message: "The verification code is invalid. Please check and try again.",
    severity: "error",
  },
  "auth/invalid-verification-id": {
    firebaseMessage:
      "Firebase: The verification ID is invalid (auth/invalid-verification-id).",
    message: "The verification ID is invalid. Please check and try again.",
    severity: "error",
  },
  "auth/operation-not-allowed": {
    firebaseMessage:
      "Firebase: Operation not allowed (auth/operation-not-allowed).",
    message: "The operation is not allowed. Please contact support.",
    severity: "error",
  },
  "auth/email-already-in-use": {
    firebaseMessage:
      "Firebase: The email address is already in use by another account (auth/email-already-in-use).",
    message:
      "The email address is already in use by another account. Please use a different email address.",
    severity: "error",
  },
  "auth/weak-password": {
    firebaseMessage:
      "Firebase: Password should be at least 6 characters (auth/weak-password).",
    message: "The password is too weak. Please choose a stronger password.",
    severity: "error",
  },
};

export const mapFirebaseErrorCodeToUserFriendlyMessage = (
  errorCode: string
): string => {
  const errorMessageObj = FirebaseErrorMessages[errorCode] ?? {
    message: "An unexpected error occurred.",
    severity: "error",
  };

  if (errorMessageObj) {
    return errorMessageObj.message;
  }
  return "An unexpected error occurred. Please try again.";
};
export default mapFirebaseErrorCodeToUserFriendlyMessage;
