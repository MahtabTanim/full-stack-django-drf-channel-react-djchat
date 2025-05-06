import { useFormik } from "formik";
import { useAuthContext } from "../components/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export default function Register() {
  const navigattor = useNavigate();
  const { register } = useAuthContext();
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
      const res = await register(username, password);
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
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          noWrap
          component="h1"
          sx={{
            fontWeight: 500,
            pb: 2,
          }}
        >
          Register
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            autoFocus
            fullWidth
            id="username"
            name="username"
            label="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={!!formik.touched.username && !!formik.errors.username}
            helperText={formik.touched.username && formik.errors.username}
          ></TextField>
          <TextField
            margin="normal"
            fullWidth
            id="password"
            name="password"
            type="password"
            label="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={!!formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          ></TextField>
          <Button
            variant="contained"
            disableElevation
            type="submit"
            sx={{ mt: 1, mb: 2 }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
