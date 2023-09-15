// ScrollablePage.js
import React from 'react';
import FlightSearch from '../flight-search/FlightSearch';
const FlightSearchPage = () => {
  return (
    <div className="scrollable-content">
      <div style={{ height: '300px' }}>
        <FlightSearch/>
      </div>
    </div>
  );
};

export default FlightSearchPage;

