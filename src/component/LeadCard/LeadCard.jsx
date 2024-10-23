import React from "react";
import { Card, CardContent, Button, Box } from "@mui/material";
import CustomTypography from "../CustomTypography/CustomTypography";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LeadCard = ({
  leadId, // Include leadId in props
  address,
  city,
  condition,
  askingPrice,
  leadType,
  closingTime,
  occupancy,
}) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const truncateText = (text, percentage) => {
    const truncatedLength = Math.ceil(text.length * percentage);
    return text.slice(0, truncatedLength) + "...";
  };

  const getStatusStyles = (leadType) => {
    switch (leadType) {
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

  const statusStyles = getStatusStyles(leadType);
  const handleCardClick = () => {
    // Navigate to the LeadView page and pass the leadId
    navigate(`/leadview/${leadId}`);
  };
  return (
    <Card
      sx={{
        width: "100%", // Responsive width
        maxWidth: { xs: "100%", sm: "450px", md: "100%" }, // Max width for small screens
        height: "100%",
        minHeight:"400px",
        bgcolor: "#FFFFFF",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "28px 34px", // Maintain padding
        boxSizing: "border-box", // Ensure padding affects the total size
      }}
      onClick={handleCardClick} // Trigger navigation on card click

    >
      <CardContent
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CustomTypography
          className="address"
          variant="h6"
          component="div"
          sx={{
            fontFamily: "LufgaRegular",
            color: "#191919 !important",
            fontSize: { xs: "15px", sm: "20px", md: "25px" },
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
            fontSize: { xs: "16px", sm: "18px", md: "21px" },
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
            fontSize: { xs: "14px", sm: "16px", md: "16px" },
            marginTop: "8px",
          }}
        >
          Condition: {truncateText(condition, 0.3)}
        </CustomTypography>

        <Box
          sx={{
            backgroundColor: statusStyles.backgroundColor,
            color: statusStyles.color,
            borderRadius: "25.74px",
            marginTop: "13px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "79.04px",
            height: "35px",
          }}
        >
          <CustomTypography
            className="status"
            variant="body2"
            sx={{
              fontFamily: "LufgaMedium",
              fontSize: { xs: "14px", sm: "16px", md: "19px" },
            }}
          >
            {leadType}
          </CustomTypography>
        </Box>

        <CustomTypography
          className="Occupancy"
          variant="body2"
          sx={{
            fontFamily: "LufgaRegular",
            color: "#191919 !important",
            fontSize: { xs: "14px", sm: "16px", md: "18px" },
            marginTop: "13px",
            textAlign: "center",
          }}
        >
          Occupancy: {occupancy}
        </CustomTypography>
        <CustomTypography
          className="Closing"
          variant="body2"
          sx={{
            fontFamily: "LufgaRegular",
            color: "#191919 !important",
            fontSize: { xs: "14px", sm: "16px", md: "18px" },
            marginTop: "13px",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          Closing Time: {closingTime} Days
        </CustomTypography>
        <Button
          variant="contained"
          className="LeadBtn"
          sx={{
            backgroundColor: "#0177FB",
            color: "#FFFFFF",
            width: "100%",
            maxWidth: "265px",
            height: "56px",
            borderRadius: "15px",
            marginTop: "16px",
            fontFamily: "LufgaMedium",
            fontSize: { xs: "12px", sm: "15px", md: "17px" },
            fontWeight: "bold",
          }}
        >
          Asking Price: {askingPrice}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LeadCard;
