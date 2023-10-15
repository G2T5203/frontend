import React from "react";
import { Button } from "@mui/material";
import ProgressBar from "../progress-bar/ProgressBar";
import NavBar from "../nav-bar/NavigationBar";
import FlightInfoCard from "./flight-info-card/FlightInfoCard";
import FareSummary from "./fare-summary/FareSummary";
import { useNavigate } from "react-router-dom";

const ReviewDetails = () => {

  const retrievedData = JSON.parse(sessionStorage.getItem('selectedFlights'));
  const passengerData = JSON.parse(sessionStorage.getItem('passengerData'));

  const tripType = sessionStorage.getItem('tripType') || "One way";



  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    // Navigate to the payment component
    navigate("/payment");
  };

  const { departureFlight, returnFlight } = retrievedData;

  if (!retrievedData) {
    // Redirect to FlightSearch or show an error message
    return <div>No flight details found! Please select a flight first.</div>;
  }

  console.log('Departure Flight:', departureFlight);
  console.log('Return Flight:', returnFlight);

  return (
    <div>
      <div className="nav">
        <NavBar />
      </div>

      <ProgressBar currentStep={"Review Details"} number={3} />

      <div className="center-container">
        {departureFlight && (
          <FlightInfoCard
            flightType= "Outbound Flight"
            imageURL="https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png"
            departureAirport={departureFlight.departureLocation}
            departureDate={departureFlight.departureDatetime?.split("T")[0]}
            departureTime={departureFlight.departureDatetime?.split("T")[1].substring(0, 5)}
            arrivalAirport={departureFlight.arrivalLocation}
            arrivalDate={departureFlight.departureDatetime?.split("T")[0]}
            arrivalTime={departureFlight.departureDatetime?.split("T")[1].substring(0, 5)}
            stops="Direct"
            travelTime={departureFlight.flightDuration && typeof departureFlight.flightDuration === "string" ? `${departureFlight.flightDuration.match(/(\d+)H/)[1]} hr ${departureFlight.flightDuration.match(/(\d+)M/)[1]} min` : ''}
            flightNumber={departureFlight.planeId}
          />
        )}
        {tripType === "Return" && returnFlight && (
          <FlightInfoCard
            flightType= "Return Flight"
            imageURL="https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png"
            departureAirport={returnFlight.departureLocation}
            departureDate={returnFlight.departureDatetime?.split("T")[0]}
            departureTime={returnFlight.departureDatetime?.split("T")[1].substring(0, 5)}
            arrivalAirport={returnFlight.arrivalLocation}
            arrivalDate={returnFlight.departureDatetime?.split("T")[0]}
            arrivalTime={returnFlight.departureDatetime?.split("T")[1].substring(0, 5)}
            stops="Direct"
            travelTime={returnFlight.flightDuration && typeof returnFlight.flightDuration === "string" ? `${returnFlight.flightDuration.match(/(\d+)H/)[1]} hr ${returnFlight.flightDuration.match(/(\d+)M/)[1]} min` : ''}
            flightNumber={returnFlight.planeId}
            onSelect={() => { }}
          />
        )}
      </div>

      <div className="center-container">
        <FareSummary passengers={passengerData} tripType={tripType}/>
      </div>




      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "25vh",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleProceedToPayment}>
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default ReviewDetails;
