import React from "react";
import LeadCard from "../../component/LeadCard/LeadCard"; // Adjust the path if necessary
import { Box } from "@mui/material";
import Layout from "../../component/Layout/Layout";

// Sample leads data
const leads = [
  { address: "123 Main St", city: "Dallas", condition: "Lorem ipsum dolor sit amet.", askingPrice: "$2700", status: "Hot" },
  { address: "456 Oak St", city: "Houston", condition: "Aliquam at sapien non tellus.", askingPrice: "$3200", status: "Cold" },
  { address: "789 Pine St", city: "Austin", condition: "Vivamus facilisis arcu.", askingPrice: "$2900", status: "Warm" },
  { address: "101 Maple St", city: "San Antonio", condition: "Pellentesque vehicula.", askingPrice: "$3100", status: "Hot" },
  { address: "202 Cedar St", city: "Fort Worth", condition: "Maecenas tincidunt massa.", askingPrice: "$2800", status: "Cold" },
  { address: "303 Elm St", city: "El Paso", condition: "Donec aliquam magna.", askingPrice: "$3300", status: "Warm" },
  { address: "404 Birch St", city: "Plano", condition: "Fusce vitae risus venenatis.", askingPrice: "$3500", status: "Hot" },
  { address: "505 Walnut St", city: "Garland", condition: "Proin commodo turpis.", askingPrice: "$3000", status: "Warm" },
];

const Dashboard = () => {
  return (
    <Layout>
      <Box
        sx={{
          p: 3,
          backgroundColor: "#F1F1F1",
          marginTop: "65px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center", 
        }}
      >
        {leads.map((lead, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: "100%", sm: "50%", md: "33.33%", lg: "25%" }, // Responsive widths
              padding: 1, 
              boxSizing: "border-box", 
            }}
          >
            <LeadCard
              address={lead.address}
              city={lead.city}
              condition={lead.condition}
              askingPrice={lead.askingPrice}
              status={lead.status} 
            />
          </Box>
        ))}
      </Box>
    </Layout>
  );
};

export default Dashboard;
