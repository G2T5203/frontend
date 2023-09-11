// profile-icon component
import React, { useState } from 'react';
import './ProfileIcon.css'; // Import your CSS file for styling

const ProfileIcon = () => {
  // State to track the dropdown menu's open/closed state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle the dropdown menu's visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleClickSignOut = () => {
    console.log("Clicked sign out!")
  }
  const handleClickAccount = () => {
    console.log("Clicked my account!")
  }
  const handleProfileClick = () => {
    console.log("Clicked profile icon!")
  }

  return (
    <div className="profile-icon-container">
      <div className={`profile-icon ${isDropdownOpen ? 'open' : ''}`} onClick={toggleDropdown}>
        {/* Your profile icon image or avatar */}
        <img src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png" alt="Profile" onClick={handleProfileClick}/>
      </div>

      {/* Render the dropdown menu when it's open */}
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-button"onClick={handleClickAccount}>My Account</button>
          <button className="dropdown-button" onClick={handleClickSignOut}>Sign Out</button>
          
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;

