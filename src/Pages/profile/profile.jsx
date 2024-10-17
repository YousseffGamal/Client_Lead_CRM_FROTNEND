import React, { useState } from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material"; // Import Edit icon
import Layout from "../../component/Layout/Layout";
import ProfileImg from "../../assets/images/Group 53.png";
import { useAuth } from "../../store/authContext"; // Import the auth context

const Profile = () => {
  const { auth } = useAuth(); // Access user data from auth context
  const [selectedImage, setSelectedImage] = useState(ProfileImg); // State to store selected image

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a preview of the image
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleEditClick = () => {
    // Trigger the file input click when edit button is clicked
    document.getElementById("fileInput").click();
  };

  return (
    <Layout headerText="Profile Page" pageType="profile">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          backgroundColor: "#F1F1F1",
          marginTop: "109px",
          position: "relative",
        }}
      >
        {/* Profile Image */}
        <Box sx={{ position: "relative" }}>
          <Avatar
            alt="Profile Image"
            src={selectedImage} // Display selected image
            sx={{ width: 242.02, height: 242.02, marginBottom: 2 }}
          />
          {/* Edit Icon */}
          <IconButton
  onClick={handleEditClick}
  sx={{
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#000000", // Set background to #000000
    "&:hover": {
      backgroundColor: "#333333", // Optional hover effect, slightly lighter
    },
  }}
>
  <Edit sx={{ color: "#F1F1F1" }} /> {/* Set icon color to #F1F1F1 */}
</IconButton>


          {/* Hidden File Input */}
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }} // Hide the input
            accept="image/*"
            onChange={handleImageChange}
          />
        </Box>

        {/* Name */}
        <Typography className="ProfileName" variant="h5" sx={{ color: "#191919", marginBottom: 1 }}>
          {auth.user.name} {/* Dynamic Name */}
        </Typography>

        {/* Email */}
        <Typography className="ProfileInfo" variant="body1" sx={{ color: "#757575", marginBottom: 1 }}>
          {auth.user.email} {/* Dynamic Email */}
        </Typography>

        {/* Phone */}
        <Typography className="ProfileInfo" variant="body1" sx={{ color: "#757575" }}>
          Phone: {auth.user.phone || "+123 123 1233"} {/* Dynamic Phone with fallback */}
        </Typography>
      </Box>
    </Layout>
  );
};

export default Profile;
