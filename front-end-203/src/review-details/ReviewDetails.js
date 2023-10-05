import React from "react";
import { Button } from "@mui/material";
import ProgressBar from "../progress-bar/ProgressBar";
import NavBar from "../nav-bar/NavigationBar"; // Import the Navbar component
import FlightInfoCard from "./flight-info-card/FlightInfoCard"

const ReviewDetails = () => {
  return (
    <div>
      <div className="nav">
        <NavBar />
      </div>

      <ProgressBar currentStep={"Review Details"} number={3} />

      <FlightInfoCard />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "25vh",
        }}
      >
        <Button variant="contained" color="primary">
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default ReviewDetails;
