import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Switch as MuiSwitch, // Rename to avoid conflict with the component name
} from "@mui/material";
import axiosInstance from "../../axios";

const SwitchComponent = () => {
  const [activeTab, setActiveTab] = useState(0);





  // Handle tab switch (between Leads and Clients)
  const handleSwitchChange = (event) => {
    setActiveTab(event.target.checked ? 1 : 0); // Switch to Clients if checked, Leads if unchecked
    setPage(0); // Reset to first page on switch change
  };

  // Fetch data based on activeTab when the component loads or activeTab changes
  useEffect(() => {
    if (activeTab === 0) {
      fetchLeads();
    } else {
      fetchClients();
    }
  }, [activeTab]);

  return (
    <Box sx={{ mb: 2 }}>
     
        <Typography
          variant="h6"
          sx={{ color: activeTab === 0 ? "#0177FB" : "#000", mr: 2 }}
        >
          Leads
        </Typography>
        <MuiSwitch
          checked={activeTab === 1}
          onChange={handleSwitchChange}
          inputProps={{ "aria-label": "Switch between Leads and Clients" }}
        />
        <Typography
          variant="h6"
          sx={{ color: activeTab === 1 ? "#0177FB" : "#000", ml: 2 }}
        >
          Clients
        </Typography>
    

    </Box>
  );
};

export default SwitchComponent;
