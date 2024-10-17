import React from "react";

const FormValidation = ({ formData, isBidding }) => {
  const errors = {};

  // Validation logic
  if (!formData.firstName) {
    errors.firstName = "First Name is required.";
  }
  if (!formData.lastName) {
    errors.lastName = "Last Name is required.";
  }
  if (!formData.askingPrice) {
    errors.askingPrice = "Asking Price is required.";
  }
  if (!formData.email) {
    errors.email = "Email is required.";
  }
  if (!formData.phone) {
    errors.phone = "Phone is required.";
  }
  if (!formData.addressLine) {
    errors.addressLine = "Address Line is required.";
  }
  if (!formData.city) {
    errors.city = "City is required.";
  }
  if (!formData.state) {
    errors.state = "State is required.";
  }
  if (!formData.zip) {
    errors.zip = "Zip is required.";
  }
  if (!formData.county) {
    errors.county = "County is required.";
  }
  if (!formData.bedCount) {
    errors.bedCount = "BedCount is required.";
  }
  if (!formData.bathCount) {
    errors.bathCount = "BathCount is required.";
  }
  if (!formData.sqft) {
    errors.sqft = "sqft is required.";
  }
  if (!formData.occupancy) {
    errors.occupancy = "occupancy is required.";
  }
  if (!formData.leadType) {
    errors.leadType = "leadType is required.";
  }
  if (!formData.closingTime) {
    errors.closingTime = "Closing Time is required.";
  }
  if (!formData.bestTimeForCallback) {
    errors.bestTimeForCallback = "Best Time For Callback is required.";
  }
  if (!formData.motivation) {
    errors.motivation = "motivation is required.";
  }
  if (!formData.zillowLink) {
    errors.zillowLink = "zillowLink is required.";
  }
  if (!formData.zillowEstimate) {
    errors.zillowEstimate = "Zillow Estimate is required.";
  }
  if (!formData.additionalNotes) {
    errors.additionalNotes = "Additional Notes is required.";
  }
  if (!formData.condition) {
    errors.condition = "Condition is required.";
  }

  if (isBidding === true) {
    if (!formData.biddingStartingDate) {
      errors.biddingStartingDate = "Bidding Starting Date is required.";
    }
    if (!formData.duration) {
      errors.duration = "Duration is required.";
    }
    if (!formData.biddingIncreasePercentage) {
      errors.biddingIncreasePercentage =
        "Bidding Increase Percentage is required.";
    }
    if (!formData.intialBiddingPrice) {
      errors.intialBiddingPrice = "Intial Bidding Price is required.";
    }
  } else {
    if (!formData.LeadPrice) {
      errors.LeadPrice = "Lead Price is required.";
    }
  }

  return errors; // Return errors object
};

export default FormValidation;
