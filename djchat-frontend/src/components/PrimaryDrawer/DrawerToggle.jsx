import { Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
export default function DrawerToggle({
  primaryDrawerStatus,
  handlePrimaryDrawerOpen,
  handlePrimaryDrawerClose,
}) {
  return (
    <>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          onClick={
            primaryDrawerStatus
              ? handlePrimaryDrawerClose
              : handlePrimaryDrawerOpen
          }
        >
          {primaryDrawerStatus ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>
    </>
  );
}
