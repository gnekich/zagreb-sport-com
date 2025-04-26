import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Button,
  Typography,
  Box,
  Alert,
  TextField,
} from "@mui/material";
import { useDropzone } from "react-dropzone";

import NavigationHeader from "@/components/NavigationHeader";

function Page() {
  const { t } = useTranslation();
  const [naziv, setNaziv] = useState("");
  const [od, setOd] = useState("");
  const [doDatum, setDoDatum] = useState("");
  const [lokacija, setLokacija] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);

      // Hardkodirane vrijednosti
      setNaziv("Hackl");
      setOd("2025-04-25");
      setDoDatum("2025-04-27");
      setLokacija("Zicer");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!naziv || !od || !doDatum || !lokacija || !uploadedFile) {
      setError(t("Sva polja moraju biti ispunjena."));
      return;
    }
    console.log("Naziv:", naziv);
    console.log("Od:", od);
    console.log("Do:", doDatum);
    console.log("Lokacija:", lokacija);
    console.log("Uploaded File:", uploadedFile.name);
    setError(null);
  };

  return (
    <>
      <NavigationHeader />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t("Unesi Natjecanje")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <TextField
            label={t("Naziv natjecanja")}
            variant="outlined"
            fullWidth
            value={naziv}
            onChange={(e) => setNaziv(e.target.value)}
            required
          />
          <TextField
            label={t("Od")}
            type="date"
            variant="outlined"
            fullWidth
            value={od}
            onChange={(e) => setOd(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label={t("Do")}
            type="date"
            variant="outlined"
            fullWidth
            value={doDatum}
            onChange={(e) => setDoDatum(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label={t("Lokacija")}
            variant="outlined"
            fullWidth
            value={lokacija}
            onChange={(e) => setLokacija(e.target.value)}
            required
          />
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: isDragActive ? "#f0f0f0" : "#fafafa",
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <Typography>{t("Otpustite dokument za učitavanje")}</Typography>
            ) : (
              <Typography>
                {t(
                  "Povucite i ispustite PDF ili DOCX dokument ovdje ili kliknite za odabir."
                )}
              </Typography>
            )}
          </Box>
          {uploadedFile && (
            <Alert severity="success">
              {t("Učitani dokument:")} {uploadedFile.name}
            </Alert>
          )}
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {t("Pošalji")}
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Page;
