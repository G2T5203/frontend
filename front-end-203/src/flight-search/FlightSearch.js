import React from "react";
import { useState } from "react";
import NavBar from "./nav-bar/NavigationBar"; // Import the Navbar component
import Banner from "./banner/Banner";
import "./FlightSearch.css";
import { Typography } from "@mui/material";
import FlightInfoCard from "./flight-info-card/FlightInfoCard";
import FilterTile from "./filter-tile/FilterTile";
import FlightSearchBar from "./flight-search-bar/FlightSearchBar";
import { useLocation } from "react-router-dom";

// values for the filter tile
const filterInfo = {
  airlines: ["Singapore Airlines", "Qatar Airways", "Air India", "Emirates"],
};

// values for the 2 location dropdowns
const searchLocations = {
  locations: ["Japan", "Singapore", "Taiwan", "India", "China"],
};

// flight search function
function FlightSearch() {
  //dummy code to check if all the data from homepage is brought to flight search screen
  const location = useLocation();
  const data = location.state;

  // printng data from homepage
  console.log("This is data")
  console.log(data);

  // for setting flightdata array (containing data from fullsearch endpoint)
  const [flightData, setFlightData] = useState([]);

  const handleFlightData = (data) => {
    setFlightData(data);
}

  // printing data from fullsearch endpoint
  console.log("This is flightdata")
  console.log(flightData);

  // for getting data from homepage
  const { trip, noGuest, flightClass, flyingFrom, flyingTo, departuredt, arrivaldt } = location.state;


  // for passing into the flight information cards (arrival and departure are not provided as data from fullsearch endpoint)
  const [departureLocation, setDepartureLocation] = useState("");
  const [arrivalLocation, setArrivalLocation] = useState("");

  // setting departure and arrival location based on input in search bar
  const handleSearch = (departureLocation, arrivalLocation) => {
    setDepartureLocation(departureLocation)
    setArrivalLocation(arrivalLocation)
  
  };
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
          <FlightSearchBar

            // setting flight data array
            onFetchData={handleFlightData}

            // setting locations in departure/arrival locations
            locations={searchLocations.locations}

            // initial population of search bar based on homepage inputs
            flyingFrom={flyingFrom}
            flyingTo={flyingTo}
            trip={trip}

            //TODO: figure out how to make date from homepage appear in the search bar when routed to flight search page. Currently it is not working.
            // potentially due to data type mismatch, not sure.
            // departuredt={JSON.parse(departuredt)}
            // arrivaldt={JSON.parse(arrivaldt)}
            onSearch={handleSearch}
          />
        </div>
      </div>
      {/* Container for FlightInfoCard */}
      {/* populating the flight-info-cards with the data from fullSearch endpoint. */}
      <div className="flight-info-container-scrollable">
        {flightData.map((flight, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <FlightInfoCard

            // SIA logo url
            imageURL={"https://graphic.sg/media/pages/gallery/singapore-airlines-logo-1987/3067018395-1599296800/1987-singapore-airlines-logo-240x.png"}

            // departure location that is passed in as input
            departureAirport={departureLocation}

            // departure date and time extracted from departureDatetime
            departureDate={flight.departureDatetime.split('T')[0]}
            departureTime={flight.departureDatetime.split('T')[1].substring(0, 5)}

            // arrival location that is passed in as input
            arrivalAirport={arrivalLocation}

            // departure date and time extracted from departureDatetime
            arrivalDate={flight.departureDatetime.split('T')[0]}
            arrivalTime={flight.departureDatetime.split('T')[1].substring(0, 5)}

            // stops hardcoded as Direct
            stops={"Direct"}

            // travelTime hardcoded as 5 hr 10 min
            travelTime={"5hr 10 min"}

            // price and flightNumber from endpoint
            price={flight.basePrice.toFixed(2)}
            flightNumber={flight.planeId}/>
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
