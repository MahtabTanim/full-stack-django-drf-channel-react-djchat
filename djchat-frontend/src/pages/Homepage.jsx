import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDrawer from "./templates/PrimaryDrawer";
import SecondaryDrawer from "./templates/SecondaryDrawer";

export default function Homepage() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <PrimaryAppBar />
        <PrimaryDrawer />
        <SecondaryDrawer />
      </Box>
    </>
  );
}
