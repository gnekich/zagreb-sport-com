import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function LoadingSuspenseComponentSimple() {
  const { t } = useTranslation("translation");

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
      <Typography variant="h6" component="p">
        {t("loading", "Loading...")}
      </Typography>
    </Box>
  );
}

export default LoadingSuspenseComponentSimple;
