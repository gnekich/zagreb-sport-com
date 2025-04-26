import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  Divider,
  Grid,
  Link,
  Alert,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

import { authInstance } from "@/components/Firebase/Base";
import { mapFirebaseErrorCodeToUserFriendlyMessage } from "@/components/Firebase/MapFirebaseErrorMessages";

import {
  signInWithEmailAndPassword,
  getMultiFactorResolver,
  TotpMultiFactorGenerator,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

// User store
import useUserStore from "@/stores/useUserStore";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const setToken = useUserStore((state) => state.setToken);

  // We only choose the first TotpMultiFactorGenerator.FACTOR_ID
  const finishTheSecondFactorSignInFlowAfterSelection = async () => {};

  const navigateToNextPageAfterLogin = () => {
    // Navigate to the next page after successful login
    navigate("/dashboard");
  };

  const initTheSecondFactorSignInFlow = async () => {
    // console.log('This user requires MFA to login!');
    // const mfaResolver = getMultiFactorResolver(authInstance, error);
    // const enrolledFactors = mfaResolver.hints.map(info => info.displayName);
    // switch (mfaResolver.hints[selectedIndex].factorId) {
    //   case TotpMultiFactorGenerator.FACTOR_ID:
    //       const otpFromAuthenticator = // OTP typed by the user.
    //       const multiFactorAssertion =
    //           TotpMultiFactorGenerator.assertionForSignIn(
    //               mfaResolver.hints[selectedIndex].uid,
    //               otpFromAuthenticator
    //           );
    //       try {
    //           const userCredential = await mfaResolver.resolveSignIn(
    //               multiFactorAssertion
    //           );
    //           // Successfully signed in!
    //           navigateToNextPageAfterLogin();
    //       } catch (error) {
    //           // Invalid or expired OTP.
    //       }
    //       break;
    //   case PhoneMultiFactorGenerator.FACTOR_ID:
    //       // Handle SMS second factor.
    //       break;
    //   default:
    //       // Unsupported second factor?
    //       break;
    // }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset the error state
    try {
      // const authInstance = initializeAuth(firebase);
      const userCredential = await signInWithEmailAndPassword(
        authInstance,
        email,
        password
      );
      console.log(userCredential);
      const idToken = await userCredential.user.getIdToken();
      const userJson = JSON.stringify(userCredential.user.toJSON());
      setToken(idToken, userJson);

      console.log("Email verified:", userCredential.user.emailVerified);
      navigateToNextPageAfterLogin();
    } catch (error) {
      switch (error?.code) {
        case "auth/multi-factor-auth-required":
          // Initiate your second factor sign-in flow. (See next step.)
          initTheSecondFactorSignInFlow();
          break;
        default:
          console.error("Error logging in:", error);
          setError(mapFirebaseErrorCodeToUserFriendlyMessage(error?.code));
          break;
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign in
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSignIn}>
          <Stack spacing={2}>
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              size="small"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link href="/reset-password" underline="always" variant="body2">
              Forgot password?
            </Link>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="medium"
            >
              Sign in
            </Button>
          </Stack>
        </form>
        <Divider sx={{ my: 3 }}>OR</Divider>
        <Stack spacing={1.5}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            startIcon={<GoogleIcon />}
          >
            Sign in with Google account
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            startIcon={<GitHubIcon />}
          >
            Sign in with GitHub account
          </Button>
        </Stack>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          By signing in, you agree to our{" "}
          <Link href="/terms-and-privacy" target="_blank" underline="always">
            Terms & Privacy
          </Link>
          .
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" underline="always">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignIn;
