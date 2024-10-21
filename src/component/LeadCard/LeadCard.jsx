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
        <CustomTypography
          className="address"
          variant="h6"
          component="div"
          sx={{
            fontFamily: "LufgaRegular",
            color: "#191919 !important",
            fontSize: { xs: '15px', sm: '20px', md: '25px' }, // Responsive font size
          }}
        >
          {address}
        </CustomTypography>
        <CustomTypography
          className="city"
          variant="body1"
          color="textSecondary"
          sx={{
            fontFamily: "LufgaRegular",
            color: "#0177FB !important",
            fontSize: { xs: '16px', sm: '18px', md: '21px' }, // Responsive font size
            marginTop: "7px",
          }}
        >
          {city}
        </CustomTypography>
        <CustomTypography
          className="condition"
          variant="body2"
          color="textSecondary"
          sx={{
            fontFamily: "LufgaRegular",
            color: "#191919 !important",
            fontSize: { xs: '14px', sm: '16px', md: '16px' }, // Responsive font size
            marginTop: "8px",
          }}
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
          <CustomTypography
            className="status"
            variant="body2"
            sx={{
              fontFamily: "LufgaMedium",
              fontSize: { xs: '14px', sm: '16px', md: '19px' }, // Responsive font size
            }}
          >
            {status}
          </CustomTypography>
        </Box>

        <CustomTypography
          className="Occupancy"
          variant="body2"
          sx={{
            fontFamily: "LufgaRegular",
            color: "#191919 !important",
            fontSize: { xs: '14px', sm: '16px', md: '18px' }, // Responsive font size
            marginTop: "13px",
            textAlign: "center",
          }}
        >
          Occupancy: By Owner
        </CustomTypography>
        <CustomTypography
          className="Closing"
          variant="body2"
          sx={{
            fontFamily: "LufgaRegular",
            color: "#191919 !important",
            fontSize: { xs: '14px', sm: '16px', md: '18px' }, // Responsive font size
            marginTop: "13px",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          Closing: 30-60 Days
        </CustomTypography>
        <Button
          variant="contained"
          className="LeadBtn"
          sx={{
            backgroundColor: "#0177FB", // Change to #0177FB
            color: "#FFFFFF", // Change text color to #FFFFFF
            width: "100%", // Use full width
            maxWidth: "265px", // Limit the max width
            height: "56px", // Set height to 56px
            borderRadius: "15px", // Set border radius to 15px
            marginTop: "16px", // Add some space above the button
            fontFamily: "LufgaMedium",
            fontSize: { xs: '12px', sm: '15px', md: '17px' }, // Responsive font size
            fontWeight: "bold", // Optional: make text bold
          }}
        >
          Asking Price: {askingPrice}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LeadCard;
