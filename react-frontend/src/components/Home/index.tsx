import React from "react";
import {
  Container,
  Box,
  Typography,
  Stack,
  Link,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import BlueSkyIcon from "../NavigationHeader/BlueSkyIcon";
import DiscordIcon from "../NavigationHeader/DiscordIcon";
import { blueSkyProfileUrl, discordUrl } from "@/utils/socials";

import { useQuery, useMutation, gql } from "@apollo/client";

// GraphQL Mutation
const READ_FEED = gql`
  query ReadFeed {
    feed(order_by: { created_at: desc_nulls_last }, limit: 12) {
      id
      subject
      slika_url
      description
    }
    rezultati(order_by: { created_at: desc_nulls_last }, limit: 3) {
      #id
      payload
      created_at
    }
  }
`;

const Home: React.FC = () => {
  const { loading, error, data } = useQuery(READ_FEED);

  const latestDogađanja = [
    {
      image:
        "https://sport.infozagreb.hr/media/places/high_dk-hanzek30-150920damir-krajac-cropix@28dc2afd-dc4d-433a-a66d-e435c73b87d8.jpg", // Replace with actual image paths
      title: "Zagreb - Atletska metropola",
      description: "Description for Event 1",
    },
    {
      image:
        "https://sport.infozagreb.hr/media/places/high_ina-delta13-070619ranko-suvar-cropix-@f223d8bc-da9c-4656-821e-4d9a4769bdb0.jpg",
      title: "INA Delta Rally - Po Zagrebu za volanom",
      description: "Description for Event 2",
    },
    {
      image:
        "https://sport.infozagreb.hr/media/places/high_polufinale-veslanje16-010521damir-krajac-cropix@62e9159a-4855-48db-bc2c-4a7bec475c8b.jpg",
      title: "Croatia Open veslačka regata",
      description: "Veslom protiv vesla na Jarunu",
    },
  ];

  return (
    <Container disableGutters sx={{ mt: 4, height: "100vh" }}>
      {/* Header Section */}
      <Stack alignItems="center" spacing={2} sx={{ mt: 4 }}>
        <img
          src="/Mali_ZAGI.png"
          alt=" Logo"
          style={{ width: 350, height: 350 }}
        />
        <Typography
          variant="h2"
          color="primary"
          textAlign={"center"}
          gutterBottom
        >
          Zagreb Sport
        </Typography>
        <Stack spacing={1} alignItems="center">
          <Typography variant="body1" textAlign={"center"}>
            Platforma koja vam pomaže pratiti najbolje sportske događaje u
            Zagrebu!
          </Typography>
        </Stack>

        {/* <Box>
          <Button
            variant="contained"
            color="primary"
            href="/signup"
            size="large"
          >
            Create an account
          </Button>
        </Box> */}
      </Stack>

      <Box
        sx={{ mt: 4, height: "100vh" }}
        flex={1}
        direction="column"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        {/* <Box sx={{ height: "300px" }}> */}
        <Typography
          sx={{ textAlign: "center" }}
          variant="h1"
          color="primary"
          gutterBottom
        >
          Sportska događanja koja ne smijete propustiti
        </Typography>

        <Typography variant="h2" color="secondary" gutterBottom>
          Sport je oduvijek bio velika strast u gradu, a tijekom godine Zagreb
          je domaćin mnogobrojnim sportskim događanjima. Otkrijte i posjetite
          neko od njih…
        </Typography>

        {/* Latest Događanja Section */}

        <Typography sx={{ mt: 8 }} variant="h4" gutterBottom>
          Najnovija Događanja
        </Typography>
        {/* </Box> */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 4 }}>
            Failed to load events: {error.message}
          </Alert>
        )}

        {data && (
          <Grid container spacing={4}>
            {data.feed.map((event: any) => (
              <Grid item xs={6} sm={6} md={4} key={event.id}>
                <Card
                  sx={{
                    maxWidth: 345,
                    width: "100%",
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                  }}
                >
                  {!!event.slika_url && (
                    <CardMedia
                      component="img"
                      height="180"
                      image={event.slika_url}
                      alt={event.subject}
                      sx={{
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                      }}
                    />
                  )}
                  {!!event.subject && (
                    <CardContent>
                      {!!event.subject && (
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold", mb: 1 }}
                        >
                          {event.subject}
                        </Typography>
                      )}
                      {!!event.description && (
                        <Typography variant="body2" color="text.secondary">
                          {event.description}
                        </Typography>
                      )}
                    </CardContent>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/*         
          <Grid container spacing={4}>
            {latestDogađanja.map((event, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ maxWidth: 250 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={event.image}
                    alt={event.title}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid> */}
        {/* </Box>

      <Box
        sx={{ mt: 40, height: "100vh" }}
        direction="column"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      > */}
        <Typography sx={{ mt: 8 }} variant="h4" gutterBottom>
          Najnoviji Rezultati
        </Typography>

        {data && (
          <Grid container spacing={4} fullWidth direction={"column"}>
            {data.rezultati.map((event: any) => (
              <Grid item key={event.id} fullWidth sx={{ width: "100%" }}>
                <Card
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h2" color="text.secondary">
                      Objavio ZICER:
                    </Typography>
                    {!!event.payload &&
                      event.payload?.poredak?.map((item) => {
                        return (
                          <Typography variant="h6" color="text.secondary">
                            {`${item.mjesto}# | Bodovi: ${item.bodovi} | Team: ${item.ime} `}
                          </Typography>
                        );
                      })}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Stack
          sx={{ mt: 8 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Link
            href={blueSkyProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BlueSkyIcon />
          </Link>
          <Link href={discordUrl} target="_blank" rel="noopener noreferrer">
            <DiscordIcon />
          </Link>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Link href="/team" underline="always">
            Team
          </Link>
          <Link href="/terms-and-privacy" underline="always">
            Terms & Privacy
          </Link>
        </Stack>
      </Box>
    </Container>
  );
};

export default Home;
