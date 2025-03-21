import React, { useState, useEffect, useMemo } from "react";
import { Box, Modal } from "@mui/material";
import Layout from "../../component/Layout/Layout";
import LeadCard from "../../component/LeadCard/LeadCard";
import PiddingCard from "../../component/PiddingCard/PiddingCard";
import SwitchComponent from "../../component/SwitchComponent/SwitchComponent";
import FilterComponent from "../../component/FilterComponent/FilterComponent"; // Adjust the path if necessary

import { useAuth } from "../../store/authContext";
import axiosInstance from "../../axios";
import ChildModal from "../../component/childModal/ChildModal";

// Sample leads data
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
  const [activeTab, setActiveTab] = useState(0); // State to track which card to display
  const [pricedLeads, setpricedLeads] = useState([]); // State for filtered leads
  const [biddingLeads, setbiddingLeads] = useState([]); // State for filtered leads

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
  const modalClose = (cxId) => {
    if (cxId) {
      console.log("sucess cx id", cxId);
      getbiddingLeads();
      setAuth({
        ...auth,
        paymentMethod: true,
        user: {
          ...auth.user,
          CustomerId: cxId,
        },
      });
      // Retrieve the existing user object from localStorage
      let user = JSON.parse(localStorage.getItem("user"));

      // Update the CustomerId property
      user = {
        ...user,
        CustomerId: cxId,
      };

      // Save the updated user object back to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("paymentMethod", true);

      setActiveTab(1);

      setOpen(false);
    } else {
      setOpen(false);
    }
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
          console.log("savedBid", data.savedBid);
          setbiddingLeads((prevItems) =>
            prevItems.map((item) => {
              if (item._id === data.savedBid.Lead) {
                return {
                  ...item,
                  BidDurationDelay: data.duration,
                  resetFlag: !item.resetFlag,
                  bids: [...item.bids, data.savedBid],
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
      const response = await axiosInstance.get("/UsergetAllLeads");

      setpricedLeads(response.data.data);
    } catch (err) {
      setError("Error fetching leads data");
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
        console.log("bidding leads", res.data.data);
        setbiddingLeads(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const switchView = (event) => {
    if (auth.paymentMethod) {
      getbiddingLeads();
      setActiveTab(event.target.checked ? 1 : 0);
    } else {
      console.log(auth);
      handleOpen();
    }
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

  return (
    <Layout>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">You need payment verification</h2>
          <p id="parent-modal-description">
            You need to verify your payment first to access bidding leads
          </p>
          <ChildModal
            clientSecret={clientSecret}
            customerId={customerId}
            close={modalClose}
          />
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
          <FilterComponent
            setpricedLeads={activeTab == 0 ? setpricedLeads : setbiddingLeads}
            sx={{ ml: 1 }}
            activeTab={activeTab}
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
                    leadId={lead._id} // Ensure this is passed
                    address={lead.addressLine}
                    city={lead.county.name}
                    condition={lead.condition}
                    leadType={lead.leadType?.name}
                    closingTime={lead.closingTime}
                    occupancy={lead.occupancy}
                    viewPath="/leadview" // Specify the path
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
                      key={lead.BidDurationDelay}
                      BidDurationDelay={lead.BidDurationDelay}
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
                      viewPath="/leadview" // Specify the path
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
