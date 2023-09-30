import React from "react";
import BookingSlip from "./BookingSlip.js";
import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
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
