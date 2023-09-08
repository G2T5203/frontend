import React from "react";
import NavBar from "./nav-bar/NavigationBar"; // Import the Navbar component
import SearchBar from "./search-bar/SearchBar";
import FlightSearchBar from "./flight-search-bar/FlightSearchBar";
import Banner from "./banner/Banner";
import "./FlightSearch.css";
function FlightSearch() {
  return (
    <div>
      <div className="nav">
        <NavBar />
      </div>
      <div className="banner">
        <Banner />
        <div className="flight">
          <FlightSearchBar />
        </div>
      </div>
      <div className="searchbar">
        <SearchBar />
      </div>
      
    </div>
  );
}

export default FlightSearch;
