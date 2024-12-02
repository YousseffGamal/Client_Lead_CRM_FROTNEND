import React from "react";
import { Box } from "@mui/material";
import Layout from "../../component/Layout/Layout"; // Adjust path if necessary
import LeadInputSection from "../../component/PurchasedLeadInputSection/PurchasedLeadInputSection";

const PurchasedLeadView = () => {
  return (
    <Layout>
      <Box sx={{ p: 3, backgroundColor: "#F1F1F1", marginTop: "65px" }}>
        <LeadInputSection />
      </Box>
    </Layout>
  );
};

export default PurchasedLeadView;
