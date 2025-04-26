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
import {
  signInWithEmailAndPassword,
  multiFactor,
  TotpMultiFactorGenerator,
  TotpSecret,
} from "firebase/auth";

// User store
import useUserStore from "@/stores/useUserStore";

const MFA: React.FC = () => {
  const [totpUri, setTotpUri] = React.useState("");
  const [secret, setSecret] = React.useState(null);
  const [error, setError] = React.useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isMFAInitialized, setIsMFAInitialized] = useState(false);

  const setToken = useUserStore((state) => state.setToken);

  const startMFAEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset the error state
    try {
      const currentUser = authInstance.currentUser;
      if (!currentUser) {
        // We can't proceed, there is no active user session...
        setError("No active user session found.");
        return;
      }

      // Generate a TOTP secret.
      const multiFactorSession = await multiFactor(currentUser).getSession();
      const totpSecret = await TotpMultiFactorGenerator.generateSecret(
        multiFactorSession
      );

      const totpUri = totpSecret.generateQrCodeUrl(
        currentUser?.email ?? "",
        "My App 1"
      );
      // await QRExampleLib.toCanvas(totpUri, qrElement);

      console.log("totpUri:", totpUri);
      console.log("secret", totpSecret.secretKey);

      setSecret(totpSecret);
      setTotpUri(totpUri);
      setIsMFAInitialized(true);
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error?.message ?? "An unexpected error occurred.");
    }
  };

  const completeMFAEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset the error state
    try {
      const currentUser = authInstance.currentUser;
      if (!currentUser) {
        setError("No active user session found.");
        return;
      }

      const totpSecret = secret;
      console.log("Secret", totpSecret);

      // Finalize the enrollment.
      const multiFactorAssertion =
        TotpMultiFactorGenerator.assertionForEnrollment(
          totpSecret,
          verificationCode
        );
      const finalizationResult = await multiFactor(currentUser).enroll(
        multiFactorAssertion,
        "TOTP MFA"
      );

      console.log("MFA Enrollment Complete:", finalizationResult);
    } catch (error) {
      console.error("Error completing MFA enrollment:", error);
      setError(error?.message ?? "An unexpected error occurred.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Multi-Factor Authentication (MFA)
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Button to Start MFA Enrollment */}
        {!isMFAInitialized && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={startMFAEnrollment}
            sx={{ mt: 2 }}
          >
            Start MFA Enrollment
          </Button>
        )}

        {/* Display QR Code URI and Secret Key */}
        {isMFAInitialized && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom>
              Scan the QR code in your authenticator app or use the secret key
              below:
            </Typography>
            <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
              {secret?.secretKey ?? "-"}
            </Typography>
            <Typography variant="body2" sx={{ wordBreak: "break-word", mt: 1 }}>
              QR Code URI: {totpUri}
            </Typography>
          </Box>
        )}

        {/* Input and Button to Complete MFA Enrollment */}
        {isMFAInitialized && (
          <Box component="form" onSubmit={completeMFAEnrollment} sx={{ mt: 2 }}>
            <TextField
              label="Verification Code"
              variant="outlined"
              fullWidth
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Complete MFA Enrollment
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default MFA;
