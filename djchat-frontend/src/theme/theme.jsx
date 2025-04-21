import { createTheme, responsiveFontSizes } from "@mui/material";

export default function MuiTheme() {
  let theme = createTheme({
    typography: {
      fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
    },
    primaryAppBar: {
      height: 50,
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          color: "default",
          elevation: 0,
        },
      },
    },
  });
  theme = responsiveFontSizes(theme);
  return theme;
}
