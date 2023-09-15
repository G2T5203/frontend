import React from "react";
import NavBar from "./nav-bar/NavigationBar"; // Import the Navbar component
import FlightSearchBar from "./flight-search-bar/FlightSearchBar";
import Banner from "./banner/Banner";
import "./FlightSearch.css";
import { Typography } from "@mui/material";
import FlightInfoCard from "./flight-info-card/FlightInfoCard";
import FilterTile from "./filter-tile/FilterTile";
import FlightSearchBar2 from "../flight-search-bar-2/FlightSearchBar2";

const flightInfoArray = [
  {
    imageURL: "https://example.com/airline1-logo.png",
    departureAirport: "JFK",
    departureDate: "2023-09-15",
    departureTime: "08:00 AM",
    arrivalAirport: "LAX",
    arrivalDate: "2023-09-15",
    arrivalTime: "11:00 AM",
    stops: 1,
    travelTime: "3h 0m",
    price: 299.99,
  },
  {
    imageURL: "https://example.com/airline2-logo.png",
    departureAirport: "LAX",
    departureDate: "2023-09-16",
    departureTime: "09:30 AM",
    arrivalAirport: "ORD",
    arrivalDate: "2023-09-16",
    arrivalTime: "12:45 PM",
    stops: 0,
    travelTime: "3h 15m",
    price: 249.99,
  },
  {
    imageURL: "https://example.com/airline3-logo.png",
    departureAirport: "ATL",
    departureDate: "2023-09-17",
    departureTime: "10:15 AM",
    arrivalAirport: "MIA",
    arrivalDate: "2023-09-17",
    arrivalTime: "01:30 PM",
    stops: 2,
    travelTime: "3h 15m",
    price: 199.99,
  },
  {
    imageURL: "https://example.com/airline4-logo.png",
    departureAirport: "SFO",
    departureDate: "2023-09-18",
    departureTime: "11:30 AM",
    arrivalAirport: "SEA",
    arrivalDate: "2023-09-18",
    arrivalTime: "02:15 PM",
    stops: 1,
    travelTime: "2h 45m",
    price: 159.99,
  },
  {
    imageURL: "https://example.com/airline5-logo.png",
    departureAirport: "ORD",
    departureDate: "2023-09-19",
    departureTime: "07:45 AM",
    arrivalAirport: "MCO",
    arrivalDate: "2023-09-19",
    arrivalTime: "10:30 AM",
    stops: 0,
    travelTime: "2h 45m",
    price: 219.99,
  },
  // Add more flight info objects as needed
];

// imageURL:
//     "https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png"

const filterInfo = {
  airlines: ["Singapore Airlines", "Qatar Airways", "Air India", "Emirates"],
};
const searchLocations = {
  locations: [
    "JFK",
    "LAX",
    "ORD",
    "ATL",
  ],
};
function FlightSearch() {
  return (
    <div>
      <div className="nav">
        <NavBar />
      </div>
      <div className="banner">
        <Banner />
        <div className="text">
          <Typography
            variant="h4"
            style={{
              fontFamily: "Merriweather, sans-serif",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Available Flights
          </Typography>
        </div>
        <div className="flight-search">
          <FlightSearchBar2 locations={searchLocations.locations} />
        </div>
      </div>
      <div className="flight-info-container-scrollable">
        {/* Map through the flightInfoArray and create FlightInfoCard components */}
        {flightInfoArray.map((flight, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <FlightInfoCard {...flight} />
          </div>
        ))}
      </div>
      {/* Container for FilterTile */}
      <div className="filter-container">
        <FilterTile airlines={filterInfo.airlines} />
      </div>
    </div>
  );
}

export default FlightSearch;
