import { useFormik } from "formik";
import { useAuthContext } from "../components/contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";
export default function Login() {
  const navigattor = useNavigate();
  const { login } = useAuthContext();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { username, password } = values;
      const res = await login(username, password);
      if (!res || !res.success) {
        console.log("login failed");
      } else {
        navigattor({ to: "/" });
      }
    },
  });
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <button type="submit">Log In</button>
      </form>
    </>
  );
}
