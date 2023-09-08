// ScrollablePage.js
import React from 'react';
import FlightSearch from '../flight-search/FlightSearch';
const ScrollablePage = () => {
  return (
    <div className="scrollable-content">
      {/* Your content goes here */}
      <div style={{ height: '1000px' }}>
        <FlightSearch/>
        {/* Generate some content to make the page scrollable */}
        <p>This is a long scrollable content...</p>
      </div>
    </div>
  );
};

export default ScrollablePage;

