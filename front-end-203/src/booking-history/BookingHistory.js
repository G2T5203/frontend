import React from "react";
import { Button } from "@mui/material";
import ProgressBar from "../progress-bar/ProgressBar";
import NavBar from "../nav-bar/NavigationBar";
import { useNavigate, useLocation } from "react-router-dom";
import BookingSummary from "./BookingSummary";
import Banner from "./Banner";



const BookingHistory = () => {

    

  
  return (
    <div>
      <div className="nav">
        <NavBar />
      </div>

      <Banner currentStep={"Booking History "} />

      <BookingSummary />

      </div>
  );
};

export default BookingHistory;
