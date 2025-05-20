import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle, Brightness4Rounded } from "@mui/icons-material";
import ModeSwitcher from "./ModeSwitcher";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

export default function AccountButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  const renderMenu = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        keepMounted
        open={isMenuOpen}
        onClose={handleProfileMenuClose}
      >
        <MenuItem>
          <ModeSwitcher />
        </MenuItem>
        <MenuItem>
          <LogoutButton />
        </MenuItem>
      </Menu>
    );
  };
  return (
    <Box sx={{ display: { xs: "flex" } }}>
      <IconButton edge="end" color="inherit" onClick={handleProfileMenuOpen}>
        <AccountCircle />
      </IconButton>
      {renderMenu()}
    </Box>
  );
}
