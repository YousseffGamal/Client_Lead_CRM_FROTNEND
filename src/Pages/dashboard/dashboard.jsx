import React, { useState, useEffect } from "react";
import { Box, Modal } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Layout from "../../component/Layout/Layout";
import LeadCard from "../../component/LeadCard/LeadCard";
import PiddingCard from "../../component/PiddingCard/PiddingCard";
import SwitchComponent from "../../component/SwitchComponent/SwitchComponent";
import FilterComponent from "../../component/FilterComponent/FilterComponent"; // Adjust the path if necessary
import { useAuth } from "../../store/authContext";
import axiosInstance from "../../axios";
import ChildModal from "../../component/childModal/ChildModal";

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

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [pricedLeads, setpricedLeads] = useState([]);
  const [biddingLeads, setbiddingLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("error");
  const [clientSecret, setClientSecret] = useState("");
  const [customerId, setCustomerId] = useState("");
  const { auth } = useAuth();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    setVerified(auth.paymentMethodVerified);
    setLoading(false);
    console.log("Auth changed:", auth);
  }, [auth]);

  const [bidAmount, setbidAmount] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    axiosInstance
      .post("setupPaymentIntent", {
        email: auth.user.email,
        name: auth.user.firstName,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        setCustomerId(res.data.customerId);
        setOpen(true);
      })
      .catch((err) => {
        console.log("Error fetching client secret:", err);
        return;
      });
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/UsergetAllLeads");
      setpricedLeads(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching leads data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const switchView = (event) => {
    if (auth.paymentMethodVerified) {
      getbiddingLeads();
      setActiveTab(event.target.checked ? 1 : 0);
    } else {
      handleOpen();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Layout>
        <Modal open={open} onClose={handleClose}>
          <Box sx={{ ...style, width: 400 }}>
            <h2>You need payment verification</h2>
            <p>You need to verify your payment first to access bidding leads</p>
            <ChildModal clientSecret={clientSecret} customerId={customerId} close={handleClose} />
          </Box>
        </Modal>
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
            <FilterComponent setpricedLeads={setpricedLeads} sx={{ ml: 1 }} />
            
            {/* Add Link to Purchased Leads Page */}
            <Link to="/purchased-leads" style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  p: 1,
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                View Purchased Leads
              </Box>
            </Link>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {activeTab === 0
              ? pricedLeads.map((lead, index) => (
                  <Box key={index} sx={{ width: { xs: "100%", sm: "50%", md: "33.33%", lg: "33.33%" }, padding: 1 }}>
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
              : biddingLeads.map((lead, index) => (
                  <Box key={index} sx={{ width: { xs: "100%", sm: "50%", md: "50%", lg: "50%" }, padding: 1 }}>
                    <PiddingCard
                      lead={lead}
                      leadId={lead._id}
                      address={lead.addressLine}
                      city={lead.county.name}
                      condition={lead.condition}
                      intialBiddingPrice={
                        lead.bids.length !== 0 ? lead.bids[0].bidAmount : lead.intialBiddingPrice
                      }
                      leadType={lead.leadType?.name}
                      closingTime={lead.closingTime}
                      occupancy={lead.occupancy}
                      status={lead.status}
                      biddingAmount={biddingAmount}
                      setbidAmount={setbidAmount}
                      bidAmount={bidAmount}
                      value={lead.value}
                      errorMessage={lead.error}
                      onBidChange={handleBidChange}
                    />
                  </Box>
                ))}
          </Box>
        </Box>
      </Layout>
    );
  }
};

export default Dashboard;
