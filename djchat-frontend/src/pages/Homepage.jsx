import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import { Link } from "@mui/material";
export default function Homepage() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <PrimaryAppBar />
      </Box>
    </>
  );
}
