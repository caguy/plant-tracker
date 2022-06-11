import React from "react";
import { ThemeModeContext } from "@/components";

function useThemeMode() {
  const themeMode = React.useContext(ThemeModeContext);

  if (themeMode === undefined) {
    throw new Error("useThemeMode can only be used inside ThemeModeProvider");
  }

  return themeMode;
}

export default useThemeMode;
