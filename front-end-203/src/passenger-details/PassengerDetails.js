import React from "react";
import { Button } from "@mui/material";
import ProgressBar from "../progress-bar/ProgressBar";
import PassengerForm from "./passenger-form/PassengerForm";
import NavBar from "../nav-bar/NavigationBar"; // Import the Navbar component
import {useLocation, useNavigate} from "react-router-dom";


const PassengerDetails = () => {
    const location = useLocation();
    const {inboundSeats, outboundSeats, noGuest, depFlight, retFlight} = location.state;
    console.log(inboundSeats + " " + outboundSeats + ' ' + noGuest);
  const noGuestSelected = sessionStorage.getItem('noGuestSelected') || "0"; 
  const tripType = sessionStorage.getItem('tripType') || "One way"; 

  const navigate = useNavigate();
  const [passengers, setPassengers] = React.useState([]);

  const handlePassengerDataChange = (passengerData) => {
    console.log(passengerData); 
    setPassengers(passengerData);
}
const handleProceedToReview = () => {
  // Save to sessionStorage
  sessionStorage.setItem('passengerData', JSON.stringify(passengers));

  // Navigate to the ReviewDetails component
  navigate("/reviewdetails");
};

  
  return (
    <div>
      <div className="nav">
        <NavBar />
      </div>

      <ProgressBar currentStep={"Passenger Details"} number={2} />

      <PassengerForm numGuests={noGuestSelected} tripType={tripType} onPassengerDataChange={handlePassengerDataChange}/>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "25vh",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleProceedToReview}>
          Proceed to Review
        </Button>
      </div>
    </div>
  );
};

export default PassengerDetails;
