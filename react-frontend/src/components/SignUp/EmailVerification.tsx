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

// Import firebase auth instance...
import { authInstance } from "@/components/Firebase/Base";
import { mapFirebaseErrorCodeToUserFriendlyMessage } from "@/components/Firebase/MapFirebaseErrorMessages";

import { createUserWithEmailAndPassword } from "firebase/auth";

// User store
import useUserStore from "@/stores/useUserStore";

const EmailVerification: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const token = useUserStore((state) => state.token);
  const setToken = useUserStore((state) => state.setToken);

  const handleSignUp = async () => {
    try {
      setError("");
      // const authInstance = initializeAuth(firebase);
      const userCredential = await createUserWithEmailAndPassword(
        authInstance,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();
      const userJson = JSON.stringify(userCredential.user.toJSON());
      setToken(idToken, userJson);

      console.log("Email verified:", userCredential.user.emailVerified);
    } catch (error) {
      console.error("Error registering:", error);
      setError(mapFirebaseErrorCodeToUserFriendlyMessage(error?.message));
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign up
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSignUpForm}>
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="medium"
            >
              Sign up
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
            Sign up with Google account
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            startIcon={<GitHubIcon />}
          >
            Sign up with GitHub account
          </Button>
        </Stack>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link href="/signin" underline="always">
            Sign In
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default EmailVerification;
