import React, { useState, useEffect, useMemo } from "react";
import { Box, Modal } from "@mui/material";
import Layout from "../../component/Layout/Layout";
import LeadCard from "../../component/LeadCard/LeadCard";
import FilterComponent from "../../component/FilterComponent/FilterComponent"; // Adjust the path if necessary
import axiosInstance from "../../axios";
import { useAuth } from "../../store/authContext";

const Dashboard = () => {
  const [pricedLeads, setpricedLeads] = useState([]); // State for filtered leads

  const { auth } = useAuth();
  const fetchLeads = async () => {
    try {
      console.log("auth", auth.user._id);
      const response = await axiosInstance.get(
        `/userPurchasedLeads/${auth.user._id}`
      );
      console.log(response);
      setpricedLeads(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch leads from API
  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <Layout headerText="Purchased Leads" pageType="purchasedLeads">
      <Box sx={{ p: 3, backgroundColor: "#F1F1F1", marginTop: "65px" }}>
        {/* Filter and Switch Components */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            mb: 2,
            gap: 2,
            flexWrap: "wrap",
            "@media (max-width: 600px)": {
              flexDirection: "column",
              alignItems: "flex-start",
            },
          }}
        >
          <FilterComponent setpricedLeads={setpricedLeads} sx={{ ml: 1 }} />{" "}
          {/* Add left margin if needed */}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {pricedLeads.map((lead, index) => (
            <Box
              key={index}
              sx={{
                width: {
                  xs: "100%", // Full width on small screens
                  sm: "50%", // Two cards per row on small screens
                  md: "33.33%", // Three cards per row on medium screens
                  lg: "33.33%", // Three cards per row on large screens
                },
                padding: 1,
                boxSizing: "border-box",
              }}
            >
              <LeadCard
                leadId={lead._id} // Ensure this is passed
                address={lead.addressLine}
                city={lead.county.name}
                condition={lead.condition}
                askingPrice={lead.askingPrice}
                leadType={lead.leadType?.name}
                closingTime={lead.closingTime}
                occupancy={lead.occupancy}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default Dashboard;
