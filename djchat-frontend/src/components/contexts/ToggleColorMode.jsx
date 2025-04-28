import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import React from "react";
import MuiTheme from "../../theme/theme";
import Cookies from "js-cookie";

export const ColorModeContext = createContext(() => {});

export default function ToggleColorMode({ children }) {
  const storedColor = Cookies.get("colorMode");
  const preferDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const defaultColor = storedColor || (preferDarkMode ? "dark" : "light");

  const [mode, setMode] = useState(() => defaultColor);

  // Example usage of mode and setMode to avoid unused variable errors
  const toggleColorMode = React.useCallback(() => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
  });

  useEffect(() => {
    Cookies.set("colorMode", String(mode));
  }, [mode]);

  const theme = useMemo(() => MuiTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={toggleColorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  return useContext(ColorModeContext);
}
