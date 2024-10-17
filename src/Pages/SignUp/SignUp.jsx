import React, { useState } from "react";
import { Box, TextField, Button, Typography, CircularProgress, Dialog } from "@mui/material";
import "./signupPage.css"; // Assuming external CSS for custom styles
import Ellipse from "../../assets/images/Ellipse 1.png";
import TopLeftImage from "../../assets/images/tapIcon.png"; // Import the top-left image
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import axiosInstance from "../../axios";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false); // State for modal visibility
  const navigate = useNavigate(); // Use useNavigate for navigation

  // State for form data, error, and success messages
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    investorCategory: '', // New field for investor category
    preferences: {
      LeadType: [],
      state: [],
      county: [],
      occupancy: [],
      closingTime: '',
      askingPrice: '',
    },
  });

  const [errorMessage, setErrorMessage] = useState(''); // For error message
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('preferences.')) {
      const preferenceName = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        preferences: {
          ...prevData.preferences,
          [preferenceName]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state

    console.log(formData);
    axiosInstance.post('/signup', formData)
      .then((res) => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          password: '',
          investorCategory: '',
          preferences: {
            LeadType: [],
            state: [],
            county: [],
            occupancy: [],
            closingTime: '',
            askingPrice: '',
          },
        });
        setLoading(false); // Hide loading state

        setTimeout(() => {
          navigate("/"); // Redirect to login page using navigate
        }, 2000);
      })
      .catch((err) => {
        setErrorMessage(`Failed to Sign Up: ${err.response.data.message}`);
        setLoading(false); // Hide loading state
      });
  };

  return (
    <Box className="login-container">
      {/* Layered Image */}
      <Box className="layered-image">
        <img src={Ellipse} alt="Layered Top" />
      </Box>

      {/* Top Left Image */}
      <Box className="top-left-image">
        <img src={TopLeftImage} alt="Top Left" />
      </Box>

      {/* Sign Up Form */}
      <Box className="login-box">
        <Typography
          className="Signin"
          variant="h4"
          sx={{ marginBottom: "20px", fontSize: "52px" }}
        >
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <TextField
            fullWidth
            variant="standard"
            label="Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{
              marginBottom: "52px",
              "& .MuiInputBase-root": {
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&.Mui-focused": {
                  backgroundColor: "transparent",
                },
              },
              "& .MuiInput-underline:before": {
                borderBottom: "1px solid #000000",
              },
              "& .MuiInput-underline:after": {
                borderBottom: "1px solid #000000",
              },
            }}
          />
          
          {/* Email Input */}
          <TextField
            fullWidth
            variant="standard"
            label="Email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{
              marginBottom: "52px",
              "& .MuiInputBase-root": {
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&.Mui-focused": {
                  backgroundColor: "transparent",
                },
              },
              "& .MuiInput-underline:before": {
                borderBottom: "1px solid #000000",
              },
              "& .MuiInput-underline:after": {
                borderBottom: "1px solid #000000",
              },
            }}
          />
          
          {/* Phone Input */}
          <TextField
            fullWidth
            variant="standard"
            label="Phone"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            sx={{
              marginBottom: "52px",
              "& .MuiInputBase-root": {
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&.Mui-focused": {
                  backgroundColor: "transparent",
                },
              },
              "& .MuiInput-underline:before": {
                borderBottom: "1px solid #000000",
              },
              "& .MuiInput-underline:after": {
                borderBottom: "1px solid #000000",
              },
            }}
          />

          {/* Investor Category Input */}
          <TextField
            fullWidth
            variant="standard"
            label="Investor Category"
            id="investorCategory"
            name="investorCategory"
            value={formData.investorCategory}
            onChange={handleChange}
            sx={{
              marginBottom: "52px",
              "& .MuiInputBase-root": {
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&.Mui-focused": {
                  backgroundColor: "transparent",
                },
              },
              "& .MuiInput-underline:before": {
                borderBottom: "1px solid #000000",
              },
              "& .MuiInput-underline:after": {
                borderBottom: "1px solid #000000",
              },
            }}
          />
          
          {/* Preferences Inputs */}
          <TextField
            fullWidth
            variant="standard"
            label="Lead Type"
            id="preferences.LeadType"
            name="preferences.LeadType" // Ensure this matches the preferences structure
            value={formData.preferences.LeadType}
            onChange={handleChange}
            sx={{
              marginBottom: "52px",
              "& .MuiInputBase-root": {
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&.Mui-focused": {
                  backgroundColor: "transparent",
                },
              },
              "& .MuiInput-underline:before": {
                borderBottom: "1px solid #000000",
              },
              "& .MuiInput-underline:after": {
                borderBottom: "1px solid #000000",
              },
            }}
          />
          {/* Add similar fields for state, county, occupancy, closingTime, and askingPrice as needed */}

          <span style={{ color: "red" }}> {errorMessage}</span>

          {/* Remember Me */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "42px",
            }}
          >
            <label className="Save">
              <input type="checkbox" style={{ marginRight: "8px" }} />
              Save Login Credentials
            </label>
          </Box>

          {/* Submit Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#000000",
              color: "#FFFFFF",
              borderRadius: "25.76px",
              fontSize: "25px",
              position: "relative",
            }}
            type="submit"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  marginLeft: "-12px",
                  marginTop: "-12px",
                }}
              />
            ) : (
              "SIGN UP"
            )}
          </Button>
        </form>
      </Box>

      {/* Modal for loading and success message */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        {/* Content for modal */}
      </Dialog>
    </Box>
  );
};

export default SignUpPage;
