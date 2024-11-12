// PurchasedLeads.js
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axiosInstance from "../../axios";
import LeadCard from "../../component/LeadCard/LeadCard"; // Adjust the path if necessary
import Layout from "../../component/Layout/Layout";

const PurchasedLeads = () => {
  const [purchasedLeads, setPurchasedLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchasedLeads = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/getUserLeads/${id}`);
        setPurchasedLeads(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching purchased leads data");
        setLoading(false);
      }
    };

    fetchPurchasedLeads();
  }, []);

  if (loading) {
    return <div>Loading purchased leads...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      <Box sx={{ p: 3, backgroundColor: "#F1F1F1", marginTop: "65px" }}>
        <Typography variant="h4" gutterBottom>
          Purchased Leads 
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {purchasedLeads.length > 0 ? (
            purchasedLeads.map((lead) => (
              <Box
                key={lead._id}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "50%",
                    md: "33.33%",
                    lg: "25%",
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
                  askingPrice={lead.askingPrice}
                  leadType={lead.leadType?.name}
                  closingTime={lead.closingTime}
                  occupancy={lead.occupancy}
                />
              </Box>
            ))
          ) : (
            <Typography variant="body1">No purchased leads found.</Typography>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default PurchasedLeads;
