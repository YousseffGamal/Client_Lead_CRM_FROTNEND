import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Layout from "../../component/Layout/Layout";
import LeadCard from "../../component/LeadCard/LeadCard";
import PiddingCard from "../../component/PiddingCard/PiddingCard";
import SwitchComponent from "../../component/SwitchComponent/SwitchComponent";
import FilterComponent from "../../component/FilterComponent/FilterComponent"; // Adjust the path if necessary
import axios from "axios"; 
import axiosInstance from "../../axios";

// Sample leads data
const leads = [
  { address: "123 Main St", city: "Dallas", condition: "Lorem ipsum dolor sit amet.", askingPrice: "2700$", status: "Hot" },
  { address: "456 Oak St", city: "Houston", condition: "Aliquam at sapien non tellus.", askingPrice: "3200$", status: "Cold" },
  { address: "789 Pine St", city: "Austin", condition: "Vivamus facilisis arcu.", askingPrice: "2900$", status: "Warm" },
  { address: "101 Maple St", city: "San Antonio", condition: "Pellentesque vehicula.", askingPrice: "3100$", status: "Hot" },
  { address: "202 Cedar St", city: "Fort Worth", condition: "Maecenas tincidunt massa.", askingPrice: "2800$", status: "Cold" },
  { address: "303 Elm St", city: "El Paso", condition: "Donec aliquam magna.", askingPrice: "3300$", status: "Warm" },
  { address: "404 Birch St", city: "Plano", condition: "Fusce vitae risus venenatis.", askingPrice: "3500$", status: "Hot" },
  { address: "505 Walnut St", city: "Garland", condition: "Proin commodo turpis.", askingPrice: "3000$", status: "Warm" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0); // State to track which card to display
  const [filteredLeads, setFilteredLeads] = useState(leads); // State for filtered leads
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

 // Fetch leads from API
 useEffect(() => {
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/getAllLeads"); 
      setFilteredLeads(response.data.data); 
      setLoading(false);
    } catch (err) {
      setError("Error fetching leads data");
      setLoading(false);
    }
  };
  fetchLeads(); 
}, []);


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
          <SwitchComponent activeTab={activeTab} setActiveTab={setActiveTab} />
          <FilterComponent setFilteredLeads={setFilteredLeads} sx={{ ml: 1 }} /> {/* Add left margin if needed */}
        </Box>
          
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {filteredLeads.map((lead, index) => (
            <Box
              key={index}
              sx={{
                width: {
                  xs: "100%", // Full width on small screens
                  sm: "50%",   // Two cards per row on small and up
                  md: activeTab === 0 ? "33.33%" : "50%", // For LeadCard, three cards in medium screens, and two for PiddingCard
                  lg: activeTab === 0 ? "25%" : "50%", // Four cards in large screens for LeadCard, two for PiddingCard
                },
                padding: 1,
                boxSizing: "border-box",
              }}
            >
              {activeTab === 0 ? (
                <LeadCard
                  address={lead.address}
                  city={lead.city}
                  condition={lead.condition}
                  askingPrice={lead.askingPrice}
                  status={lead.status}
                />
              ) : (
                <PiddingCard
                  address={lead.address}
                  city={lead.city}
                  condition={lead.condition}
                  askingPrice={lead.askingPrice}
                  status={lead.status}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default Dashboard;
