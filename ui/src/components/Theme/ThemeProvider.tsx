import React from "react";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/system";
import getTheme from "./getTheme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeMode {
  mode: ThemeModeType;
  toggle: () => void;
}

type ThemeModeType = "light" | "dark";

export const ThemeModeContext = React.createContext<ThemeMode | undefined>(
  undefined
);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const systemDarkMode = !!useMediaQuery("(prefers-color-scheme: dark)", {
    noSsr: true,
  })
    ? "dark"
    : "light";

  function initThemeMode() {
    const userThemeMode = sessionStorage.getItem("themeMode") as
      | "light"
      | "dark";
    if (userThemeMode) return userThemeMode;
    return systemDarkMode;
  }

  const [themeMode, setThemeMode] =
    React.useState<ThemeModeType>(initThemeMode);

  function toggleThemeMode() {
    sessionStorage.setItem(
      "themeMode",
      themeMode === "dark" ? "light" : "dark"
    );
    setThemeMode((current) => (current === "dark" ? "light" : "dark"));
  }

  const theme = React.useMemo(() => getTheme(themeMode), [themeMode]);

  return (
    <ThemeModeContext.Provider
      value={{ mode: themeMode, toggle: toggleThemeMode }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeProvider;
