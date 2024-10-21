import React from "react";
import { Card, Button, Box, TextField } from "@mui/material";
import CustomTypography from "../CustomTypography/CustomTypography"; // Import the shared component

const PiddingCard = ({ address, city, condition, askingPrice, status }) => {
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
        width: { xs: "100%", sm: "100%" },
        height: "auto",
        bgcolor: "#F9F9F9",
        borderRadius: "20px",
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Column on mobile, row on larger screens
        justifyContent: "space-between",
        padding: "42px",
        boxShadow: 2,
        marginBottom: { xs: "16px", sm: "24px" },
      }}
    >
      {/* Left Part: Address, City, Condition, etc. */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "center", md: "space-between" }, // Center content vertically on mobile
          alignItems: { xs: "center", md: "flex-start" }, // Center horizontally on mobile, left-align on larger screens
          width: { xs: "100%", md: "60%" },
          textAlign: { xs: "center", md: "left" }, // Center text on mobile, left-align on larger screens
        }}
      >
        <CustomTypography className="address" variant="h6" component="div">
          {address}
        </CustomTypography>
        <CustomTypography className="city" variant="body1" color="textSecondary">
          {city}
        </CustomTypography>
        <CustomTypography
          className="condition"
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "8px" }}
        >
          Condition: {condition}
        </CustomTypography>

        {/* Centered Status with dynamic background and text color */}
        <Box
          sx={{
            backgroundColor: statusStyles.backgroundColor,
            color: statusStyles.color,
            padding: "0",
            borderRadius: "25.74px",
            marginTop: "13px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "79.04px",
            height: "35px",
          }}
        >
          <CustomTypography className="status" variant="body2">
            {status}
          </CustomTypography>
        </Box>

        <CustomTypography
          className="Occupancy"
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "8px" }}
        >
          Occupancy: By Owner
        </CustomTypography>
        <CustomTypography
          className="closing"
          variant="body2"
          color="textSecondary"
          sx={{ marginTop: "8px" }}
        >
          Closing: 30-60 Days
        </CustomTypography>
      </Box>

      {/* Right Part: Current Price and Bidding Field */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-end" }, // Center on mobile, right-align on larger screens
          width: { xs: "100%", md: "35%" },
          textAlign: { xs: "center", md: "right" }, // Center text on mobile, right-align on larger screens
        }}
      >
        <CustomTypography className="price-label" variant="body1">
          Current Price
        </CustomTypography>
        <CustomTypography
          className="current-price"
          variant="h5"
          color="primary"
          sx={{ fontWeight: "bold" }}
        >
          {askingPrice}
        </CustomTypography>

        {/* Bidding Input Field */}
        <TextField
          label="Enter Your Price"
          variant="outlined"
          sx={{
            marginTop: "16px",
            width: { xs: "100%", sm: "306px" },
            borderRadius: "15px",
            border: "1px solid #0177FB",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
          }}
        />

        <Button
          variant="contained"
          className="BID"
          sx={{
            backgroundColor: "#0177FB",
            color: "#FFFFFF",
            width: { xs: "100%", sm: "306px" },
            height: "56px",
            borderRadius: "15px",
            marginTop: "16px",
          }}
        >
       Add Bid
        </Button>
      </Box>
    </Card>
  );
};

export default PiddingCard;
