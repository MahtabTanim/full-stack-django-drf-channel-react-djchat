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
export default function Login() {
  const navigattor = useNavigate();
  const { login } = useAuthContext();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
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
      const { username, password } = values;
      const res = await login(username, password);
      if (!res || !res.success) {
        formik.setErrors({
          username: "Invalid username or password",
          password: "Invalid username or password",
        });
      } else {
        navigattor({ to: "/" });
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
            width: 64,
            height: 64,
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
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ width: "100%" }}
        >
          <TextField
            autoFocus
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={!!formik.touched.username && !!formik.errors.username}
            helperText={formik.touched.username && formik.errors.username}
            sx={{
              mt: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#fff",
              },
            }}
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
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#fff",
              },
            }}
          />
          <Button
            variant="contained"
            disableElevation
            type="submit"
            fullWidth
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
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Button
              onClick={() => {
                navigattor({ to: "/register" });
              }}
              style={{ color: "#1976d2", textDecoration: "none" }}
            >
              Register
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
