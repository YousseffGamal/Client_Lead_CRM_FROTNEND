import React, { useState } from "react";
import { Box, TextField, Button, Typography, colors } from "@mui/material";
import "./LoginPage.css"; // Assuming external CSS for custom styles
import Ellipse from "../../assets/images/Ellipse 1.png";
import TopLeftImage from "../../assets/images/tapIcon.png"; // Import the top-left image
import { useAuth } from "../../store/authContext";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // State for form data, error, and success messages
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // For error message

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(formData); // Assuming login() returns a promise
    if (response.success) {
      if (response.data.user.userExist.role === "Admin") {
        navigate("/dashboard");
      } else if (response.data.user.userExist.role === "Marketer") {
        navigate("/blogsarticles");
      }
    } else {
      setErrorMessage(response.message); // Display error message
    }
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
      {/* Login Form */}
      <Box className="login-box">
        <Typography
          className="Signin"
          variant="h4"
          sx={{ marginBottom: "20px", fontSize: "52px" }}
        >
          Sign in
        </Typography>
        <form onSubmit={handleSubmit}>
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

          {/* Password Input */}

          <TextField
            fullWidth
            variant="standard"
            label="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            sx={{
              marginBottom: "42px",
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
          <span style={{ color: "red" }}> {errorMessage}</span>
          {/* Remember Me and Forget Password */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "42px",
            }}
          >
            <label className="Save">
              <input type="checkbox" style={{ marginRight: "8px" }} />
              Save Login Credentials{" "}
            </label>
            <Typography
              className="Forget"
              variant="body2"
              sx={{ color: "#000000", cursor: "pointer" }}
            >
              Forget Password?
            </Typography>
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#000000",
              color: "#FFFFFF",
              borderRadius: "25.76px",
              fontSize: "25px",
            }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
