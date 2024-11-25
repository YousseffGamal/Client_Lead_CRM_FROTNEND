import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { Box, TextField, Typography, Button, Modal, CircularProgress } from "@mui/material";
import ChildModal from "../childModal/ChildModal";
import PaymentMethodSelector from "../paymentMethods/PaymentMethods";
import CheckOutForm from "../CheckOutForm/CheckOutForm";
import { useAuth } from "../../store/authContext";
import CheckOutComponent from "../CheckOutComponent/CheckOutComponent";
import axiosInstance from "../../axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  maxHeight: "600px", // Set a max height for the box
  overflowY: "auto",
};
const LeadInputSection = () => {
  const { leadId } = useParams(); // Extract leadId from the URL
  const [leadData, setLeadData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth, setAuth } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get(`/getLeadById/${leadId}`);
        setLeadData(response.data.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching lead data:", err);
        setError("Failed to fetch lead data. Please try again later.");
        setLoading(false);
      }
    };

    if (leadId) {
      fetchLeadData();
    }
  }, [leadId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!leadData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography>No lead data found for this ID.</Typography>
      </Box>
    );
  }

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlesuccessfulLogin = (CustomerId) => {
    console.log("CustomerId", CustomerId);
    if (CustomerId) {
      setAuth({
        ...auth,
        paymentMethod: true,
        user: {
          ...auth.user,
          CustomerId,
        },
      });
      // Retrieve the existing user object from localStorage
      let user = JSON.parse(localStorage.getItem("user"));

      // Update the CustomerId property
      user = {
        ...user,
        CustomerId,
      };

      // Save the updated user object back to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("paymentMethod", true);
    }

    setOpen(false);
  };
  return (
    <>
      {/* First Row: Map and Inputs */}
      <Box sx={{ display: "flex", mb: 3 }}>
        <Box sx={{ flex: 1, mr: 2 }}>
          {/* Placeholder for the map component */}
          <div
            style={{
              height: "400px",
              backgroundColor: "#e0e0e0",
              border: "2px solid #456EFE",
              borderRadius: "20px",
            }}
          ></div>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Lead Information
          </Typography>
          <TextField
            fullWidth
            label="Asking Price"
            variant="outlined"
            margin="normal"
            sx={{
              height: "97px", // Set height for the input
              backgroundColor: "#0177FB", // Background color for Asking Price
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove the border
                },
                "&.Mui-focused fieldset": {
                  border: "none", // Remove the border when focused
                },
              },
              "& input": {
                textAlign: "center", // Center the text value
                color: "#FFFFFF", // Input text color for Asking Price
                fontFamily: "LufgaRegular", // Set your desired font family here
              },
              "& label": {
                color: "#FFFFFF", // Label color for Asking Price
                fontFamily: "LufgaMedium", // Set your desired font family here
              },
            }}
            value="100000" // Example value
            InputLabelProps={{
              sx: { color: "#FFFFFF", fontFamily: "LufgaMedium" }, // Label color and font family
            }}
            InputProps={{
              readOnly: true, // Disable input
            }}
          />
          <TextField
            fullWidth
            label="Condition"
            variant="outlined"
            margin="normal"
            multiline
            rows={3}
            sx={{
              height: "230px", // Set height for the input
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove the border
                },
                "&.Mui-focused fieldset": {
                  border: "none", // Remove the border when focused
                },
              },
              "& textarea": {
                // Targeting the textarea for multiline input
                textAlign: "center", // Center the text value
                color: "rgba(25, 25, 25, 0.7)", // Textarea text color with opacity
                fontFamily: "LufgaRegular", // Set your desired font family here
              },
              "& label": {
                color: "#191919", // Label color
                fontFamily: "LufgaMedium", // Set your desired font family here
              },
            }}
            value={leadData.condition || ""}
            InputLabelProps={{
              sx: { color: "#FFFFFF", fontFamily: "LufgaMedium",fontSize:"25px" }, // Label color and font family
            }}
            InputProps={{
              readOnly: true, // Disable input
            }}
          />
        </Box>
      </Box>

      {/* Second Row: Two Inputs Beside Each Other */}
      <Box sx={{ display: "flex", mb: 3 }}>
        <Box sx={{ flex: 1, mr: 1 }}>
          <TextField
            fullWidth
            label="Phone Number: "
            variant="outlined"
            margin="normal"
            sx={{
              height: "63px", // Set height for the input
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove the border
                },
                "&.Mui-focused fieldset": {
                  border: "none", // Remove the border when focused
                },
              },
              "& input": {
                textAlign: "center", // Center the text value
                color: "rgba(25, 25, 25, 0.7)", // Input text color with opacity
                fontFamily: "LufgaRegular", // Set your desired font family here
              },
              "& label": {
                color: "#191919", // Label color
                fontFamily: "LufgaMedium", // Set your desired font family here
              },
            }}
            value={leadData.phone || ""}
            InputLabelProps={{
              sx: { color: "#FFFFFF", fontFamily: "LufgaMedium",fontSize:"25px" }, // Label color and font family
            }}
            InputProps={{
              readOnly: true, // Disable input
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            label="State"
            variant="outlined"
            margin="normal"
            sx={{
              height: "63px", // Set height for the input
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove the border
                },
                "&.Mui-focused fieldset": {
                  border: "none", // Remove the border when focused
                },
              },
              "& input": {
                textAlign: "center", // Center the text value
                color: "rgba(25, 25, 25, 0.7)", // Input text color with opacity
                fontFamily: "LufgaRegular", // Set your desired font family here
              },
              "& label": {
                color: "#191919", // Label color
                fontFamily: "LufgaMedium", // Set your desired font family here
              },
            }}
            value={leadData.state || ""}
            InputLabelProps={{
              sx: { color: "#FFFFFF", fontFamily: "LufgaMedium",fontSize:"25px" }, // Label color and font family
            }}
            InputProps={{
              readOnly: true, // Disable input
            }}
          />
        </Box>
      </Box>

      {/* Third Row: Seller Address Input */}
      <Box sx={{ display: "flex", mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            label="Address Line:"
            variant="outlined"
            margin="normal"
            sx={{
              height: "63px", // Set height for the input
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove the border
                },
                "&.Mui-focused fieldset": {
                  border: "none", // Remove the border when focused
                },
              },
              "& input": {
                textAlign: "center", // Center the text value
                color: "rgba(25, 25, 25, 0.7)", // Input text color with opacity
                fontFamily: "LufgaRegular", // Set your desired font family here
              },
              "& label": {
                color: "#191919", // Label color
                fontFamily: "LufgaMedium", // Set your desired font family here
              },
            }}
            value="123 m st" // Example value
            InputLabelProps={{
              sx: { color: "#FFFFFF", fontFamily: "LufgaMedium",fontSize:"25px" }, // Label color and font family
            }}
            InputProps={{
              readOnly: true, // Disable input
            }}
          />
        </Box>
      </Box>

      {/* Fourth Row: Listing and Occupancy Inputs */}
      <Box sx={{ display: "flex", mb: 3 }}>
        <Box sx={{ flex: 1, mr: 1 }}>
          <TextField
            fullWidth
            label="Status:"
            variant="outlined"
            margin="normal"
            sx={{
              height: "63px", // Set height for the input
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove the border
                },
                "&.Mui-focused fieldset": {
                  border: "none", // Remove the border when focused
                },
              },
              "& input": {
                textAlign: "center", // Center the text value
                color: "rgba(25, 25, 25, 0.7)", // Input text color with opacity
                fontFamily: "LufgaRegular", // Set your desired font family here
              },
              "& label": {
                color: "#191919", // Label color
                fontFamily: "LufgaMedium", // Set your desired font family here
              },
            }}
            value={leadData.status || ""}
            InputLabelProps={{
              sx: { color: "#FFFFFF", fontFamily: "LufgaMedium",fontSize:"25px" }, // Label color and font family
            }}
            InputProps={{
              readOnly: true, // Disable input
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            label="Occupancy:"
            variant="outlined"
            margin="normal"
            sx={{
              height: "63px", // Set height for the input
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove the border
                },
                "&.Mui-focused fieldset": {
                  border: "none", // Remove the border when focused
                },
              },
              "& input": {
                textAlign: "center", // Center the text value
                color: "rgba(25, 25, 25, 0.7)", // Input text color with opacity
                fontFamily: "LufgaRegular", // Set your desired font family here
              },
              "& label": {
                color: "#191919", // Label color
                fontFamily: "LufgaMedium", // Set your desired font family here
              },
            }}
            value={leadData.occupancy || ""}

            InputLabelProps={{
              sx: { color: "#FFFFFF", fontFamily: "LufgaMedium",fontSize:"25px" }, // Label color and font family
            }}
            InputProps={{
              readOnly: true, // Disable input
            }}
          />
        </Box>
      </Box>

      {/* Fifth Row: Lead Temperature and Closing Inputs */}
      <Box sx={{ display: "flex", mb: 3 }}>
        <Box sx={{ flex: 1, mr: 1 }}>
          <TextField
            fullWidth
            label="Lead Temperature:"
            variant="outlined"
            margin="normal"
            sx={{
              height: "63px", // Set height for the input
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove the border
                },
                "&.Mui-focused fieldset": {
                  border: "none", // Remove the border when focused
                },
              },
              "& input": {
                textAlign: "center", // Center the text value
                color: "rgba(25, 25, 25, 0.7)", // Input text color with opacity
                fontFamily: "LufgaRegular", // Set your desired font family here
              },
              "& label": {
                color: "#191919", // Label color
                fontFamily: "LufgaMedium", // Set your desired font family here
              },
            }}
            value={leadData.leadType || ""}
            InputLabelProps={{
              sx: { color: "#FFFFFF", fontFamily: "LufgaMedium",fontSize:"25px" }, // Label color and font family
            }}
            InputProps={{
              readOnly: true, // Disable input
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            label="Closing:"
            variant="outlined"
            margin="normal"
            sx={{
              height: "63px", // Set height for the input
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove the border
                },
                "&.Mui-focused fieldset": {
                  border: "none", // Remove the border when focused
                },
              },
              "& input": {
                textAlign: "center", // Center the text value
                color: "rgba(25, 25, 25, 0.7)", // Input text color with opacity
                fontFamily: "LufgaRegular", // Set your desired font family here
              },
              "& label": {
                color: "#191919", // Label color
                fontFamily: "LufgaMedium", // Set your desired font family here
              },
            }}
            value={leadData.closingTime || ""}
            InputLabelProps={{
              sx: { color: "#FFFFFF", fontFamily: "LufgaMedium",fontSize:"25px" }, // Label color and font family
            }}
            InputProps={{
              readOnly: true, // Disable input
            }}
          />
        </Box>
      </Box>
      {/* Fifth Row: Best Callback Time and Reason for Selling */}
      <Box sx={{ display: "flex", mb: 3 }}>
        <Box sx={{ flex: 1, mr: 1 }}>
          <TextField
            fullWidth
            label="Best Callback Time:"
            variant="outlined"
            margin="normal"
            sx={{
              height: "63px", // Set height for the input
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove the border
                },
                "&.Mui-focused fieldset": {
                  border: "none", // Remove the border when focused
                },
              },
              "& input": {
                textAlign: "center", // Center the text value
                color: "rgba(25, 25, 25, 0.7)", // Input text color with opacity
                fontFamily: "LufgaRegular", // Set your desired font family here
              },
              "& label": {
                color: "#191919", // Label color
                fontFamily: "LufgaMedium", // Set your desired font family here
              },
            }}
            value={leadData.bestTimeForCallback || ""}
            InputLabelProps={{
              sx: { color: "#FFFFFF", fontFamily: "LufgaMedium",fontSize:"25px" }, // Label color and font family
            }}
            InputProps={{
              readOnly: true, // Disable input
            }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            label="Motivation:"
            variant="outlined"
            margin="normal"
            sx={{
              height: "63px", // Set height for the input
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove the border
                },
                "&.Mui-focused fieldset": {
                  border: "none", // Remove the border when focused
                },
              },
              "& input": {
                textAlign: "center", // Center the text value
                color: "rgba(25, 25, 25, 0.7)", // Input text color with opacity
                fontFamily: "LufgaRegular", // Set your desired font family here
              },
              "& label": {
                color: "#191919", // Label color
                fontFamily: "LufgaMedium", // Set your desired font family here
              },
            }}
            value={leadData.motivation || ""}
            InputLabelProps={{
              sx: { color: "#FFFFFF", fontFamily: "LufgaMedium",fontSize:"25px" }, // Label color and font family
            }}
            InputProps={{
              readOnly: true, // Disable input
            }}
          />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 600 }}>
              {auth.paymentMethod ? (
                <PaymentMethodSelector
                  amount={300}
                  handleClose={handlesuccessfulLogin}
                />
              ) : (
                <CheckOutComponent
                  amount={300}
                  handleClose={handlesuccessfulLogin}
                />
              )}
            </Box>
          </Modal>
        </Box>
      </Box>

      <Button
        variant="contained"
        className="BID"
        onClick={handleOpen}
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
        Buy
      </Button>

    </>
  );
};

export default LeadInputSection;
