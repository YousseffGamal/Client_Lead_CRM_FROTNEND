import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const FilterComponent = ({ setFilteredLeads }) => {
  const [state, setState] = useState("");
  const [askingPrice, setAskingPrice] = useState("");
  const [occupancy, setOccupancy] = useState("");
  const [closing, setClosing] = useState("");
  const [temperature, setTemperature] = useState("");

  const states = [
    { id: "1", name: "Texas" },
    { id: "2", name: "California" },
    { id: "3", name: "New York" },
    // Add more states as needed
  ];

  const occupancyOptions = [
    { value: "occupied", label: "Occupied" },
    { value: "vacant", label: "Vacant" },
    // Add more occupancy options as needed
  ];

  const leadTemperatureOptions = [
    { value: "hot", label: "Hot" },
    { value: "warm", label: "Warm" },
    { value: "cold", label: "Cold" },
  ];

  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleFilter = () => {
    // Example filter logic (replace with your actual filtering logic)
    const filteredLeads = leads.filter((lead) => {
      return (
        (state === "" || lead.state === state) &&
        (occupancy === "" || lead.occupancy === occupancy) &&
        (closing === "" || lead.closing <= closing) &&
        (temperature === "" || lead.status === temperature)
      );
    });
    setFilteredLeads(filteredLeads);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1, // Reduced gap
        flexWrap: { xs: "wrap", sm: "nowrap" }, // Stack on small screens
        marginBottom: 2,
      }}
    >
      {/* State Filter */}
      <FormControl sx={{ flex: 1, minWidth: 185.79, borderRadius: "16.65px" }}>
        <InputLabel>State</InputLabel>
        <Select
          value={state}
          label="State"
          onChange={(event) => handleChange(event, setState)}
          sx={{ borderRadius: "16.65px" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {states.map((element) => (
            <MenuItem key={element.id} value={element.id}>
              {element.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Occupancy Filter */}
      <FormControl sx={{ flex: 1, minWidth: 185.79, borderRadius: "16.65px" }}>
        <InputLabel>Occupancy</InputLabel>
        <Select
          value={occupancy}
          label="Occupancy"
          onChange={(event) => handleChange(event, setOccupancy)}
          sx={{ borderRadius: "16.65px" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {occupancyOptions.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Closing Filter */}
      <TextField
        value={closing}
        label="Closing"
        onChange={(event) => handleChange(event, setClosing)}
        type="number"
        sx={{
          flex: 1,
          minWidth: 185.79,
          borderRadius: "16.65px",
        }}
      />

      {/* Asking Price Filter */}
      <TextField
        value={askingPrice}
        label="Asking Price"
        onChange={(event) => handleChange(event, setAskingPrice)}
        type="number"
        sx={{
          flex: 1,
          minWidth: 185.79,
          borderRadius: "16.65px",
        }}
      />

      {/* Temperature Filter */}
      <FormControl sx={{ flex: 1, minWidth: 185.79, borderRadius: "16.65px" }}>
        <InputLabel>Lead Type</InputLabel>
        <Select
          value={temperature}
          label="Temperature"
          onChange={(event) => handleChange(event, setTemperature)}
          sx={{ borderRadius: "16.65px" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {leadTemperatureOptions.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Icon Filter Button */}
      <IconButton
        sx={{
          backgroundColor: "#000000",
          borderRadius: "16.65px",
          color: "#FFFFFF",
          height: "48.28px",
          width: "48.28px",
          "&:hover": {
            backgroundColor: "#333333",
          },
        }}
        onClick={handleFilter}
      >
        <FilterListIcon />
      </IconButton>
    </Box>
  );
};

export default FilterComponent;
