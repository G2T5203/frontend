import React from "react";
import { Button } from "@mui/material";
import ProgressBar from "../progress-bar/ProgressBar";
import NavBar from "../nav-bar/NavigationBar";
import { useNavigate, useLocation } from "react-router-dom";
import BookingSummary from "./BookingSummary";



const BookingHistory = () => {

    

  
  return (
    <div>
      <div className="nav">
        <NavBar />
      </div>

      <ProgressBar currentStep={"Booking History "} number={3}  />

      <BookingSummary />

      </div>
  );
};

export default BookingHistory;
