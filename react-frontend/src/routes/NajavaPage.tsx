import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, gql } from "@apollo/client";

import NavigationHeader from "@/components/NavigationHeader";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

// GraphQL Mutation
const CREATE_NAJAVA = gql`
  mutation CreateNajava($subject: String!, $description: String!) {
    insert_feed_one(object: { subject: $subject, description: $description }) {
      id
    }
  }
`;

function Page() {
  const { t } = useTranslation();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [createNajava, { loading, error, data }] = useMutation(CREATE_NAJAVA);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNajava({
        variables: {
          subject,
          description,
        },
      });
      setSubject("");
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAiPotrcko = async () => {
    setAiLoading(true);
    setAiError(null);
    setAiResult(null);

    try {
      const response = await fetch(
        "https://hlambda.zagrebsport.com/zagrebsport/api/v1/najava",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ulaz: description }),
        }
      );

      if (!response.ok) {
        throw new Error("Došlo je do pogreške prilikom poziva API-ja.");
      }

      const data = await response.json();
      setAiResult("Tekst prepravljen uz pomoć umjetne inteligencije!"); // Format JSON response
      setDescription(data.sadrzaj);
      setSubject(data.naslov);
    } catch (err: any) {
      setAiError(err.message || "Došlo je do pogreške.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <>
      <NavigationHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          {t("Unesi najavu natjecanja")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
            maxWidth: "720px",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: 3,
          }}
        >
          <TextField
            label={t("Naslov")}
            variant="outlined"
            fullWidth
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <TextField
            label={t("Opis")}
            variant="outlined"
            fullWidth
            multiline
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Button
            onClick={handleAiPotrcko}
            variant="contained"
            color="secondary"
            fullWidth
            disabled={aiLoading}
          >
            {aiLoading ? (
              <CircularProgress size={24} />
            ) : (
              t("AI Potrčko Prepravi!")
            )}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : t("Pošalji")}
          </Button>
          {aiError && <Alert severity="error">{aiError}</Alert>}
          {aiResult && (
            <Alert severity="success">
              <pre>{aiResult}</pre>
            </Alert>
          )}
          {error && (
            <Alert severity="error">{t("Došlo je do pogreške.")}</Alert>
          )}
          {data && (
            <Alert severity="success">
              {t("Najava natjecanja je uspješno dodana!")}
            </Alert>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Page;
