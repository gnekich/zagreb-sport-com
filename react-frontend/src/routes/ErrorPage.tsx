import React from "react";

import { useTranslation } from "react-i18next";
import {
  useLocation,
  useParams,
  useNavigate,
  useRouteError,
} from "react-router-dom";

import { Container, Box, Typography, Button, Paper } from "@mui/material";

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Box>
        {error?.status === 404 ? (
          // Render Not Found Page
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              Page Not Found
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              The page you are looking for does not exist.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 3 }}
              onClick={handleGoHome}
            >
              Go Back to Home
            </Button>
          </>
        ) : (
          // Render General Error Page
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              Something went wrong
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              An unexpected error has occurred.
            </Typography>
            {error && (
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: "#ffebee",
                  color: "#d32f2f",
                  padding: 2,
                  marginTop: 2,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" component="h2" gutterBottom>
                  Error Details:
                </Typography>
                <Typography
                  variant="body2"
                  component="pre"
                  sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                >
                  {error.message || error.statusText}
                </Typography>
              </Paper>
            )}
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 3 }}
              onClick={() => window.location.reload()}
            >
              Reload Page
            </Button>
          </>
        )}
      </Box>
    </Container>
  );

  return (
    <React.Fragment>
      <div className="h-full w-screen flex items-center justify-center">
        <div className="grid h-full w-full items-center justify-center">
          <div className="h-full w-full flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-lg text-gray-700 mb-4">
              An unexpected error has occurred.
            </p>
            {error && (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                <h2 className="text-2xl font-bold">Error Details:</h2>
                <pre className="text-sm whitespace-pre-wrap">
                  {error.message || error.statusText}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ErrorPage;
