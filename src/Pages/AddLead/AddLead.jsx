import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Switch,
  Typography, // Ensure Button is imported
} from "@mui/material";
import Layout from "../../component/Layout/Layout";
import SuccessModal from "../../component/SuccessModal/SuccessModal"; // Adjust the import path as needed
import InputField from "../../component/InputField/InputField";
import DropDown from "../../component/DropDown/DropDown";
import axiosInstance from "../../axios";
import {
  leadTemperatureOptions,
  CallingBackTime,
} from "./components/constants";
import FormValidation from "./components/FormValidation";

const AddLead = () => {
  const [activeTab, setActiveTab] = useState(0); // 0 for Leads, 1 for Clients
  const [errorMessage, setErrorMessage] = useState("");
  const [states, setStates] = useState([]);
  const [counties, setCounties] = useState([]);
  const occupancy = ["Occupied by the owner", "Vacant", "Rented"];
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({});
  const initialFormData = {
    askingPrice: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine: "",
    city: "",
    county: "",
    state: "",
    zip: "",
    bedCount: "",
    bathCount: "",
    sqft: "",
    occupancy: "",
    leadType: "",
    closingTime: "",
    bestTimeForCallback: "",
    motivation: "",
    zillowLink: "",
    zillowEstimate: "",
    additionalNotes: "",
    condition: "",
    isBidding: false,
    LeadPrice: "",
    biddingStartingDate: "",
    duration: "",
    biddingIncreasePercentage: "",
    intialBiddingPrice: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  //function to get states
  const getStates = () => {
    axiosInstance
      .get("getAllStates")
      .then((res) => setStates(res.data.states))
      .catch((err) => console.log(err));
  };
  //function to get counties by state ID
  const getCounty = (id) => {
    axiosInstance
      .get(`getCountByStateId/${id}`)
      .then((res) => {
        console.log(res.data);
        setCounties(res.data.county);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStates();
  }, []);

  //function for Occupancy dropDOwn
  const renderOccupancy = (item) => (
    <MenuItem key={item} value={item}>
      {item}
    </MenuItem>
  );
  //function for leadType dropDOwn
  const renderLeadTypes = (type) => (
    <MenuItem key={type.value} value={type.value}>
      {type.label}
    </MenuItem>
  );
  //function for US states dropDOwn
  const renderStates = (item) => (
    <MenuItem key={item._id} value={item._id}>
      {item.name}
    </MenuItem>
  );
  //function for US Counties dropDOwn
  const rendercounteis = (item) => (
    <MenuItem key={item._id} value={item._id}>
      {item.name}
    </MenuItem>
  );
  //function for US Counties dropDOwn
  const renderCallBacktime = (item) => (
    <MenuItem key={item.value} value={item.value}>
      {item.value}
    </MenuItem>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") {
      setFormData({
        ...formData,
        [name]: value,
      });
      getCounty(value);
      setDisabled(false);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    console.log("heyyy1");
    setErrors({});
    setErrorMessage("");
    const newErrors = FormValidation({
      formData,
      isBidding: formData.isBidding,
    });
    setOpen(true); // Open the modal
    if (Object.keys(newErrors).length > 0) {
      console.log("heyyy3");
      console.log(newErrors);
      setErrors(newErrors); // Set the errors if validation fails
      handleClose();
    } else {
      console.log("heyyy2");
      axiosInstance
        .post("createLead", formData)
        .then((res) => {
          console.log(res.data);
          setFormData(initialFormData);
        })
        .catch((err) => {
          setErrorMessage(err.response.data.message);
          handleClose();
        });
    }
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  // Function to handle tab change
  const handleSwitchChange = (event) => {
    if (event.target.checked) {
      setFormData({ ...formData, isBidding: true });
    } else {
      setFormData({ ...formData, isBidding: false });
    }

    setActiveTab(event.target.checked ? 1 : 0); // Switch to Clients if checked, Leads if unchecked
  };

  return (
    <Layout>
      <Box
        component="form"
        sx={{
          p: 3,
          backgroundColor: "#F1F1F1",
          color: "#e0e0e0",
          marginTop: "65px",
        }}
      >
        {/* New row for Asking Price input */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"askingPrice"}
              state={formData.askingPrice}
              handleChange={handleChange}
              label={"Asking Price"}
              placeHolder={"Asking Price"}
              type={"number"}
            />
            {errors.askingPrice && (
              <span style={{ color: "red" }}>{errors.askingPrice}</span>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "25px",
            marginTop: "25px",

            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"firstName"}
              state={formData.firstName}
              handleChange={handleChange}
              label={"First Name"}
              placeHolder={"Seller First Name"}
            />
            {errors.firstName && (
              <span style={{ color: "red" }}>{errors.firstName}</span>
            )}
          </Box>
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"lastName"}
              state={formData.lastName}
              handleChange={handleChange}
              label={"Last Name"}
              placeHolder={"Seller Last Name"}
            />
            {errors.lastName && (
              <span style={{ color: "red" }}>{errors.lastName}</span>
            )}
          </Box>
        </Box>
        {/* New row for email input */}
        <Box sx={{ marginTop: "25px", position: "relative" }}>
          <InputField
            fieldName={"email"}
            state={formData.email}
            handleChange={handleChange}
            label={" Email"}
            placeHolder={"Seller Email Address"}
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        </Box>
        {/* New row for Phone Number and State input */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"phone"}
              state={formData.phone}
              handleChange={handleChange}
              label={" Phone"}
              placeHolder={"Seller Phone Number"}
              type={"number"}
            />
            {errors.phone && (
              <span style={{ color: "red" }}>{errors.phone}</span>
            )}
          </Box>

          <Box sx={{ flex: 1, position: "relative" }}>
            <DropDown
              fieldName={"leadType"}
              handleChange={handleChange}
              state={formData.leadType}
              list={leadTemperatureOptions}
              render={renderLeadTypes}
              label={"lead Type"}
              placeHolder={"lead Type"}
            />
            {errors.leadType && (
              <span style={{ color: "red" }}>{errors.leadType}</span>
            )}
          </Box>
        </Box>
        {/* Seller Address input */}
        <Box sx={{ marginTop: "25px", position: "relative" }}>
          <InputField
            fieldName={"addressLine"}
            state={formData.addressLine}
            handleChange={handleChange}
            label={" Address"}
            placeHolder={"Seller 1st Address Line"}
          />
          {errors.addressLine && (
            <span style={{ color: "red" }}>{errors.addressLine}</span>
          )}
        </Box>
        {/* New row for Listing and Occupancy inputs under Seller Address */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"city"}
              state={formData.city}
              handleChange={handleChange}
              label={" City"}
              placeHolder={"Seller City"}
            />
            {errors.city && <span style={{ color: "red" }}>{errors.city}</span>}
          </Box>

          <Box sx={{ flex: 1, position: "relative" }}>
            <DropDown
              fieldName={"state"}
              handleChange={handleChange}
              state={formData.state}
              list={states}
              render={renderStates}
              label={"state"}
              placeHolder={"state"}
            />
            {errors.state && (
              <span style={{ color: "red" }}>{errors.state}</span>
            )}
          </Box>
        </Box>
        {/* New row for Lead Temperature and Closing inputs */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"zip"}
              state={formData.zip}
              handleChange={handleChange}
              label={" zip"}
              placeHolder={"Seller Zip Code"}
              type={"number"}
            />
            {errors.zip && <span style={{ color: "red" }}>{errors.zip}</span>}
          </Box>

          <Box sx={{ flex: 1, position: "relative" }}>
            <DropDown
              fieldName={"county"}
              handleChange={handleChange}
              state={formData.county}
              list={counties}
              render={rendercounteis}
              disabled={disabled}
              label={"county"}
              placeHolder={"county"}
            />
            {errors.county && (
              <span style={{ color: "red" }}>{errors.county}</span>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"condition"}
              state={formData.condition}
              handleChange={handleChange}
              label={"Condition"}
              placeHolder={"Property condation"}
              required={true}
            />
            {errors.condition && (
              <span style={{ color: "red" }}>{errors.condition}</span>
            )}
          </Box>
        </Box>
        {/* New row for Zillow Estimate and Best Callback Time inputs */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"bedCount"}
              state={formData.bedCount}
              handleChange={handleChange}
              label={" Bedrooms"}
              placeHolder={"Bedrooms"}
              type={"number"}
            />
            {errors.bedCount && (
              <span style={{ color: "red" }}>{errors.bedCount}</span>
            )}
          </Box>

          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"bathCount"}
              state={formData.bathCount}
              handleChange={handleChange}
              label={" Bathrooms"}
              placeHolder={"Bathrooms"}
              type={"number"}
            />
            {errors.bathCount && (
              <span style={{ color: "red" }}>{errors.bathCount}</span>
            )}
          </Box>
        </Box>
        {/* New row for Zillow Estimate and Best Callback Time inputs */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"sqft"}
              state={formData.sqft}
              handleChange={handleChange}
              label={" sqft"}
              placeHolder={"sqft"}
              type={"number"}
            />
            {errors.sqft && <span style={{ color: "red" }}>{errors.sqft}</span>}
          </Box>

          <Box sx={{ flex: 1, position: "relative" }}>
            <DropDown
              fieldName={"occupancy"}
              handleChange={handleChange}
              state={formData.occupancy}
              list={occupancy}
              render={renderOccupancy}
              label={"occupancy"}
              placeHolder={"occupancy"}
            />
            {errors.occupancy && (
              <span style={{ color: "red" }}>{errors.occupancy}</span>
            )}
          </Box>
        </Box>
        {/* Existing code for Zillow Estimate and Best Callback Time inputs */}
        {/* New row for Reason for Selling input */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"motivation"}
              state={formData.motivation}
              handleChange={handleChange}
              label={"Motivation"}
              placeHolder={"Motivation for selling"}
            />
            {errors.motivation && (
              <span style={{ color: "red" }}>{errors.occupancy}</span>
            )}
          </Box>
        </Box>
        {/* New row for Zillow URL and Call URL inputs */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"closingTime"}
              state={formData.closingTime}
              handleChange={handleChange}
              type={"number"}
              label={"Closing Time"}
              placeHolder={"Enter closing time in days "}
            />
            {errors.closingTime && (
              <span style={{ color: "red" }}>{errors.closingTime}</span>
            )}
          </Box>

          <Box sx={{ flex: 1, position: "relative" }}>
            <DropDown
              fieldName={"bestTimeForCallback"}
              handleChange={handleChange}
              state={formData.bestTimeForCallback}
              list={CallingBackTime}
              render={renderCallBacktime}
              label={"Call Back Time"}
              placeHolder={"Call Back Time"}
            />
            {errors.bestTimeForCallback && (
              <span style={{ color: "red" }}>{errors.bestTimeForCallback}</span>
            )}
          </Box>
        </Box>
        {/* New row for Zillow URL and Call URL inputs */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"zillowLink"}
              state={formData.zillowLink}
              handleChange={handleChange}
              label={"zillow Link"}
              placeHolder={"zillow Link"}
            />
            {errors.zillowLink && (
              <span style={{ color: "red" }}>{errors.zillowLink}</span>
            )}
          </Box>

          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"zillowEstimate"}
              state={formData.zillowEstimate}
              handleChange={handleChange}
              label={"zillow Estimate"}
              placeHolder={"zillow Estimate"}
              type={"number"}
            />
            {errors.zillowEstimate && (
              <span style={{ color: "red" }}>{errors.zillowEstimate}</span>
            )}
          </Box>
        </Box>
        {/* New row for Zillow URL and Call URL inputs */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"additionalNotes"}
              state={formData.additionalNotes}
              handleChange={handleChange}
              label={"Additional Notes"}
              placeHolder={"Additional Notes"}
            />
            {errors.additionalNotes && (
              <span style={{ color: "red" }}>{errors.additionalNotes}</span>
            )}
          </Box>
        </Box>
        {/* New row for Zillow URL and Call URL inputs */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box
            sx={{
              flex: 1,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
              bgcolor: "white",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: activeTab === 1 ? "#0177FB" : "#191919", mr: 2 }} // Change the color here
            >
              Enable bidding on the lead
            </Typography>
            <Switch
              checked={activeTab === 1}
              onChange={handleSwitchChange}
              inputProps={{ "aria-label": "Switch between Leads and Clients" }}
            />
          </Box>

          {activeTab === 0 ? (
            <Box sx={{ flex: 1, position: "relative" }}>
              <InputField
                fieldName={"LeadPrice"}
                state={formData.LeadPrice}
                handleChange={handleChange}
                label={"Lead Price"}
                placeHolder={"Lead Price"}
                type={"number"}
              />
              {errors.LeadPrice && (
                <span style={{ color: "red" }}>{errors.LeadPrice}</span>
              )}
            </Box>
          ) : (
            <>
              <Box sx={{ flex: 1, position: "relative" }}>
                <InputField
                  fieldName={"intialBiddingPrice"}
                  state={formData.intialBiddingPrice}
                  handleChange={handleChange}
                  label={"Starting Bid Price"}
                  placeHolder={"Starting Bid Price"}
                  type={"number"}
                />
                {errors.intialBiddingPrice && (
                  <span style={{ color: "red" }}>
                    {errors.intialBiddingPrice}
                  </span>
                )}
              </Box>
            </>
          )}
        </Box>
        {activeTab === 1 && (
          <Box
            sx={{
              display: "flex",
              gap: "25px",
              flexDirection: { xs: "column", sm: "row" },
              marginTop: "25px",
            }}
          >
            <Box sx={{ flex: 1, position: "relative" }}>
              <InputField
                fieldName={"biddingStartingDate"}
                state={formData.biddingStartingDate}
                handleChange={handleChange}
                label={"Bid Opening Date"}
                placeHolder={"Bid Opening Date"}
                type={"datetime-local"}
              />
              {errors.biddingStartingDate && (
                <span style={{ color: "red" }}>
                  {errors.biddingStartingDate}
                </span>
              )}
            </Box>
          </Box>
        )}
        {activeTab === 1 && (
          <Box
            sx={{
              display: "flex",
              gap: "25px",
              flexDirection: { xs: "column", sm: "row" },
              marginTop: "25px",
            }}
          >
            <Box sx={{ flex: 1, position: "relative" }}>
              <InputField
                fieldName={"duration"}
                state={formData.duration}
                handleChange={handleChange}
                label={"Duration"}
                placeHolder={"Enter duration in minutes"}
                type={"number"}
              />
              {errors.duration && (
                <span style={{ color: "red" }}>{errors.duration}</span>
              )}
            </Box>

            <Box sx={{ flex: 1, position: "relative" }}>
              <InputField
                fieldName={"biddingIncreasePercentage"}
                state={formData.biddingIncreasePercentage}
                handleChange={handleChange}
                label={"Minimum Increase Rate"}
                placeHolder={"Minimum Increase Rate (%)"}
                type={"number"}
              />
              {errors.biddingIncreasePercentage && (
                <span style={{ color: "red" }}>
                  {errors.biddingIncreasePercentage}
                </span>
              )}
            </Box>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "25px",
            width: "100%", // Full width
            color: "red",
          }}
        >
          {errorMessage}
          <SuccessModal open={open} handleClose={handleClose} />
        </Box>
        {/* Last row for Add Lead button */}
        <Box
          sx={{
            marginTop: "25px",
            width: "100%", // Full width
          }}
        >
          <Button
            className="AddLeadBtn"
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "#191919",
              color: "#FFFFFF",
              fontSize: "30px",
              borderRadius: "20px",
              padding: "5px 15px",
              "&:hover": {
                backgroundColor: "#333333",
              },
            }}
            onClick={handleClick}
          >
            Add Lead
          </Button>
          <SuccessModal open={open} handleClose={handleClose} />
        </Box>
      </Box>
    </Layout>
  );
};

export default AddLead;

// onSubmit={handleSubmit}
