import React from "react";
import "./NavigationBar.css"; // Import your CSS file for styling
import NavButton from "../nav-button/NavButton"; // Import the Button component
import ProfileIcon from "../profile-icon/ProfileIcon"; // Import the ProfileIcon component
import LogoButton from "../logo-button/LogoButton";

const NavigationBar = () => {
  return (
    <div className="navbar">
      {/* Left Logo (without hover effect) */}
      <LogoButton text={"WingIt"}></LogoButton>

      {/* Navigation Buttons with hover effect */}
      <NavButton text="Book Flights" />
      <NavButton text="My Bookings" />

      {/* Profile Icon */}
      <ProfileIcon />
    </div>
  );
};

export default NavigationBar;
