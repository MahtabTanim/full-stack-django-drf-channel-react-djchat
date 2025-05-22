import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
export default function CreateServerButton() {
  const navigattor = useNavigate();
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          p: 4,
          borderRadius: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Ready to create your server?
        </Typography>
        <Button
          onClick={() => {
            navigattor({ to: "/createServer" });
          }}
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Create Server
        </Button>
      </Box>
    </Container>
  );
}
