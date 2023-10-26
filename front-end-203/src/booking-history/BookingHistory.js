import React from "react";
import { Button } from "@mui/material";
import ProgressBar from "../progress-bar/ProgressBar";
import NavBar from "../nav-bar/NavigationBar";
import { useNavigate, useLocation } from "react-router-dom";

const BookingHistory = () => {

  
  return (
    <div>
      <div className="nav">
        <NavBar />
      </div>

      <ProgressBar currentStep={"Booking History "} number={3} deadline={new Date(sessionStorage.getItem('endTime'))} />

      </div>
  );
};

export default BookingHistory;
