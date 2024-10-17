import React, { useState, useEffect } from "react"; // Import useState for managing state
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  TablePagination,
  Switch, // Import Switch component
  Select, // Import Select component
  MenuItem as MuiMenuItem, // Import MenuItem for Select
  FormControl, // Import FormControl for Select
  InputLabel, // Import InputLabel for Select
  Modal,
  Stack,
  TextField,
  TableFooter,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Layout from "../../component/Layout/Layout";
import axiosInstance from "../../axios";
import { BorderClear } from "@mui/icons-material";
import DeleteConfirmationModal from "../../component/DeleteConfirmationModal/DeleteConfirmationModal";
import moment from "moment/moment";
import Boxs from "../../component/boxs/boxs"
import Tables from "../../component/Tables/Tables"
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Increased width
  maxHeight: "80vh", // Maximum height to fit the screen
  overflowY: "auto", // Enable vertical scrolling
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2, // Optional: add rounded corners
};

const Dashboard = () => {
  return (
    <Layout>

      <Box
        sx={{
          p: 3,
          backgroundColor: "#F1F1F1",
          color: "#e0e0e0",
          marginTop: "65px",
        }}
      >
        <Boxs />
        <Tables />
      </Box>
    </Layout>
  );
};

export default Dashboard;
