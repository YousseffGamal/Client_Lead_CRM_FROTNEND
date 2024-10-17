import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import ChipDropdown from '../../component/chipDropdown/chipDropdown'; // Import your new ChipDropdown component
import TextInput from '../../component/TextInput/TextInput'; // Import the TextInput component
import SelectInput from '../../component/SelectInput/SelectInput'; // Import the SelectInput component
import "./signupPage.css"; // Assuming external CSS for custom styles
import Ellipse from "../../assets/images/Ellipse 1.png";
import TopLeftImage from "../../assets/images/tapIcon.png"; // Import the top-left image
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import axiosInstance from "../../axios";

// Sample options for the dropdowns
const leadTypes = [
  { label: 'Cash Buyer', value: 'cash_buyer' },
  { label: 'Owner Occupant', value: 'owner_occupant' },
  { label: 'Investor', value: 'investor' },
];

const occupancyOptions = [
  { label: 'Vacant', value: 'vacant' },
  { label: 'Occupied', value: 'occupied' },
];

const stateOptions = [
  { label: 'California', value: 'CA' },
  { label: 'Texas', value: 'TX' },
  { label: 'New York', value: 'NY' },
];

const countyOptions = {
  CA: [
    { label: 'Los Angeles', value: 'los_angeles' },
    { label: 'San Diego', value: 'san_diego' },
  ],
  TX: [
    { label: 'Harris', value: 'harris' },
    { label: 'Dallas', value: 'dallas' },
  ],
  NY: [
    { label: 'Kings', value: 'kings' },
    { label: 'Queens', value: 'queens' },
  ],
};

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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

  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(formData);
    axiosInstance.post('/signupAdmin', formData)
      .then((res) => {
        setFormData({
          firstName: '',
          lastName: '',
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
        setLoading(false);

        setTimeout(() => {
          navigate("/"); // Redirect to login page using navigate
        }, 2000);
      })
      .catch((err) => {
        setErrorMessage(`Failed to Sign Up: ${err.response.data.message}`);
        setLoading(false);
      });
  };

  return (
    <Box className="login-container">
      <Box className="layered-image">
        <img src={Ellipse} alt="Layered Top" />
      </Box>

      <Box className="top-left-image">
        <img src={TopLeftImage} alt="Top Left" />
      </Box>

      <Box className="login-box">
        <Typography
          className="Signin"
          variant="h4"
          sx={{ marginBottom: "20px", fontSize: "52px" }}
        >
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          
          <TextInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          
          <TextInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          
          <TextInput
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <SelectInput
            label="Investor Category"
            name="investorCategory"
            value={formData.investorCategory}
            onChange={handleChange}
            options={[
              { label: "Investor", value: "Investor" },
              { label: "Cash Buyer", value: "Cash Buyer" },
              { label: "Owner Occupant", value: "Owner Occupant" },
            ]}
          />

          <ChipDropdown
            options={leadTypes}
            value={formData.preferences.LeadType}
            onChange={(newValue) => handleChange({ target: { name: 'preferences.LeadType', value: newValue } })}
            label="Lead Type"
            placeholder="Select Lead Type"
          />

          <ChipDropdown
            options={stateOptions}
            value={formData.preferences.state}
            onChange={(newValue) => handleChange({ target: { name: 'preferences.state', value: newValue } })}
            label="State"
            placeholder="Select State"
          />

          <ChipDropdown
            options={countyOptions[formData.preferences.state[0]?.value] || []}
            value={formData.preferences.county}
            onChange={(newValue) => handleChange({ target: { name: 'preferences.county', value: newValue } })}
            label="County"
            placeholder="Select County"
            disabled={!formData.preferences.state.length} // Disable if no state is selected
          />

          <ChipDropdown
            options={occupancyOptions}
            value={formData.preferences.occupancy}
            onChange={(newValue) => handleChange({ target: { name: 'preferences.occupancy', value: newValue } })}
            label="Occupancy"
            placeholder="Select Occupancy"
          />

          <TextInput
            label="Closing Time"
            name="preferences.closingTime"
            value={formData.preferences.closingTime}
            onChange={handleChange}
          />

          <TextInput
            label="Asking Price"
            name="preferences.askingPrice"
            value={formData.preferences.askingPrice}
            onChange={handleChange}
          />

          {errorMessage && <Typography color="error">{errorMessage}</Typography>}

          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              marginTop: "20px",
              height: "56px",
              backgroundColor: "#353535",
              "&:hover": {
                backgroundColor: "#191919",
              },
            }}
          >
            {loading ? <CircularProgress color="inherit" size={24} /> : "Sign Up"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SignUpPage;
