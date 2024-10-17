import React, { useState, useEffect } from "react"; // Import useState and useEffect for managing state and side effects
import axios from "axios"; // Import axios for making HTTP requests
import {
    Typography,
    Box,
} from "@mui/material";

const Boxs = () => {
    // State to hold the number of clients, leads, and open leads
    const [numberOfClients, setNumberOfClients] = useState(0);
    const [numberOfLeads, setNumberOfLeads] = useState(0); // State for number of leads
    const [numberOfOpenLeads, setNumberOfOpenLeads] = useState(0); // State for number of open leads

    // Fetch the number of clients, leads, and open leads from the backend
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const token = localStorage.getItem("token"); // Replace with your token retrieval method
                const response = await axios.get("http://localhost:4000/countclients", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Use the retrieved token
                    },
                });
                setNumberOfClients(response.data.count); // Use response.data.count
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };

        const fetchLeads = async () => {
            try {
                const token = localStorage.getItem("token"); // Replace with your token retrieval method
                const response = await axios.get("http://localhost:4000/countLeads", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Use the retrieved token
                    },
                });
        
                // Check if the response contains the expected data structure
                if (response.data && response.data.success) {
                    setNumberOfLeads(response.data.data); // Use response.data.data
                } else {
                    console.error("Unexpected response structure:", response.data);
                }
            } catch (error) {
                console.error("Error fetching leads:", error);
            }
        };

        const fetchOpenLeads = async () => {
            try {
                const token = localStorage.getItem("token"); // Replace with your token retrieval method
                const response = await axios.get("http://localhost:4000/getAllOpenLeads", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Use the retrieved token
                    },
                });

                // Check if the response contains the expected data structure
                if (response.data && response.data.success) {
                    setNumberOfOpenLeads(response.data.data.length); // Count the number of open leads
                } else {
                    console.error("Unexpected response structure:", response.data);
                }
            } catch (error) {
                console.error("Error fetching open leads:", error);
            }
        };

        fetchClients();
        fetchLeads();
        fetchOpenLeads(); // Call the new function to fetch open leads
    }, []); // Empty dependency array ensures this runs only once on mount

    const stats = [
        {
            title: "No. Of Leads",
            value: numberOfLeads, // Use the state variable for leads
            bgColor: "#0177FB",
            textColor: "#fff",
        },
        {
            title: "No. Of Clients",
            value: numberOfClients, // Use the state variable for clients
            bgColor: "#FFFFFF",
            textColor: "#000000",
        },
        {
            title: "No. Of Open Leads",
            value: numberOfOpenLeads, // Use the state variable for open leads
            bgColor: "#FFFFFF",
            textColor: "#000000",
        },
    ];

    return (
        <>
            {/* Statistics Boxes */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
                }}
            >
                {stats.map((stat, index) => (
                    <Box
                        key={index}
                        sx={{
                            backgroundColor: stat.bgColor,
                            padding: "16px",
                            borderRadius: "30px",
                            width: { xs: "100%", sm: "465px" },
                            height: "195px",
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            className="CardNumber"
                            variant="h1"
                            sx={{
                                color: stat.textColor,
                                fontWeight: "bold",
                                fontSize: { xs: "2rem", sm: "3rem", md: "4rem", lg: "78px" },
                            }}
                        >
                            {stat.value}
                        </Typography>
                        <Box
                            sx={{
                                width: "60%",
                                height: "1px",
                                backgroundColor: stat.textColor,
                                my: 1,
                                opacity: 0.5,
                                mx: "auto",
                            }}
                        />
                        <Typography
                            className="TitleCard"
                            variant="h6"
                            sx={{ color: stat.textColor }}
                        >
                            {stat.title}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default Boxs;
