import useAuthService from "../../services/authSevice";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function LogoutButton() {
  const navigator = useNavigate();
  const { logout } = useAuthService();

  const handleLogout = () => {
    logout(navigator);
  };

  return (
    <Button
      variant="outlined"
      color="error"
      onClick={handleLogout}
      startIcon={<LogoutIcon />}
      sx={{
        textTransform: "none",
        borderRadius: 2,
        px: 2.5,
        py: 1,
        fontWeight: 600,
        borderWidth: 2,
        ":hover": {
          backgroundColor: "#ffe5e5",
          borderColor: "#d32f2f",
        },
      }}
    >
      Logout
    </Button>
  );
}
