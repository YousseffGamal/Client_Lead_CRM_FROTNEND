import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Layout from "../../component/Layout/Layout";
import LeadCard from "../../component/LeadCard/LeadCard";
import PiddingCard from "../../component/PiddingCard/PiddingCard";
import SwitchComponent from "../../component/SwitchComponent/SwitchComponent";
import FilterComponent from "../../component/FilterComponent/FilterComponent"; // Adjust the path if necessary

import { useAuth } from "../../store/authContext";
import axiosInstance from "../../axios";

const PurchasedLeads = () => {
  const [activeTab, setActiveTab] = useState(0); // State to track which card to display
  const [pricedLeads, setpricedLeads] = useState([]); // State for filtered leads
  const [biddingLeads, setbiddingLeads] = useState([]); // State for filtered leads
  const [isBidding, setIsBidding] = useState(false); // Toggle state

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("error");
  const [clientSecret, setClientSecret] = useState("");
  const [customerId, setCustomerId] = useState("");

  const { auth, setAuth } = useAuth();
  const [verified, setVerified] = useState(false);
  const memoizedAuth = useMemo(() => auth, [auth]);
  useEffect(() => {
    setVerified(memoizedAuth.user.paymentMethod);

    console.log("Auth changed:", memoizedAuth);
  }, [memoizedAuth]);

  const [bidAmount, setbidAmount] = useState("");
  const [bidDuration, setBidDuration] = useState(0);

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
  const modalClose = () => {
    getbiddingLeads();
    setAuth({ ...auth, paymentMethod: true });
    console.log("cameHereModalClose");
    localStorage.setItem("paymentMethod", true);
    setActiveTab(1);

    setOpen(false);
  };

  let ws; // Declare the WebSocket instance

  useEffect(() => {
    // Initialize the WebSocket connection
    ws = new WebSocket("http://localhost:8080");

    // Event listener for when the connection is open
    ws.onopen = () => {
      console.log("Connected to WebSocket");
      // Send an initial message, if needed
      ws.send("Hello Server!");
    };

    // Event listener for incoming messages
    ws.onmessage = async (event) => {
      console.log("Message from server:", event.data);
      // Handle the case where the event data is already JSON
      try {
        const data = JSON.parse(event.data);
        if (data.isBidding === true) {
          setbiddingLeads((biddingLeads) => [...biddingLeads, data]);
        } else if (data.isBidding === false) {
          setpricedLeads((pricedLeads) => [...pricedLeads, data]);
        } else if (data.savedBid) {
          setBidDuration(data.duration);
          setbiddingLeads((prevItems) =>
            prevItems.map((item) => {
              if (item._id === data.savedBid.Lead) {
                const updatedBid = {
                  ...data.savedBid,
                  BidDurationDelay: data.duration, // Example: Adding a new property
                };

                return {
                  ...item,
                  bids: [updatedBid, ...item.bids],
                  BidDurationDelay: data.duration,
                  // initialBiddingPrice: res.data.bid.bidAmount,
                };
              }
              return item;
            })
          );
        } else if (data.name === "scheduleLeadPurchaseJob") {
          setbiddingLeads((prevItems) =>
            prevItems.map((item) =>
              item._id === data.leadId ? { ...item, status: "Open" } : item
            )
          );
        } else if (data.name === "closeLead") {
          setbiddingLeads((prevItems) =>
            prevItems.map((item) =>
              item._id === data.leadId ? { ...item, status: "Closed" } : item
            )
          );
        }
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };
    //yzhr mn 8ir arkam
    //aftergetting the lead - comment & schedule mail message (task)
    //payment
    // Event listener for errors
    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    // Event listener for when the connection is closed
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  
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
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = (formData) => {
    console.log("Form Data Submitted:", formData);
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
