import React from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import NavigationHeader from "@/components/NavigationHeader";

// GraphQL Query to fetch documents
const GET_DOCUMENTS = gql`
  query GetDocuments {
    dokumenti_saveza {
      id
      naziv
      opis
      dokument_url
    }
  }
`;

function Page() {
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(GET_DOCUMENTS);

  return (
    <>
      <NavigationHeader />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t("Dokumenti Saveza")}
        </Typography>

        {loading && (
          <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
        )}

        {error && (
          <Alert severity="error">
            {t("Došlo je do pogreške prilikom dohvaćanja dokumenata.")}
          </Alert>
        )}

        {data && (
          <Grid container direction="column" spacing={4}>
            {data.dokumenti_saveza.map((doc: any) => (
              <Grid item key={doc.id}>
                <Card sx={{ backgroundColor: "#e8e8e8" }}>
                  <CardContent sx={{ display: "flex", alignItems: "center" }}>
                    <PictureAsPdfIcon
                      sx={{ fontSize: 40, color: "red", marginRight: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" component="div">
                        {doc.naziv}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {doc.opis}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      href={doc.dokument_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("Preuzmi")}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

export default Page;
