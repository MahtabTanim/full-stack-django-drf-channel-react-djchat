import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
export default function DrawerToggle({
  primaryDrawerStatus,
  handlePrimaryDrawerOpen,
  handlePrimaryDrawerClose,
}) {
  return (
    <>
      <IconButton
        onClick={
          primaryDrawerStatus
            ? handlePrimaryDrawerClose
            : handlePrimaryDrawerOpen
        }
        sx={{
          height: "50px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {primaryDrawerStatus ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
    </>
  );
}
