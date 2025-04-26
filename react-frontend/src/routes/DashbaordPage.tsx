import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";

import NavigationHeader from "@/components/NavigationHeader";

function Page() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const cards = [
    {
      title: t("Unesi najavu natjecanja"),
      description: t("Dodajte novu najavu u sustav."),
      route: "/unesi-najavu",
      image: "/images/athletes.jpg",
      disabled: false,
    },
    {
      title: t("Unesi Natjecatelje"),
      description: t("Dodajte nove natjecatelje u sustav."),
      route: "/unesi-natjecatelje",
      image: "/images/athletes.jpg",
      disabled: false,
    },
    {
      title: t("Preuzmi dokumente saveza"),
      description: t("Preuzmite važne dokumente saveza."),
      route: "/preuzmi-dokumente-saveza",
      image: "/images/documents.jpg",
      disabled: false,
    },
    {
      title: t("Unesi Natjecanja"),
      description: t("Dodajte nova natjecanja u sustav."),
      route: "/unesi-natjecanja",
      image: "/images/competitions.jpg",
      disabled: false,
    },
    {
      title: t("Unesi dokumente rezultata natjecanja"),
      description: t(
        "Dodajte rezultate natjecanja. (Za sada putem mobilne aplikacije!)"
      ),
      route: "/unesi-dokumente-rezultata",
      image: "/images/results.jpg",
      disabled: true,
    },
  ];

  return (
    <>
      <NavigationHeader />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          padding: "20px",
        }}
      >
        <Grid container direction={"column"}>
          <Grid item xs={12}>
            <Box
              sx={{
                height: "200px",
              }}
            >
              <Typography
                color="primary"
                variant="h1"
                align="center"
                gutterBottom
              >
                {t("Dobrodošli Zicer Savez!")}
              </Typography>
              <Typography variant="h4" align="center" gutterBottom>
                {t("Odaberite opciju")}
              </Typography>
            </Box>
          </Grid>
          <Grid container spacing={3} justifyContent="center">
            {cards.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    borderRadius: "10px",
                    boxShadow: 3,
                    opacity: card.disabled ? 0.65 : 1,
                  }}
                >
                  <CardActionArea onClick={() => navigate(card.route)}>
                    {/* <CardMedia
                    component="img"
                    // height="140"
                    //image={card.image}
                    alt={card.title}
                  /> */}
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ textAlign: "center", fontWeight: "bold" }}
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ textAlign: "center", marginTop: "10px" }}
                      >
                        {card.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Page;
