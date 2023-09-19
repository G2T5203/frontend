import React from "react";
import { useState } from "react";
import NavBar from "./nav-bar/NavigationBar"; // Import the Navbar component
import Banner from "./banner/Banner";
import "./FlightSearch.css";
import { Typography } from "@mui/material";
import FlightInfoCard from "./flight-info-card/FlightInfoCard";
import FilterTile from "./filter-tile/FilterTile";
import FlightSearchBar2 from "./flight-search-bar/FlightSearchBar";
import { useLocation } from "react-router-dom";

const flightInfoArray = [
  {
    imageURL:
      "https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png",
    departureAirport: "Japan",
    departureDate: "2023-09-15",
    departureTime: "08:00 AM",
    arrivalAirport: "Singapore",
    arrivalDate: "2023-09-15",
    arrivalTime: "11:00 AM",
    stops: 1,
    travelTime: "3h 0m",
    price: 799.99,
    flightNumber: "SQ39",
  },
  {
    imageURL:
      "https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png",
    departureAirport: "Japan",
    departureDate: "2023-09-16",
    departureTime: "09:30 AM",
    arrivalAirport: "Singapore",
    arrivalDate: "2023-09-16",
    arrivalTime: "12:45 PM",
    stops: 0,
    travelTime: "3h 15m",
    price: 987.45,
    flightNumber: "SQ39",
  },
  {
    imageURL:
      "https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png",
    departureAirport: "Japan",
    departureDate: "2023-09-17",
    departureTime: "10:15 AM",
    arrivalAirport: "Singapore",
    arrivalDate: "2023-09-17",
    arrivalTime: "01:30 PM",
    stops: 2,
    travelTime: "3h 15m",
    price: 165.54,
    flightNumber: "SQ39",
  },
  {
    imageURL:
      "https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png",
    departureAirport: "Japan",
    departureDate: "2023-09-18",
    departureTime: "11:30 AM",
    arrivalAirport: "Singapore",
    arrivalDate: "2023-09-18",
    arrivalTime: "02:15 PM",
    stops: 0,
    travelTime: "2h 45m",
    price: 394.53,
    flightNumber: "SQ39",
  },
  {
    imageURL:
      "https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png",
    departureAirport: "Japan",
    departureDate: "2023-09-19",
    departureTime: "07:45 AM",
    arrivalAirport: "Singapore",
    arrivalDate: "2023-09-19",
    arrivalTime: "10:30 AM",
    stops: 0,
    travelTime: "2h 45m",
    price: 345.12,
    flightNumber: "SQ39",
  },
  {
    imageURL:
      "https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png",
    departureAirport: "Japan",
    departureDate: "2023-09-15",
    departureTime: "08:00 AM",
    arrivalAirport: "Singapore",
    arrivalDate: "2023-09-15",
    arrivalTime: "11:00 AM",
    stops: 1,
    travelTime: "3h 0m",
    price: 526.78,
    flightNumber: "SQ39",
  },
  {
    imageURL:
      "https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png",
    departureAirport: "Japan",
    departureDate: "2023-09-16",
    departureTime: "09:30 AM",
    arrivalAirport: "Singapore",
    arrivalDate: "2023-09-16",
    arrivalTime: "12:45 PM",
    stops: 0,
    travelTime: "3h 15m",
    price: 249.99,
    flightNumber: "SQ39",
  },
  {
    imageURL:
      "https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png",
    departureAirport: "JFK",
    departureDate: "2023-09-17",
    departureTime: "10:15 AM",
    arrivalAirport: "ATL",
    arrivalDate: "2023-09-17",
    arrivalTime: "01:30 PM",
    stops: 2,
    travelTime: "3h 15m",
    price: 199.99,
    flightNumber: "SQ39",
  },
  {
    imageURL:
      "https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png",
    departureAirport: "JFK",
    departureDate: "2023-09-18",
    departureTime: "11:30 AM",
    arrivalAirport: "LAX",
    arrivalDate: "2023-09-18",
    arrivalTime: "02:15 PM",
    stops: 1,
    travelTime: "2h 45m",
    price: 159.99,
    flightNumber: "SQ39",
  },
  {
    imageURL:
      "https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png",
    departureAirport: "JFK",
    departureDate: "2023-09-19",
    departureTime: "07:45 AM",
    arrivalAirport: "LAX",
    arrivalDate: "2023-09-19",
    arrivalTime: "10:30 AM",
    stops: 0,
    travelTime: "2h 45m",
    price: 219.99,
    flightNumber: "SQ39",
  },
  // Add more flight info objects as needed
];

// imageURL:
//     "https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png"

const filterInfo = {
  airlines: ["Singapore Airlines", "Qatar Airways", "Air India", "Emirates"],
};
const searchLocations = {
  locations: ["Japan", "Singapore", "Sweden", "India", "USA", "Denmark"],
};
function FlightSearch() {
  //dummy code
  const location = useLocation();
  const data = location.state;

  console.log(data);

  // const testOnClick = () => {
  //   console.log(data);
  // };

  const [filteredFlights, setFilteredFlights] = useState([]);

  const handleSearch = (departureLocation, arrivalLocation) => {
    // Filter flights based on the selected departure and arrival locations
    const filteredFlights = flightInfoArray.filter((flight) => {
      return (
        flight.departureAirport === departureLocation &&
        flight.arrivalAirport === arrivalLocation
      );
    });

    setFilteredFlights(filteredFlights);
  };
  return (
    <div>
      <div className="nav">
        <NavBar />
      </div>
      <div className="banner">
        <Banner />

        {/* <div>
        testing button here
          <Button onClick={testOnClick}> hi </Button>
        </div> */}
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
          <FlightSearchBar2
            locations={searchLocations.locations}
            onSearch={handleSearch}
          />
        </div>
      </div>
      {/* Container for FlightInfoCard */}
      <div className="flight-info-container-scrollable">
        {filteredFlights.map((flight, index) => (
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
