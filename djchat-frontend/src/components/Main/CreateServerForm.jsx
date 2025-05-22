import djchatLogo from "../../assets/logo.png";
import { useFormik } from "formik";
import {
  Box,
  Avatar,
  Button,
  Container,
  TextField,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";

const categories = ["aaaa", 2, 3, 4];

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.category) {
    errors.category = "Required";
  }

  const validImageTypes = [".jpg", ".jpeg", ".png"];
  const validBannerTypes = [".svg", ".jpg", ".jpeg", ".png"];

  const validateFile = (file, validExtensions) => {
    if (!file) return true;
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    return validExtensions.includes(ext);
  };

  if (values.icon && !validateFile(values.icon, validImageTypes)) {
    errors.icon = "Invalid file type. Must be .jpg, .jpeg, or .png";
  }

  if (values.banner && !validateFile(values.banner, validBannerTypes)) {
    errors.banner = "Invalid file type. Must be .svg, .jpg, .jpeg, or .png";
  }

  return errors;
};

export default function CreateServerForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      icon: null,
      banner: null,
    },
    validate,
    onSubmit: (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      // send `formData` to the backend via fetch or Axios
      console.log("Submitting form:", values);
    },
  });

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h5" align="center">
          Create Server
        </Typography>

        <TextField
          label="Server Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={!!formik.errors.name}
          helperText={formik.errors.name}
          fullWidth
        />

        <TextField
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          multiline
          rows={3}
          fullWidth
        />

        <FormControl fullWidth error={!!formik.errors.category}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            label="Category"
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="outlined" component="label">
          Upload Icon
          <input
            type="file"
            name="icon"
            hidden
            accept=".jpg,.jpeg,.png"
            onChange={(event) =>
              formik.setFieldValue("icon", event.currentTarget.files[0])
            }
          />
        </Button>
        {formik.errors.icon && (
          <Typography color="error" variant="caption">
            {formik.errors.icon}
          </Typography>
        )}

        <Button variant="outlined" component="label">
          Upload Banner
          <input
            type="file"
            name="banner"
            hidden
            accept=".svg,.jpg,.jpeg,.png"
            onChange={(event) =>
              formik.setFieldValue("banner", event.currentTarget.files[0])
            }
          />
        </Button>
        {formik.errors.banner && (
          <Typography color="error" variant="caption">
            {formik.errors.banner}
          </Typography>
        )}

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Container>
  );
}
