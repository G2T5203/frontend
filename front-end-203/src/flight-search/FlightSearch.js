import React from "react";
import NavBar from "./nav-bar/NavigationBar"; // Import the Navbar component
import SearchBar from "./search-bar/SearchBar";
import FlightSearchBar from "./flight-search-bar/FlightSearchBar";
import Banner from "./banner/Banner";
import "./FlightSearch.css";
import { Typography } from "@mui/material";
import FlightInfoCard from "./flight-info-card/FlightInfoCard";


const flightInfo = {
  imageURL: "https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png",
  departureAirport: 'JFK',
  departureDate: '2023-09-15',
  departureTime: '08:00 AM',
  arrivalAirport: 'LAX',
  arrivalDate: '2023-09-15',
  arrivalTime: '11:00 AM',
  stops: 1,
  travelTime: '3h 0m',
  price: 299.99,
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
        variant="h4" // Adjust the variant as needed (e.g., h1, h2, h3, h4, etc.)
        style={{
          fontFamily: 'Merriweather, sans-serif', // Use the Merriweather font or replace it with your desired font
          fontWeight: 'bold', // Adjust the font weight as needed
          color: "white"
  
        }}
        
        >
          Available Flights
          
        </Typography>

        </div>
        <div className="flight-search">
          <FlightSearchBar />
        </div>
      </div>
      <div className="searchbar">
        <SearchBar />
        <FlightInfoCard {...flightInfo}/>
      </div>
      
    </div>
  );
}

export default FlightSearch;
