import { useFormik } from "formik";
import { useAuthContext } from "../components/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import djchatLogo from "../assets/logo.png";

export default function Register() {
  const navigattor = useNavigate();
  const { register } = useAuthContext();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.username) {
        errors.username = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const { username, password, first_name, last_name } = values;
      const res = await register(username, password, first_name, last_name);
      if (!res || !res.success) {
        formik.setErrors({
          username: "Invalid username or password",
          password: "Invalid username or password",
        });
      } else {
        navigattor({ to: "/login" });
      }
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f9f9f9",
          padding: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Avatar
          src={djchatLogo}
          alt="djchat logo"
          sx={{
            width: 90,
            height: 90,
            mb: 2,
          }}
        />
        <Typography
          variant="h5"
          noWrap
          component="h1"
          sx={{
            fontWeight: 600,
            color: "#1a1a1a",
            mb: 2,
          }}
        >
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ width: "100%" }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="first_name"
            name="first_name"
            label="First Name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            sx={{ borderRadius: 4, backgroundColor: "#fff" }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="last_name"
            name="last_name"
            label="Last Name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            sx={{ borderRadius: 4, backgroundColor: "#fff" }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={!!formik.touched.username && !!formik.errors.username}
            helperText={formik.touched.username && formik.errors.username}
            sx={{ borderRadius: 4, backgroundColor: "#fff" }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="password"
            name="password"
            type="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={!!formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ borderRadius: 4, backgroundColor: "#fff" }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disableElevation
            sx={{
              mt: 3,
              mb: 2,
              py: 1.2,
              backgroundColor: "primary.main",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              ":hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
