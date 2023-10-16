import React from "react";
import BookingSlip from "./BookingSlip.js";
import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { getCurrentUser } from "../auth.js";

const ConfirmationPage = () => {
  const retrievedData = JSON.parse(sessionStorage.getItem('selectedFlights'));
  const passengerData = JSON.parse(sessionStorage.getItem('passengerData'));

  const tripType = sessionStorage.getItem('tripType') || "One way";
  const bookingId = sessionStorage.getItem('bookingId')
  const username = getCurrentUser.username;
  console.log("This is booking id: " + bookingId);
  console.log("This is triptype: " + tripType);
  console.log("This is passengerData")
  console.log(passengerData);
  console.log("This is retrieveData")
  console.log(retrievedData);
  console.log("This is username")
  console.log(username);


  
    const navigate = useNavigate();

    const handleClickReturn = (e) => {
        navigate("/");
    }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={"bold"}
          sx={{ textDecoration: "underline", p: 3 }}
        >
          Booking Success!
        </Typography>
        <Button
          variant={"contained"}
          sx={{ mb: 3, color: "white", backgroundColor: "#F9AB55" }}
        >
          Download Calendar File
        </Button>
      </Box>
      <Container>
        <BookingSlip />
      </Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Button variant={"contained"} sx={{ mt: 3 }} onClick={handleClickReturn}>
          Return to home
        </Button>
      </Box>
    </>
  );
};

export default ConfirmationPage;
