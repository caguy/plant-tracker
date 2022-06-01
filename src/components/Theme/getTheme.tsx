import { createTheme, responsiveFontSizes } from "@mui/material";

function getTheme() {
  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        primary: {
          main: "#9c27b0",
        },
        background: {
          default: "#f5f5f5",
          paper: "#fafafa",
        },
        secondary: {
          main: "#5c6bc0",
        },
      },
      typography: {
        h1: {
          fontWeight: 900,
          fontSize: "2rem",
        },
        h2: {
          fontWeight: 900,
          fontSize: "1.5rem",
        },
        subtitle1: {
          fontSize: "0.9rem",
          opacity: 0.87,
        },
      },
      zIndex: {
        appBar: 1400,
      },
    })
  );

  return createTheme(theme);
}

export default getTheme;
