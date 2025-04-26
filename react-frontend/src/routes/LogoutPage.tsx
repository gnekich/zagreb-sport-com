import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";

import useUserStore from "@/stores/useUserStore";

export default function LogoutPage() {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    const timer = setTimeout(() => {
      logout();
      navigate("/");
    }, 1337);

    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Logging you out...
      </Typography>
      <CircularProgress size={40} thickness={4} sx={{ mt: 2 }} />
    </Box>
  );
}
