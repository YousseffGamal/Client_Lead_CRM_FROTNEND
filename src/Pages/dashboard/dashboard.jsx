import React, { useState } from "react";
import { Box } from "@mui/material";
import Layout from "../../component/Layout/Layout";
import LeadCard from "../../component/LeadCard/LeadCard"; // Adjust the path if necessary
import PiddingCard from "../../component/PiddingCard/PiddingCard"; // Adjust the path if necessary
import SwitchComponent from "../../component/SwitchComponent/SwitchComponent"; // Import SwitchComponent

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

  return (
    <Layout>
      <Box sx={{ p: 3, backgroundColor: "#F1F1F1", marginTop: "65px" }}>
        {/* SwitchComponent to toggle between LeadCard and PiddingCard */}
        <SwitchComponent activeTab={activeTab} setActiveTab={setActiveTab} />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {leads.map((lead, index) => (
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
