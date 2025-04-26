import React from "react";

import { Link, NavLink } from "react-router-dom";

// Material-UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import DiscordIcon from "@/components/NavigationHeader/DiscordIcon";
import BlueSkyIcon from "@/components/NavigationHeader/BlueSkyIcon";

// User store
import useUserStore from "@/stores/useUserStore";
import siteNameString from "@/utils/siteName";

import { blueSkyProfileUrl, discordUrl } from "@/utils/socials";

const NavigationHeader = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const token = useUserStore((state) => state.token);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          {/* Left Section: Menu Icon */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Center Section: Navigation Links */}
          <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
            {/* <Button
              component={NavLink}
              to="/"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Home
            </Button>
            <Button
              component={NavLink}
              to="/login"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Login
            </Button>
            <Button
              component={NavLink}
              to="/verify-email"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Verify Email
            </Button>
            <Button
              component={NavLink}
              to="/register"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Register
            </Button>
            <Button
              component={NavLink}
              to="/password-reset"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Password Reset
            </Button>
            <Button
              component={NavLink}
              to="/dashboard"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Dashboard
            </Button>
            <Button
              component={NavLink}
              to="/about"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              About
            </Button>
            {token && (
              <Button
                component={NavLink}
                to="/logout"
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                Logout
              </Button>
            )} */}
          </Stack>

          {/* Right Section: Sign In/Sign Up */}
          <Stack direction="row" spacing={2}>
            <Button
              component={NavLink}
              to="/"
              variant="text"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Home
            </Button>
            {!token ? (
              <>
                <Button
                  component={NavLink}
                  to="/signin"
                  variant="text"
                  color="inherit"
                  sx={{ textTransform: "none" }}
                >
                  Sign In
                </Button>
                <Button
                  component={NavLink}
                  to="/signup"
                  variant="outlined"
                  color="inherit"
                  sx={{ textTransform: "none" }}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={NavLink}
                  to="/dashboard"
                  variant="outlined"
                  color="inherit"
                  sx={{ textTransform: "none" }}
                >
                  Dashboard
                </Button>
                <Button
                  component={NavLink}
                  to="/logout"
                  variant="outlined"
                  color="inherit"
                  sx={{ textTransform: "none" }}
                >
                  Logout
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      {/* Drawer Component */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 250,
          },
        }}
      >
        {/* Drawer Header */}
        <Box>
          <ListItem disablePadding>
            <Button
              component={NavLink}
              to="/"
              onClick={toggleDrawer(false)}
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              <img
                src="/logo.svg"
                alt={`${siteNameString} Logo`}
                style={{ width: 40, height: 40, marginRight: 8 }}
              />
              <Typography>{siteNameString}</Typography>
            </Button>
          </ListItem>
        </Box>

        {/* Drawer Links */}
        <List>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/">
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          {!token ? (
            <></>
          ) : (
            <>
              <ListItem disablePadding>
                <ListItemButton component={NavLink} to="/unos-natjecatelja">
                  <ListItemText primary="Unos natjecatelja" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={NavLink} to="/unos-natjecanja">
                  <ListItemText primary="Unos natjecanja" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={NavLink} to="/unos-rezultata">
                  <ListItemText primary="Unos rezultata" />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
        {/* Spacer to push links below */}
        <Box sx={{ flexGrow: 1 }}></Box>
        <List>
          {/* <ListItem disablePadding>
            <ListItemButton
              component="a"
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemIcon>
                <DiscordIcon />
              </ListItemIcon>
              <ListItemText primary="Discord" />
            </ListItemButton>
          </ListItem> */}
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href={blueSkyProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemIcon>
                <BlueSkyIcon />
              </ListItemIcon>
              <ListItemText primary="@ZagrebSport.com" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/team">
              <ListItemText primary="Team" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/terms-and-privacy">
              <ListItemText primary="Terms & Privacy" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default NavigationHeader;
