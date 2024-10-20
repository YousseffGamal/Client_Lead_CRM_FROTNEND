import React from "react";
import { Card, CardContent, Button, Box } from "@mui/material";
import CustomTypography from "../CustomTypography/CustomTypography"; // Import the shared component

const LeadCard = ({ address, city, condition, askingPrice, status }) => {
  const truncateText = (text, percentage) => {
    const truncatedLength = Math.ceil(text.length * percentage);
    return text.slice(0, truncatedLength) + "...";
  };

  // Define styles based on the lead's status
  const getStatusStyles = (status) => {
    switch (status) {
      case "Hot":
        return {
          backgroundColor: "#FFEBED",
          color: "#CB0A1D",
        };
      case "Cold":
        return {
          backgroundColor: "#F0F7FF",
          color: "#0466D4",
        };
      case "Warm":
        return {
          backgroundColor: "#FFFAE6",
          color: "#D0A704",
        };
      default:
        return {
          backgroundColor: "#FFFFFF",
          color: "#000000",
        };
    }
  };

  const statusStyles = getStatusStyles(status);

  return (
    <Card
      sx={{
        width: "100%",
        height: "auto",
        bgcolor: "#FFFFFF",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <CardContent
        sx={{
          marginTop: "28px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0", // Adjusting padding to align items better
        }}
      >
        <CustomTypography className="address" variant="h6" component="div" textAlign="center">
          {address}
        </CustomTypography>
        <CustomTypography className="city" variant="body1" color="textSecondary" textAlign="center">
          {city}
        </CustomTypography>
        <CustomTypography
          className="condition"
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "8px", textAlign: "center" }}
        >
          Condition: {truncateText(condition, 0.3)}
        </CustomTypography>

        {/* Centered Status with dynamic background and text color */}
        <Box
          sx={{
            backgroundColor: statusStyles.backgroundColor,
            color: statusStyles.color,
            padding: "0", // Remove extra padding to fit the height
            borderRadius: "25.74px",
            marginTop: "13px",
            display: "flex",
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            width: "79.04px", // Set the width to 79.04px
            height: "35px", // Set the height to 35px
          }}
        >
          <CustomTypography className="status" variant="body2">
            {status}
          </CustomTypography>
        </Box>

        <CustomTypography className="Occupancy" variant="body2" sx={{ textAlign: "center", marginTop: "8px" }}>
          Occupancy: By Owner
        </CustomTypography>
        <CustomTypography className="Closing" variant="body2" sx={{ textAlign: "center", marginBottom: "16px" }}>
          Closing: 30-60 Days
        </CustomTypography>
        <Button
          variant="contained"
          className="LeadBtn" 
          sx={{
            backgroundColor: "#0177FB", // Change to #0177FB
            color: "#FFFFFF", // Change text color to #FFFFFF
            width: "265px", // Fixed width
            height: "56px", // Set height to 56px
            borderRadius: "15px", // Set border radius to 15px
            marginTop: "16px", // Add some space above the button
          }}
        >
          Asking Price: {askingPrice}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LeadCard;
