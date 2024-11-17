import React from "react";
import { Typography, Box, Switch as MuiSwitch } from "@mui/material";

const SwitchComponent = ({ activeTab, switchView }) => {
  // Handle tab switch (between Leads and Pidding)
  const handleSwitchChange = (event) => {
    switchView(event);
  };

  return (
    <Box
      sx={{
        mb: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: activeTab === 0 ? "#0177FB" : "#000", mr: 2 }}
      >
        Normal Leads
      </Typography>
      <MuiSwitch
        checked={activeTab === 1}
        onChange={handleSwitchChange}
        inputProps={{ "aria-label": "Switch between Leads and Pidding" }}
      />
      <Typography
        variant="h6"
        sx={{ color: activeTab === 1 ? "#0177FB" : "#000", ml: 2 }}
      >
        Bidding Leads
      </Typography>
    </Box>
  );
};

export default SwitchComponent;
