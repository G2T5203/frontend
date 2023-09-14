import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import "./FlightInfoCard.css"; // Import the CSS file
import { Avatar } from "@mui/material";
import { Stack } from "@mui/material";

const FlightInfoCard = ({
  // parameters
  imageURL,
  departureAirport,
  departureDate,
  departureTime,
  arrivalAirport,
  arrivalDate,
  arrivalTime,
  stops,
  travelTime,
  price,
}) => {
  return (
    <div className="flight-info-card">
      {/* Section 1: Airline Name */}
      <div className="section">
        <Avatar
          src={imageURL}
          sx={{ marginLeft: "50px", width: 70, height: 70 }}
        ></Avatar>
      </div>

      {/* Section 2: Departure Information */}
      <div className="section">
        <Typography
          variant="body1"
          fontSize={20}
          sx={{ fontFamily: "Merriweather Sans" }}
        >
          {departureAirport}
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: "Merriweather Sans" }}>
          {departureDate}
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: "Merriweather Sans" }}>
          {departureTime}
        </Typography>
      </div>

      {/* Section 3: Dotted Line and Plane Logo */}
      <div className="section">
        <Stack direction="column" spacing={1} alignItems="center">

          <Typography variant="body1" sx={{fontFamily: 'Merriweather Sans'}}>{travelTime}</Typography>

          <Divider className="divider" />

          <Typography variant="body1" sx={{fontFamily: 'Merriweather Sans'}}>{stops} stop</Typography>
        </Stack>
      </div>

      {/* Section 4: Arrival Information */}
      <div className="section">
        <Typography
          variant="body1"
          fontSize={20}
          sx={{ fontFamily: "Merriweather Sans" }}
        >
          {arrivalAirport}
        </Typography>

        <Typography variant="body1" sx={{ fontFamily: "Merriweather Sans" }}>
          {arrivalDate}
        </Typography>

        <Typography variant="body1" sx={{ fontFamily: "Merriweather Sans" }}>
          {arrivalTime}
        </Typography>
      </div>

      {/* Section 5: Price and Book Now Button */}
      <div className="section">
        <Typography
          variant="h6"
          fontSize={30}
          sx={{ fontFamily: "Merriweather Sans" }}
        >
          ${price}
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "darkorange",
            color: "white",
            padding: "5px",
            "&:hover": {
              backgroundColor: "orange", // Change background color on hover
            },
          }}
        >
          <Typography
            variant="h6"
            fontSize={15}
            sx={{ fontFamily: "Merriweather Sans", textTransform: "none",}}
          >
            Book Now
          </Typography>

        </Button>
      </div>
    </div>
  );
};

export default FlightInfoCard;
