import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Layout from "../../component/Layout/Layout";
import LeadCard from "../../component/LeadCard/LeadCard";
import PiddingCard from "../../component/PiddingCard/PiddingCard";
import SwitchComponent from "../../component/SwitchComponent/SwitchComponent";
import FilterComponent from "../../component/FilterComponent/FilterComponent"; // Adjust the path if necessary

import { useAuth } from "../../store/authContext";
import axiosInstance from "../../axios";

// Sample leads data

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0); // State to track which card to display
  const [pricedLeads, setpricedLeads] = useState([]); // State for filtered leads
  const [biddingLeads, setbiddingLeads] = useState([]); // State for filtered leads
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("error");

  const { auth } = useAuth();
  const [bidAmount, setbidAmount] = useState("");
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
        } else if (data.bidderId) {
          setbiddingLeads((prevItems) =>
            prevItems.map((item) =>
              item._id === data.Lead
                ? {
                    ...item,

                    bids: [data, ...item.bids],
                    // intialBiddingPrice: res.data.bid.bidAmount,
                  }
                : item
            )
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
      setLoading(true);
      const response = await axiosInstance.get("/UsergetAllLeads");

      setpricedLeads(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching leads data");
      setLoading(false);
    }
  };

  // Fetch leads from API
  useEffect(() => {
    fetchLeads();
  }, []);
  const getbiddingLeads = () => {
    axiosInstance
      .get("biddingLeads")
      .then((res) => {
        setbiddingLeads(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const switchView = (event) => {
    getbiddingLeads();
    setActiveTab(event.target.checked ? 1 : 0);
  };

  const handleBidChange = (leadId, value) => {
    setbiddingLeads((prevItems) =>
      prevItems.map((item) =>
        item._id === leadId ? { ...item, value: value } : item
      )
    );
    setbidAmount(value);
  };

  const biddingAmount = (Lead) => {
    const lead = biddingLeads.find((item) => item._id === Lead);
    axiosInstance
      .post("/bids", {
        bidderId: auth.user._id,
        bidAmount: lead.value,
        Lead,
      })
      .then((res) => {
        setbiddingLeads((prevItems) =>
          prevItems.map((item) =>
            item._id === Lead
              ? {
                  ...item,
                  value: "",
                  error: "",
                  bids: [res.data.bid, ...item.bids],
                  // intialBiddingPrice: res.data.bid.bidAmount,
                }
              : item
          )
        );

        // setbidAmount("");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setbiddingLeads((prevItems) =>
          prevItems.map((item) =>
            item._id === Lead
              ? { ...item, value: "", error: err.response.data.message }
              : item
          )
        );
      });
  };
  // const resetBidAmount = () =>{

  // }

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
          <FilterComponent
            setpricedLeads={setpricedLeads}
            sx={{ ml: 1 }}
          />{" "}
          {/* Add left margin if needed */}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {activeTab === 0
            ? pricedLeads.map((lead, index) => (
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
                <Box
                  key={index}
                  sx={{
                    width: {
                      xs: "100%", // Full width on small screens
                      sm: "50%", // Two cards per row on small and up
                      md: activeTab === 0 ? "33.33%" : "50%", // For LeadCard, three cards in medium screens, and two for PiddingCard
                      lg: activeTab === 0 ? "25%" : "50%", // Four cards in large screens for LeadCard, two for PiddingCard
                    },
                    padding: 1,
                    boxSizing: "border-box",
                  }}
                >
                  {
                    <PiddingCard
                      lead={lead}
                      leadId={lead._id}
                      address={lead.addressLine}
                      city={lead.county.name}
                      condition={lead.condition}
                      intialBiddingPrice={
                        lead.bids.length != 0
                          ? lead.bids[0].bidAmount
                          : lead.intialBiddingPrice
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
                  }
                </Box>
              ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default Dashboard;
