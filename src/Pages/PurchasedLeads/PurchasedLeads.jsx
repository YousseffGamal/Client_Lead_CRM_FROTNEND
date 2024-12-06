import React, { useState, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import Layout from "../../component/Layout/Layout";
import LeadCard from "../../component/LeadCard/LeadCard";
import PiddingCard from "../../component/PiddingCard/PiddingCard";
import SwitchComponent from "../../component/SwitchComponent/SwitchComponent";
import FilterComponent from "../../component/FilterComponent/FilterComponent";

import { useAuth } from "../../store/authContext";
import axiosInstance from "../../axios";

// Styles for the layout
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const PurchasedLeads = () => {
  const [activeTab, setActiveTab] = useState(0); // State to track which card to display
  const [pricedLeads, setPricedLeads] = useState([]); // State for leads
  const [biddingLeads, setBiddingLeads] = useState([]); // State for bidding leads
  const { auth } = useAuth();

  const fetchLeads = async () => {
    try {
      const endpoint =
        activeTab === 0
          ? `/userPurchasedLeads/${auth.user._id}` // API for purchased leads
          : `/winnerleads/${auth.user._id}`; // API for bidding leads
      const response = await axiosInstance.get(endpoint);
      if (activeTab === 0) {
        console.log("hola1", response.data.data);
        setPricedLeads(response.data.data);
      } else {
        console.log("hola2", response.data.data);
        setBiddingLeads(response.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [activeTab]);

  const switchView = (event) => {
    setActiveTab(event.target.checked ? 1 : 0);
  };

  return (
    <Layout>
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
          <SwitchComponent activeTab={activeTab} switchView={switchView} />
          {/* <FilterComponent
            setPricedLeads={setPricedLeads}
            sx={{ ml: 1 }}
            marketPlaceLeads={false}
          /> */}
        </Box>

        {/* Cards Display */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {activeTab === 0 ? (
            pricedLeads.map((lead, index) => (
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
                  leadId={lead._id}
                  address={lead.addressLine}
                  city={lead.county.name}
                  condition={lead.condition}
                  status={lead.status}
                  askingPrice={lead.askingPrice}
                  leadType={lead.leadType?.name}
                  closingTime={lead.closingTime}
                  occupancy={lead.occupancy}
                  viewPath="/purchasedleadview" // Specify the path
                />
              </Box>
            ))
          ) : biddingLeads.length > 0 ? (
            biddingLeads.map((lead, index) => (
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
                  lead={lead}
                  leadId={lead._id}
                  address={lead.addressLine}
                  city={lead.county.name}
                  condition={lead.condition}
                  askingPrice={lead.askingPrice}
                  BidDurationDelay={lead.BidDurationDelay}
                  leadType={lead.leadType?.name}
                  closingTime={lead.closingTime}
                  occupancy={lead.occupancy}
                  status={lead.status}
                  viewPath={
                    activeTab === 0 ? "/purchasedleadview" : "/leadview"
                  } // Specify the path purchasedleadview
                />
              </Box>
            ))
          ) : (
            <div>No leads</div>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default PurchasedLeads;
