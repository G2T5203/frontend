import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import Button from '@mui/material/Button';
import './FlightInfoCard.css'; // Import the CSS file

const FlightInfoCard = ({
  airlineName,
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
        <Typography variant="h6" className="white-text">
          {airlineName}
        </Typography>
      </div>

      {/* Section 2: Departure Information */}
      <div className="section">
        <Typography variant="body1" className="white-text">
          {departureAirport}
        </Typography>
        <Typography variant="body1" className="white-text">
          {departureDate}
        </Typography>
        <Typography variant="body1" className="white-text">
          {departureTime}
        </Typography>
      </div>

      {/* Section 3: Dotted Line and Plane Logo */}
      <div className="section dotted-line">
        <Divider className="divider" />
        <AirplanemodeActiveIcon className="plane-logo" sx={{transform:'rotate(90deg)'}} />
        <Divider className="divider" />
      </div>

      {/* Section 4: Travel Time and Stops */}
      <div className="section">
        <Typography variant="body2" className="white-text">
          {travelTime}
        </Typography>
        <Typography variant="body2" className="white-text">
          {stops} stop
        </Typography>
      </div>

      {/* Section 5: Arrival Information */}
      <div className="section">
        <Typography variant="body1" className="white-text">
          {arrivalAirport}
        </Typography>
        <Typography variant="body1" className="white-text">
          {arrivalDate}
        </Typography>
        <Typography variant="body1" className="white-text">
          {arrivalTime}
        </Typography>
      </div>

      {/* Section 6: Price and Book Now Button */}
      <div className="section">
        <Typography variant="h6" className="white-text" fontSize={30}>
          ${price}
        </Typography>
        
        <Button variant="contained" sx={{
        backgroundColor: 'orange',
        color: 'white',
        padding: '5px',

        '&:hover': {
          backgroundColor: 'darkorange', // Change background color on hover
        },
      }} >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default FlightInfoCard;
