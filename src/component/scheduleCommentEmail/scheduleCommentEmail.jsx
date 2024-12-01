import React, { useState } from "react";
import {
  Box,
  Modal,
  TextField,
  Typography,
  Button,
} from "@mui/material";

const TimeDateModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    datetime: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Select Date and Time
        </Typography>
        <TextField
          label="Select Date and Time"
          type="datetime-local"
          name="datetime"
          value={formData.datetime}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Box sx={{ textAlign: "right" }}>
          <Button
            onClick={handleFormSubmit}
            variant="contained"
            color="primary"
            sx={{ mr: 1 }}
          >
            Submit
          </Button>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TimeDateModal;
