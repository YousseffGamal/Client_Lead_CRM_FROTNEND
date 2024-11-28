// PiddingCard.js
import React, { useState } from "react";
import { Card, Button, Box, TextField } from "@mui/material";
import CustomTypography from "../CustomTypography/CustomTypography"; // Import the shared component
import Notification from "../Notification/Notification"; // Import the Notification component
import CountdownTimer from "../CountdownTimer/CountDownTimer";

const PiddingCard = ({
  address,
  city,
  condition,
  intialBiddingPrice,
  leatType,
  closingTime,
  occupancy,
  status,
  biddingAmount,
  leadId,
  bidAmount,
  setbidAmount,
  value,
  errorMessage,
  onBidChange,
  BidDurationDelay,
}) => {
  // State for notification
  const [notificationOpen, setNotificationOpen] = useState(false);
  // const [bidAmount, setbidAmount] = useState("");

  // Define styles based on the lead's status
  const getStatusStyles = (leatType) => {
    switch (leatType) {
      case "Hot":
        return { backgroundColor: "#FFEBED", color: "#CB0A1D" };
      case "Cold":
        return { backgroundColor: "#F0F7FF", color: "#0466D4" };
      case "Warm":
        return { backgroundColor: "#FFFAE6", color: "#D0A704" };
      default:
        return { backgroundColor: "#FFFFFF", color: "#000000" };
    }
  };

  const statusStyles = getStatusStyles(leatType);

  // Function to handle bid submission
  const handleBid = () => {
    // Here you would add the logic to submit the bid
    // After successfully adding the bid, show the notification
    biddingAmount(leadId);
    setNotificationOpen(true);
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "auto",
        bgcolor: "#F9F9F9",
        borderRadius: "20px",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        padding: { xs: "20px", sm: "30px", md: "42px" },
        boxShadow: 2,
        marginBottom: { xs: "16px", sm: "24px" },
        flexWrap: "wrap",
      }}
    >
      {/* Left Part: Address, City, Condition, etc. */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: { xs: "center", md: "flex-start" },
          width: { xs: "100%", md: "60%" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <CustomTypography
          className="address"
          variant="h6"
          component="div"
          sx={{ fontSize: { xs: "24px", sm: "26px", md: "28px", lg: "31px" } }}
        >
          {address}
        </CustomTypography>
        <CustomTypography
          className="city"
          variant="body1"
          color="textSecondary"
          sx={{ fontSize: { xs: "18px", sm: "20px", md: "21px" } }}
        >
          {city}
        </CustomTypography>
        <CustomTypography
          className="condition"
          variant="body2"
          color="textSecondary"
          sx={{
            marginTop: "8px",
            fontSize: { xs: "14px", sm: "15px", md: "16px" },
          }}
        >
          Condition: {condition}
        </CustomTypography>
        {BidDurationDelay}
        <CountdownTimer duration={BidDurationDelay} />
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
          <CustomTypography
            className="status"
            variant="body2"
            sx={{ fontSize: { xs: "16px", sm: "17px", md: "19px" } }}
          >
            {leatType}
          </CustomTypography>
        </Box>

        <CustomTypography
          className="Occupancy"
          variant="body2"
          color="textSecondary"
          sx={{
            marginTop: "8px",
            fontSize: { xs: "16px", sm: "17px", md: "18px" },
          }}
        >
          Occupancy: {occupancy}
        </CustomTypography>
        <CustomTypography
          className="closing"
          variant="body2"
          color="textSecondary"
          sx={{
            marginTop: "8px",
            fontSize: { xs: "16px", sm: "17px", md: "18px" },
          }}
        >
          Closing: {closingTime} Days
        </CustomTypography>
      </Box>

      {/* Right Part: Current Price and Bidding Field */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-end" },
          width: { xs: "100%", md: "35%" },
          textAlign: { xs: "center", md: "right" },
        }}
      >
        <CustomTypography
          className="price-label"
          variant="body1"
          sx={{ fontSize: { xs: "16px", sm: "18px" } }}
        >
          Current Price
        </CustomTypography>
        <CustomTypography
          className="current-price"
          variant="h5"
          color="primary"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "30px", sm: "40px", md: "50px" },
          }}
        >
          {intialBiddingPrice}
        </CustomTypography>

        {/* Bidding Input Field */}
        {status}
        <TextField
          disabled={status === "Closed" || status === "Relisted"}
          label="Enter Your Price"
          variant="outlined"
          value={value}
          sx={{
            marginTop: "16px",
            width: { xs: "100%", sm: "100%" },
            borderRadius: "15px",
            border: "1px solid #0177FB",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
          }}
          onChange={(e) => onBidChange(leadId, e.target.value)}
        />
        {errorMessage}

        <Button
          disabled={status === "Closed" || status === "Relisted"}
          variant="contained"
          className="BID"
          onClick={handleBid} // Call handleBid when the button is clicked
          sx={{
            backgroundColor: "#0177FB",
            color: "#FFFFFF",
            width: { xs: "100%", sm: "100%" },
            height: "56px",
            borderRadius: "15px",
            marginTop: "16px",
            fontSize: { xs: "16px", sm: "18px", md: "20px" },
          }}
        >
          Add Bid
        </Button>
      </Box>

      {/* Notification Component */}
      <Notification
        open={notificationOpen}
        message="Bid successfully added!"
        onClose={() => setNotificationOpen(false)}
      />
    </Card>
  );
};

export default PiddingCard;
