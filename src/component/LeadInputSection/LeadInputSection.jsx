import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import {
  Box,
  TextField,
  Typography,
  Button,
  Modal,
  CircularProgress,
} from "@mui/material";
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
  const [stateName, setStateName] = useState(""); // State for storing the fetched state name
  const [blurClass, setBlurClass] = useState("");
  useEffect(() => {
    setBlurClass("blur-effect"); // Add a class dynamically
  }, []);
  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        setLoading(true);
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

  // Fetch state name once leadData is available
  useEffect(() => {
    const fetchStateName = async () => {
      if (leadData?.state) {
        try {
          const response = await axiosInstance.get(
            `/getStateBy/${leadData.state}`
          );
          setStateName(response.data.stateName || "Unknown State");
        } catch (error) {
          console.error("Error fetching state name:", error);
          setStateName("Unknown State");
        }
      }
    };

    fetchStateName();
  }, [leadData]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!leadData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
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
        <div className={blurClass}>

        <MapContainer
      center={[51.505, -0.09]} // Default coordinates (latitude, longitude)
      zoom={13} // Zoom level
      style={{
        height: "460px",
        borderRadius: "20px",
        border: "2px solid #456EFE",
      }}
    >
            {/* Add a TileLayer to display the map */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Add a Marker */}
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A sample marker. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
          </div>

        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Lead Information
          </Typography>
          <Box sx={{ flex: 1, mr: 1, mb: 2 }}>
            {/* Label for Asking Price */}
            <Box
              sx={{
                display: "block",
                color: "#000", // Label color
                fontFamily: "LufgaMedium",
                fontSize: "15px",
              }}
            >
              Asking Price
            </Box>

            {/* Input for Asking Price */}
            <TextField
              fullWidth
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
              }}
              value="100000" // Example value
              InputProps={{
                readOnly: true, // Disable input
              }}
            />
          </Box>

          <Box sx={{ flex: 1, mr: 1, mb: 2 }}>
            {/* Label for Condition */}
            <Box
              sx={{
                display: "block",
                color: "#191919", // Label color
                fontFamily: "LufgaMedium",
                fontSize: "15px",
              }}
            >
              Condition
            </Box>

            {/* Input for Condition */}
            <TextField
            className={blurClass}
              fullWidth
              variant="outlined"
              margin="normal"
              multiline
              rows={3}
              sx={{
                height: "230px", // Set height for the input
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                WebkitTextSecurity: "disc", // WebKit-specific
                textSecurity: "disc", // Standard property
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none", // Remove the border
                  },
                  "&.Mui-focused fieldset": {
                    border: "none", // Remove the border when focused
                  },
                },
                "& textarea": {
                  textAlign: "center", // Center the text value
                  color: "rgba(25, 25, 25, 0.7)", // Textarea text color with opacity
                  fontFamily: "LufgaRegular", // Set your desired font family here
                },
              }}
              value={leadData.condition || ""}
              InputProps={{
                readOnly: true, // Disable input
              }}
            />
          </Box>
        </Box>
      </Box>
      {/* Second Row: Two Inputs Beside Each Other */}
      <Box sx={{ display: "flex", mb: 3 }}>
        <Box sx={{ flex: 1, mr: 1 }}>
          {/* Label Component */}
          <Box
            sx={{
              display: "block",
              color: "#191919", // Label color
              fontFamily: "LufgaMedium",
              fontSize: "15px",
            }}
          >
            Fisrt Name:
          </Box>

          {/* Input Component */}
          <TextField
            fullWidth
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
            }}
            value={leadData.firstName || ""}
            InputProps={{
              readOnly: true, // Disable input
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ flex: 1, mr: 1, mb: 2 }}>
            {/* Label for State */}
            <Box
              sx={{
                display: "block",
                color: "#191919", // Label color
                fontFamily: "LufgaMedium",
                fontSize: "15px",
              }}
            >
              Last Name
            </Box>

            {/* Input for State */}
            <TextField
              fullWidth
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
              }}
              value={leadData.lastName}
              InputProps={{
                readOnly: true, // Disable input
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Second Row: Two Inputs Beside Each Other */}
      <Box sx={{ display: "flex", mb: 3 }}>
        <Box sx={{ flex: 1, mr: 1 }}>
          {/* Label Component */}
          <Box
            sx={{
              display: "block",
              color: "#191919", // Label color
              fontFamily: "LufgaMedium",
              fontSize: "15px",
            }}
          >
            Phone Number:
          </Box>

          {/* Input Component */}
          <TextField
                      className={blurClass}

            fullWidth
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
            }}
            value={leadData.phone || ""}
            InputProps={{
              readOnly: true, // Disable input
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ flex: 1, mr: 1, mb: 2 }}>
            {/* Label for State */}
            <Box
              sx={{
                display: "block",
                color: "#191919", // Label color
                fontFamily: "LufgaMedium",
                fontSize: "15px",
              }}
            >
              City
            </Box>

            {/* Input for State */}
            <TextField
              fullWidth
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
              }}
              value={leadData.city}
              InputProps={{
                readOnly: true, // Disable input
              }}
            />
          </Box>
        </Box>

      </Box>
      {/* Second Row: Two Inputs Beside Each Other */}
      <Box sx={{ display: "flex", mb: 3 }}>
        <Box sx={{ flex: 1, mr: 1 }}>
          {/* Label Component */}
          <Box
            sx={{
              display: "block",
              color: "#191919", // Label color
              fontFamily: "LufgaMedium",
              fontSize: "15px",
            }}
          >
           Bath Count:
          </Box>

          {/* Input Component */}
          <TextField
            fullWidth
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
            }}
            value={leadData.bathCount || ""}
            InputProps={{
              readOnly: true, // Disable input
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ flex: 1, mr: 1, mb: 2 }}>
            {/* Label for State */}
            <Box
              sx={{
                display: "block",
                color: "#191919", // Label color
                fontFamily: "LufgaMedium",
                fontSize: "15px",
              }}
            >
              Bed Count:
            </Box>

            {/* Input for State */}
            <TextField
              fullWidth
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
              }}
              value={leadData.bedCount}
              InputProps={{
                readOnly: true, // Disable input
              }}
            />
          </Box>
        </Box>
      </Box>
      {/* Second Row: Two Inputs Beside Each Other */}
      <Box sx={{ display: "flex", mb: 3 }}>
        <Box sx={{ flex: 1, mr: 1 }}>
          {/* Label Component */}
          <Box
            sx={{
              display: "block",
              color: "#191919", // Label color
              fontFamily: "LufgaMedium",
              fontSize: "15px",
            }}
          >
            State:
          </Box>

          {/* Input Component */}
          <TextField
            fullWidth
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
            }}
            value={leadData.state?.name || "N/A"}
            InputProps={{
              readOnly: true, // Disable input
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ flex: 1, mr: 1, mb: 2 }}>
            {/* Label for State */}
            <Box
              sx={{
                display: "block",
                color: "#191919", // Label color
                fontFamily: "LufgaMedium",
                fontSize: "15px",
              }}
            >
              County:
            </Box>

            {/* Input for State */}
            <TextField
              fullWidth
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
              }}
              value={leadData.county?.name || "N/A"}
              InputProps={{
                readOnly: true, // Disable input
              }}
            />
          </Box>
        </Box>
      </Box>
      {/* Second Row: Two Inputs Beside Each Other */}
      <Box sx={{ display: "flex", mb: 3 }}>
        <Box sx={{ flex: 1, mr: 1 }}>
          {/* Label Component */}
          <Box
            sx={{
              display: "block",
              color: "#191919", // Label color
              fontFamily: "LufgaMedium",
              fontSize: "15px",
            }}
          >
            Zillow Estimate:
          </Box>

          {/* Input Component */}
          <TextField
                      className={blurClass}

            fullWidth
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
            }}
            value={leadData.zillowEstimate || ""}
            InputProps={{
              readOnly: true, // Disable input
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ flex: 1, mr: 1, mb: 2 }}>
            {/* Label for State */}
            <Box
              sx={{
                display: "block",
                color: "#191919", // Label color
                fontFamily: "LufgaMedium",
                fontSize: "15px",
              }}
            >
              ZIP Code:
            </Box>

            {/* Input for State */}
            <TextField
                        className={blurClass}

              fullWidth
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
              }}
              value={leadData.zip}
              InputProps={{
                readOnly: true, // Disable input
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Third Row: Seller Address Input */}
      <Box sx={{ display: "flex", mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          {/* Label for Address Line */}
          <Box
            sx={{
              display: "block",
              color: "#191919", // Label color
              fontFamily: "LufgaMedium",
              fontSize: "15px", // Updated font size
            }}
          >
            Address Line:
          </Box>

          {/* Input for Address Line */}
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            sx={{
              height: "63px",
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
              "& input": {
                textAlign: "center",
                color: "rgba(25, 25, 25, 0.7)",
                fontFamily: "LufgaRegular",
              },
            }}
            value={leadData.addressLine || ""}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </Box>

      {/* Third Row: Seller Address Input */}
      <Box sx={{ display: "flex", mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          {/* Label for Address Line */}
          <Box
            sx={{
              
              display: "block",
              color: "#191919", // Label color
              fontFamily: "LufgaMedium",
              fontSize: "15px", // Updated font size
            }}
          >
            Zillow Link:
          </Box>

          {/* Input for Address Line */}
          <TextField
                      className={blurClass}

            fullWidth
            variant="outlined"
            margin="normal"
            sx={{
              height: "63px",
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
              "& input": {
                textAlign: "center",
                color: "rgba(25, 25, 25, 0.7)",
                fontFamily: "LufgaRegular",
              },
            }}
            value={leadData.zillowLink || ""}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </Box>


      {/* Fourth Row: Listing and Occupancy Inputs */}
      <Box sx={{ display: "flex", mb: 3 }}>
        {/* Status Input */}
        <Box sx={{ flex: 1, mr: 1 }}>
          {/* Label for Status */}
          <Box
            sx={{
              display: "block",
              color: "#191919",
              fontFamily: "LufgaMedium",
              fontSize: "15px", // Updated font size
            }}
          >
            Sqft:
          </Box>

          {/* Input for Status */}
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            sx={{
              height: "63px",
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
              "& input": {
                textAlign: "center",
                color: "rgba(25, 25, 25, 0.7)",
                fontFamily: "LufgaRegular",
              },
            }}
            value={leadData.sqft || ""}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>

        {/* Occupancy Input */}
        <Box sx={{ flex: 1 }}>
          {/* Label for Occupancy */}
          <Box
            sx={{
              display: "block",
              color: "#191919",
              fontFamily: "LufgaMedium",
              fontSize: "15px", // Updated font size
            }}
          >
            Occupancy:
          </Box>

          {/* Input for Occupancy */}
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            sx={{
              height: "63px",
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
              "& input": {
                textAlign: "center",
                color: "rgba(25, 25, 25, 0.7)",
                fontFamily: "LufgaRegular",
              },
            }}
            value={leadData.occupancy || ""}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </Box>

      {/* Fifth Row: Lead Temperature and Closing Inputs */}
      <Box sx={{ display: "flex", mb: 3 }}>
        <Box sx={{ flex: 1, mr: 1, mb: 2 }}>
          {/* Label for Lead Temperature */}
          <Box
            sx={{
              display: "block",
              color: "#191919", // Label color
              fontFamily: "LufgaMedium",
              fontSize: "15px",
            }}
          >
            Lead Temperature
          </Box>
          <TextField
            fullWidth
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
            }}
            value={leadData.leadType?.name || ""}
            InputProps={{
              readOnly: true, // Disable input
            }}
          />
        </Box>
        <Box sx={{ flex: 1, mb: 2 }}>
          {/* Label for Closing */}
          <Box
            sx={{
              display: "block",
              color: "#191919", // Label color
              fontFamily: "LufgaMedium",
              fontSize: "15px",
            }}
          >
            Closing
          </Box>
          <TextField
            fullWidth
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
            }}
            value={leadData.closingTime || ""}
            InputProps={{
              readOnly: true, // Disable input
            }}
          />
        </Box>
      </Box>

      {/* Fifth Row: Best Callback Time */}
      <Box sx={{ flex: 1, mr: 1, mb: 2 }}>
        {/* Label for Best Callback Time */}
        <Box
          sx={{
            display: "block",
            color: "#191919", // Label color
            fontFamily: "LufgaMedium",
            fontSize: "15px",
          }}
        >
          Best Callback Time
        </Box>
        <TextField
          fullWidth
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
          }}
          value={leadData.bestTimeForCallback || ""}
          InputProps={{
            readOnly: true, // Disable input
          }}
        />
      </Box>

      <Box sx={{ display: "flex", mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ flex: 1, mb: 2 }}>
            {/* Label for Motivation */}
            <Box
              sx={{
                display: "block",
                color: "#191919", // Label color
                fontFamily: "LufgaMedium",
                fontSize: "15px",
              }}
            >
              Motivation
            </Box>

            {/* Input for Motivation */}
            <TextField
              fullWidth
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
              }}
              value={leadData.motivation || ""}
              InputProps={{
                readOnly: true, // Disable input
              }}
            />
          </Box>

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
