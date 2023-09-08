import React from "react";
import NavBar from "./nav-bar/NavigationBar"; // Import the Navbar component
import SearchBar from "./search-bar/SearchBar";
import FlightSearchBar from "./flight-search-bar/FlightSearchBar";
import Banner from "./banner/Banner";
function FlightSearch() {
  return (
    <div className="search-page">
      <NavBar />
      <Banner/>
      <FlightSearchBar />
      <SearchBar/>
    </div>
  );
}

export default FlightSearch;
