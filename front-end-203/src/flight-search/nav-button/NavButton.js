// My Flights and My Bookings buttons on the navigation bar

import React, { useState } from 'react';
import './NavButton.css'; // Import your CSS file for styling

const NavButton = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    console.log("Clicked "+ text + "!")
  };

  return (
    <button
      className={`nav-button ${isHovered ? 'hovered' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </button>
  );
};

export default NavButton;

