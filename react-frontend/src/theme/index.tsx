// MUI Theme and CssBaseline
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import useSiteSettingsStore from "@/stores/useSiteSettingsStore";

// Create a custom theme
export const theme = createTheme({
  palette: {
    mode: "light", // Dark mode

    primary: {
      main: "#e81b1a",
    },
    secondary: {
      main: "#03335d",
    },
    background: {
      default: "#ffffff",
      // paper: "#aaaaaa",
    },
    text: {
      primary: "#121212",
      secondary: "#4e4e4e",
    },
    // primary: {
    //   main: "#FD8028", // AlpacaHack's blue (adjusted for accessibility)
    // },
    // secondary: {
    //   main: "#fdb628", // AlpacaHack's pinkish-red
    // },
    // background: {
    //   default: "#1E0D00", // Dark background
    //   paper: "#1e0d00", // Slightly lighter for cards and surfaces
    // },
    // text: {
    //   primary: "#ffffff", // White text for dark mode
    //   secondary: "#b0bec5", // Muted text
    // },
  },
  typography: {
    // fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", // Default MUI font
    fontFamily: "'Poppins', sans-serif", // Updated font family

    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark", // Dark mode

    primary: {
      main: "#e81b1a",
    },
    secondary: {
      main: "#03335d",
    },
    background: {
      default: "#ffffff",
      // paper: "#aaaaaa",
    },
    text: {
      primary: "#121212",
      secondary: "#4e4e4e",
    },
    // primary: {
    //   main: "#FD8028", // AlpacaHack's blue (adjusted for accessibility)
    // },
    // secondary: {
    //   main: "#fdb628", // AlpacaHack's pinkish-red
    // },
    // background: {
    //   default: "#1E0D00", // Dark background
    //   paper: "#1e0d00", // Slightly lighter for cards and surfaces
    // },
    // text: {
    //   primary: "#ffffff", // White text for dark mode
    //   secondary: "#b0bec5", // Muted text
    // },
  },
  typography: {
    // fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", // Default MUI font
    fontFamily: "'Poppins', sans-serif", // Updated font family

    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
});

export const highContrastTheme = createTheme({
  palette: {
    mode: "dark", // Dark mode

    primary: {
      main: "#e81b1a",
    },
    secondary: {
      main: "#03335d",
    },
    background: {
      default: "#ffffff",
      // paper: "#aaaaaa",
    },
    text: {
      primary: "#121212",
      secondary: "#4e4e4e",
    },
    // primary: {
    //   main: "#FD8028", // AlpacaHack's blue (adjusted for accessibility)
    // },
    // secondary: {
    //   main: "#fdb628", // AlpacaHack's pinkish-red
    // },
    // background: {
    //   default: "#1E0D00", // Dark background
    //   paper: "#1e0d00", // Slightly lighter for cards and surfaces
    // },
    // text: {
    //   primary: "#ffffff", // White text for dark mode
    //   secondary: "#b0bec5", // Muted text
    // },
  },
  typography: {
    // fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", // Default MUI font
    fontFamily: "'Poppins', sans-serif", // Updated font family

    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
});

export const ThemeProviderWithTheTheme = ({ children }) => {
  const themeName = useSiteSettingsStore((state) => state.theme);

  let selectedTheme = theme;
  if (themeName === "dark") {
    selectedTheme = darkTheme;
  } else if (themeName === "highContrast") {
    selectedTheme = highContrastTheme;
  } else {
    selectedTheme = theme;
  }

  return <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>;
};

export default ThemeProviderWithTheTheme;
