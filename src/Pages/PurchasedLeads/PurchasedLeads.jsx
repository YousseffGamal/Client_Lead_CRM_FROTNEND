import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Layout from "../../component/Layout/Layout";
import LeadCard from "../../component/LeadCard/LeadCard";
import PiddingCard from "../../component/PiddingCard/PiddingCard";
import SwitchComponent from "../../component/SwitchComponent/SwitchComponent";
import FilterComponent from "../../component/FilterComponent/FilterComponent";

import { useAuth } from "../../store/authContext";
import axiosInstance from "../../axios";

const PurchasedLeads = () => {
  const [activeTab, setActiveTab] = useState(0); 
  const [pricedLeads, setPricedLeads] = useState([]); 
  const [biddingLeads, setBiddingLeads] = useState([]); 
  const { auth } = useAuth(); 

  
  const fetchLeads = async () => {
    try {
      const endpoint =
        activeTab === 0
          ? `/userPurchasedLeads/${auth.user._id}` // API for purchased leads
          : `/winnerleads/${auth.user._id}`; // API for bidding leads
  
      console.log("Request URL:", endpoint); // Debug log the request URL
  
      const response = await axiosInstance.get(endpoint);
      console.log("API Response:", response);
  
      if (activeTab === 0) {
        setPricedLeads(response.data.data);
      } else {
        setBiddingLeads(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching leads:", err); // Log any error that occurs during the fetch
    }
  };
  
  
  // Fetch data when the active tab changes
  useEffect(() => {
    fetchLeads();
  }, [activeTab]);

  // Handle tab switch
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
          <FilterComponent setPricedLeads={setPricedLeads} sx={{ ml: 1 }} />
        </Box>

        {/* Cards Display */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Render purchased leads */}
          {activeTab === 0 &&
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
                  city={lead.county?.name || "N/A"} 
                  condition={lead.condition}
                  askingPrice={lead.askingPrice}
                  leadType={lead.leadType?.name || "N/A"}
                  closingTime={lead.closingTime}
                  occupancy={lead.occupancy}
                />
              </Box>
            ))}

          {/* Render bidding leads */}
          {activeTab === 1 &&
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
                <PiddingCard
                  lead={lead}
                  leadId={lead._id}
                  address={lead.addressLine}
                  city={lead.county?.name || "N/A"}
                  condition={lead.condition}
                  intialBiddingPrice={
                    lead.bids.length !== 0
                      ? lead.bids[0].bidAmount
                      : lead.intialBiddingPrice
                  }
                  BidDurationDelay={lead.BidDurationDelay}
                  leadType={lead.leadType?.name || "N/A"}
                  closingTime={lead.closingTime}
                  occupancy={lead.occupancy}
                  status={lead.status}
                />
              </Box>
            ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default PurchasedLeads;
