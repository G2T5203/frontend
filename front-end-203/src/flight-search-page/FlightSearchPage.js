// ScrollablePage.js
import React from 'react';
import FlightSearch from '../flight-search/FlightSearch';
const ScrollablePage = () => {
  return (
    <div className="scrollable-content">
      <div style={{ height: '1000px' }}>
        <FlightSearch/>
      </div>
    </div>
  );
};

export default ScrollablePage;

