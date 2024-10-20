import React, { useState, useEffect } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import ChipDropdown from "../../component/chipDropdown/chipDropdown"; // Import your new ChipDropdown component
import TextInput from "../../component/TextInput/TextInput"; // Import the TextInput component
import SelectInput from "../../component/SelectInput/SelectInput"; // Import the SelectInput component
import "./signupPage.css"; // Assuming external CSS for custom styles
import Ellipse from "../../assets/images/Ellipse 1.png";
import TopLeftImage from "../../assets/images/tapIcon.png"; // Import the top-left image
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import axiosInstance from "../../axios";
import {
  leadTemperatureOptions,
  occupancyOptions,
  InvestorOptions,
} from "../../component/constance/constance";

// Sample options for the dropdowns
const leadTypes = [
  { label: "Cash Buyer", value: "cash_buyer" },
  { label: "Owner Occupant", value: "owner_occupant" },
  { label: "Investor", value: "investor" },
];

const stateOptions = [
  { label: "California", value: "CA" },
  { label: "Texas", value: "TX" },
  { label: "New York", value: "NY" },
];

const countyOptions = {
  CA: [
    { label: "Los Angeles", value: "los_angeles" },
    { label: "San Diego", value: "san_diego" },
  ],
  TX: [
    { label: "Harris", value: "harris" },
    { label: "Dallas", value: "dallas" },
  ],
  NY: [
    { label: "Kings", value: "kings" },
    { label: "Queens", value: "queens" },
  ],
};

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    investorCategory: "",
    preferences: {
      LeadType: [],
      state: "", // Change to string
      county: "", // Change to string
      occupancy: "", // Change to string
      closingTime: "",
      askingPrice: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [states, setStates] = useState([]);
  const [counties, setCounties] = useState([]);
  
  useEffect(() => {
    getStates();
    getCounty(); // Fetch counties on component mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("preferences.")) {
      const preferenceName = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        preferences: {
          ...prevData.preferences,
          [preferenceName]: value, // Set the value directly as a string
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleChipDropDownChange = (items, type) => {
    const newValue = items.map(item => item.value); // Get an array of selected values
    setFormData((prevData) => ({
      ...prevData,
      preferences: {
        ...prevData.preferences,
        [type]: newValue, // Update the preference type with an array of values
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(formData);
    axiosInstance.post('/signup', formData)
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
            state: '', // Reset state to string
            county: '', // Reset county to string
            occupancy: '', // Reset occupancy to string
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

  const getStates = async () => {
    try {
      const res = await axiosInstance.get("/getAllStates");
      setStates(res.data.states);
    } catch (err) {
      console.error(err);
    }
  };

  const getCounty = () => {
    axiosInstance
      .get(`/getAllCounty`)
      .then((res) => {
        console.log(res.data);
        setCounties(res.data.counties);
      })
      .catch((err) => console.log(err));
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
          
          <TextInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <SelectInput
            label="Investor Category"
            name="investorCategory"
            value={formData.investorCategory}
            onChange={handleChange}
            options={InvestorOptions}
          />

          <ChipDropdown
            options={leadTemperatureOptions.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
            value={formData.preferences.LeadType}
            onChange={(newValue) =>
              handleChipDropDownChange(newValue, "LeadType")
            }
            label="Lead Type"
            placeholder="Select Lead Type"
          />

          <ChipDropdown
            options={states.map((state) => ({
              label: state.name,
              value: state._id,
            }))}
            value={[formData.preferences.state]} // Ensure it's an array for the ChipDropdown
            onChange={(newValue) =>
              handleChange({
                target: { name: "preferences.state", value: newValue[0]?.value || "" }, // Set value as string
              })
            }
            label="State"
            placeholder="Select State"
          />

          <ChipDropdown
            options={counties.map((county) => ({
              label: county.name,
              value: county._id,
            }))}
            value={[formData.preferences.county]} // Ensure it's an array for the ChipDropdown
            onChange={(newValue) =>
              handleChange({
                target: { name: "preferences.county", value: newValue[0]?.value || "" }, // Set value as string
              })
            }
            label="County"
            placeholder="Select County"
          />

          <ChipDropdown
            options={occupancyOptions}
            value={[formData.preferences.occupancy]} // Ensure it's an array for the ChipDropdown
            onChange={(newValue) =>
              handleChange({
                target: { name: "preferences.occupancy", value: newValue[0]?.value || "" }, // Set value as string
              })
            }
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

          {errorMessage && (
            <Typography color="error">{errorMessage}</Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              marginTop: "20px",
              backgroundColor: "#3D99D9",
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SignUpPage;
