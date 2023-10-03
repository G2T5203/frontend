import React from "react";
import { Button } from "@mui/material";
import ProgressBar from "../progress-bar/ProgressBar";
import PassengerForm from "./passenger-form/PassengerForm";
import NavBar from "../nav-bar/NavigationBar"; // Import the Navbar component

const PassengerDetails = () => {
  return (
    <div>
      <div className="nav">
        <NavBar />
      </div>

      <ProgressBar currentStep={"Passenger Details"} number={2} />

      <PassengerForm />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "25vh",
        }}
      >
        <Button variant="contained" color="primary">
          Proceed to Review
        </Button>
      </div>
    </div>
  );
};

export default PassengerDetails;
