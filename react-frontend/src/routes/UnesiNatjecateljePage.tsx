import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Button,
  Typography,
  Box,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";

import NavigationHeader from "@/components/NavigationHeader";

function Page() {
  const { t } = useTranslation();
  const [participants, setParticipants] = useState<
    { ime: string; prezime: string; team: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [newParticipant, setNewParticipant] = useState({
    ime: "",
    prezime: "",
    team: "",
  });

  const onDrop = (acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const data = result.data as {
            ime: string;
            prezime: string;
            team: string;
          }[];
          if (data.some((row) => !row.ime || !row.prezime || !row.team)) {
            setError(
              t("CSV datoteka mora sadržavati stupce: ime, prezime, team.")
            );
          } else {
            setParticipants(data);
          }
        },
        error: () => {
          setError(t("Došlo je do pogreške prilikom učitavanja datoteke."));
        },
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".csv",
    multiple: false,
  });

  const handleAddParticipant = () => {
    if (
      !newParticipant.ime ||
      !newParticipant.prezime ||
      !newParticipant.team
    ) {
      setError(t("Sva polja moraju biti ispunjena."));
      return;
    }
    setParticipants([...participants, newParticipant]);
    setNewParticipant({ ime: "", prezime: "", team: "" });
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Natjecatelji:", participants);
  };

  return (
    <>
      <NavigationHeader />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t("Unesi Natjecatelje")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
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
              <Typography>{t("Otpustite datoteku za učitavanje")}</Typography>
            ) : (
              <Typography>
                {t(
                  "Povucite i ispustite CSV datoteku ovdje ili kliknite za odabir."
                )}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: 3,
            }}
          >
            <Typography variant="h6">
              {t("Dodaj natjecatelja ručno")}
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label={t("Ime")}
                variant="outlined"
                fullWidth
                value={newParticipant.ime}
                onChange={(e) =>
                  setNewParticipant({ ...newParticipant, ime: e.target.value })
                }
              />
              <TextField
                label={t("Prezime")}
                variant="outlined"
                fullWidth
                value={newParticipant.prezime}
                onChange={(e) =>
                  setNewParticipant({
                    ...newParticipant,
                    prezime: e.target.value,
                  })
                }
              />
              <TextField
                label={t("Tim")}
                variant="outlined"
                fullWidth
                value={newParticipant.team}
                onChange={(e) =>
                  setNewParticipant({ ...newParticipant, team: e.target.value })
                }
              />
              <IconButton
                color="primary"
                onClick={handleAddParticipant}
                sx={{ alignSelf: "center" }}
              >
                <Add />
              </IconButton>
            </Box>
          </Box>

          {participants.length > 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t("Ime")}</TableCell>
                    <TableCell>{t("Prezime")}</TableCell>
                    <TableCell>{t("Tim")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {participants.map((participant, index) => (
                    <TableRow key={index}>
                      <TableCell>{participant.ime}</TableCell>
                      <TableCell>{participant.prezime}</TableCell>
                      <TableCell>{participant.team}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={participants.length === 0}
          >
            {t("Pošalji")}
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Page;
