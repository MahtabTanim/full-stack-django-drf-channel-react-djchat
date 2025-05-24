import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Collapse,
  Paper,
} from "@mui/material";
import useServerCategoryService from "../../services/ServerCategoryService";
import { useNavigate } from "@tanstack/react-router";

function ChannelForm({ server_id }) {
  const { createChannel } = useServerCategoryService();
  const navigattor = useNavigate();
  const validIconTypes = [".jpg", ".jpeg", ".png", ".svg"];
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    topic: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createChannel({ ...formData, server: server_id });
    if (response.success) {
      navigattor({ to: `/server/${server_id}` });
      setFormData({ name: "", topic: "" });
      setShowForm(false);
      console.log("Hello , all good");
    } else {
      alert(response.message);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm((prev) => !prev)}
      >
        Create a Channel
      </Button>

      <Collapse in={showForm}>
        <Paper elevation={3} sx={{ mt: 3, p: 2, maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom>
            New Channel
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Name (Optional)"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Topic *"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
}

export default ChannelForm;
