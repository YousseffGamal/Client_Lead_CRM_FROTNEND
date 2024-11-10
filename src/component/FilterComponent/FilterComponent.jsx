import React, { useState, useEffect } from "react";
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
import axiosInstance from "../../axios";
import {
  occupancyOptions,
  leadTemperatureOptions,
} from "../../component/constance/constance";

const FilterComponent = ({ setPricedLeads }) => {
  const [state, setState] = useState("");
  const [occupancy, setOccupancy] = useState("");
  const [temperature, setTemperature] = useState("");
  const [startClosing, setStartClosing] = useState("");
  const [endClosing, setEndClosing] = useState("");
  const [startAskingPrice, setStartAskingPrice] = useState("");
  const [endAskingPrice, setEndAskingPrice] = useState("");
  const [states, setStates] = useState([]);

  // Fetch states from the server
  const getStates = async () => {
    try {
      const response = await axiosInstance.get("/getAllStates");
      setStates(response.data.states);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  useEffect(() => {
    getStates();
  }, []);

  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  // Handle filtering and setting data
  const handleFilter = async () => {
    try {
      const queryParams = {
        state,
        occupancy,
        leadType: temperature,
        startAskingPrice,
        endAskingPrice,
        closing: `${startClosing}-${endClosing}`,
      };

      const response = await axiosInstance.get(
        "/getLeadsFiltered",
        { params: queryParams }
      );

      setPricedLeads(response.data.data); // Make sure the state update function for leads is passed as a prop
    } catch (error) {
      console.error("Error fetching filtered leads:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
        justifyContent: { xs: "center", sm: "flex-start" },
        marginBottom: 2,
      }}
    >
      <FormControl sx={{ flex: 1, minWidth: 185.79 }}>
        <InputLabel>State</InputLabel>
        <Select
          value={state}
          label="State"
          onChange={(event) => handleChange(event, setState)} // Corrected here to setState
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

      <FormControl sx={{ flex: 1, minWidth: 185.79 }}>
        <InputLabel>Occupancy</InputLabel>
        <Select
          value={occupancy}
          label="Occupancy"
          onChange={(event) => handleChange(event, setOccupancy)}
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

      <FormControl sx={{ flex: 1, minWidth: 185.79 }}>
        <InputLabel>Lead Type</InputLabel>
        <Select
          value={temperature}
          label="Temperature"
          onChange={(event) => handleChange(event, setTemperature)}
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

      {/* Closing Range Filters */}
      <TextField
        value={startClosing}
        label="Start Closing (Days)"
        onChange={(event) => handleChange(event, setStartClosing)}
        type="number"
        sx={{ flex: 1, minWidth: 185.79 }}
      />
      <TextField
        value={endClosing}
        label="End Closing (Days)"
        onChange={(event) => handleChange(event, setEndClosing)}
        type="number"
        sx={{ flex: 1, minWidth: 185.79 }}
      />

      {/* Asking Price Range Filters */}
      <TextField
        value={startAskingPrice}
        label="Start Asking Price ($)"
        onChange={(event) => handleChange(event, setStartAskingPrice)}
        type="number"
        sx={{ flex: 1, minWidth: 185.79 }}
      />
      <TextField
        value={endAskingPrice}
        label="End Asking Price ($)"
        onChange={(event) => handleChange(event, setEndAskingPrice)}
        type="number"
        sx={{ flex: 1, minWidth: 185.79 }}
      />

      <IconButton
        sx={{
          backgroundColor: "#000000",
          color: "#FFFFFF",
          height: "48px",
          width: "48px",
          borderRadius: "16px",
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
