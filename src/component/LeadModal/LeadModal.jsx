import React from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Increased width
  maxHeight: "80vh", // Maximum height to fit the screen
  overflowY: "auto", // Enable vertical scrolling
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2, // Optional: add rounded corners
};

const LeadModal = ({
  open,
  handleCloseModal,
  formData,
  handleChange,
  handleSubmit,
  states,
}) => {
  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          Seller Information
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>Best Time for Callback</InputLabel>
            <Select
              name="bestTimeForCallback"
              value={formData.bestTimeForCallback}
              onChange={handleChange}
              label="Best Time for Callback"
            >
              <MenuItem value="Morning">Morning</MenuItem>
              <MenuItem value="Afternoon">Afternoon</MenuItem>
              <MenuItem value="Evening">Evening</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Bed Count"
            name="bedCount"
            value={formData.bedCount}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Bath Count"
            name="bathCount"
            value={formData.bathCount}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Sqft"
            name="sqft"
            value={formData.sqft}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>Occupancy</InputLabel>
            <Select
              name="occupancy"
              value={formData.occupancy}
              onChange={handleChange}
              label="Occupancy"
            >
              <MenuItem value={"Occupied by the owner"}>
                Occupied by the owner
              </MenuItem>
              <MenuItem value="Vacant">Vacant</MenuItem>
              <MenuItem value="Rented">Rented</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Motivation"
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Asking Price"
            name="askingPrice"
            value={formData.askingPrice}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>State</InputLabel>
            <Select
              name="state"
              value={formData.state._id}
              onChange={handleChange}
              label="State"
            >
              {states.map((stat) => (
                <MenuItem key={stat._id} value={stat._id}>
                  {stat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Closing Time"
            name="closingTime"
            value={formData.closingTime}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>Temperature</InputLabel>
            <Select
              name="leadType"
              value={formData.leadType._id}
              onChange={handleChange}
              label="Temperature"
            >
              <MenuItem value="670bec8e0e4efa75a6485bc7">Hot</MenuItem>
              <MenuItem value="670beca70e4efa75a6485bc8">Warm</MenuItem>
              <MenuItem value="670becb00e4efa75a6485bc9">Cold</MenuItem>
            </Select>
          </FormControl>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              onClick={() => handleSubmit(formData._id)}
              variant="contained"
            >
              Submit
            </Button>
            <Button onClick={handleCloseModal} variant="outlined">
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default LeadModal;
