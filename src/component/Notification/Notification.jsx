// Notification.js
import React from "react";
import { Snackbar, SnackbarContent } from "@mui/material";

const NotificationPopup = ({ open, message, onClose }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={6000} // Duration before the notification disappears
      onClose={onClose}
    >
      <SnackbarContent
        message={message}
        sx={{
          backgroundColor: "#0177FB", // Customize the background color
          color: "#FFFFFF",
          borderRadius: "10px",
          padding: "16px",
        }}
      />
    </Snackbar>
  );
};

export default NotificationPopup;
