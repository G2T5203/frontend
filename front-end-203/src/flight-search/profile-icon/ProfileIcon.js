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
        <img src="https://t4.ftcdn.net/jpg/03/42/99/71/360_F_342997143_wz7x1yR7KWhmhSKF9OHwuQ2W4W7IUDvH.jpg" alt="Profile" onClick={handleProfileClick}/>
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

