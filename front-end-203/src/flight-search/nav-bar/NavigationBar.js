import React, { useEffect } from "react";
import "./NavigationBar.css"; // Import your CSS file for styling
import NavButton from "../nav-button/NavButton"; // Import the Button component
import ProfileIcon from "../profile-icon/ProfileIcon"; // Import the ProfileIcon component
import LogoButton from "../logo-button/LogoButton";
import { isAuthenticated, getCurrentUser, } from "../../auth";
import axios from "axios";
import { Typography } from "@mui/material";

const NavigationBar = () => {
  
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  let loggedin = false;
  useEffect(() => {
    if (isAuthenticated()) {
      axios.get(apiUrl + "users/authTest").then((response) => {
        if (response.status === 200) {
          loggedin = true;
        } else {
          loggedin = false;
        }
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    loggedin ?
    <div className="navbar">
      {/* Left Logo (without hover effect) */}
      <LogoButton text={"WingIt"}></LogoButton>

      {/* Navigation Buttons with hover effect */}
      <NavButton text="Book Flights" />
      <NavButton text="My Bookings" />

      {/* Profile Icon */}
      <ProfileIcon />
    </div> :
    <div className="navbar"> 
    <LogoButton text={"WingIt"}></LogoButton>

    <Typography></Typography>
    </div>
  );
};

export default NavigationBar;
