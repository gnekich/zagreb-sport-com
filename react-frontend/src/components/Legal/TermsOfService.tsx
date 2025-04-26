import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const TermsOfService = () => {
  return (
    <Container disableGutters>
      {/* Language Switch */}
      {/* <Box sx={{ padding: 2 }}>
        <Link href="/terms-and-privacy?lang=ja" underline="always">
          日本語版
        </Link>
      </Box> */}

      {/* Table of Contents */}
      <Box sx={{ padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          Table of Contents
        </Typography>
        <List>
          <ListItem component="a" href="/terms-and-privacy#terms-of-service">
            <ListItemText primary="Terms of Service" />
          </ListItem>
          <ListItem component="a" href="/terms-and-privacy#privacy-policy">
            <ListItemText primary="Privacy Policy" />
          </ListItem>
        </List>
      </Box>

      <Divider />

      {/* Terms of Service Section */}
      <Box id="terms-of-service" sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Terms of Service
        </Typography>
        <Typography variant="body1" gutterBottom>
          A ne zezaj... hackathon je bio, nezz di smo, a kamoli da pišemo legal
          stuff... Ne budi glup, svi tvoji podaci će biti prožvakani kroz AI.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Korištenjem ove aplikacije prihvaćaš da će tvoji podaci biti korišteni
          u svrhe svega.
        </Typography>
      </Box>

      <Divider />

      {/* Privacy Policy Section */}
      <Box id="privacy-policy" sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>

        <Typography variant="body1" gutterBottom>
          "Privacy? lol" - Neki lik iz filma Social Network
        </Typography>
        {/* Add more articles as needed */}
      </Box>
    </Container>
  );
};

export default TermsOfService;
