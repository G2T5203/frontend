
import React, { useState } from 'react';
import { TextField, Button, FormControlLabel, Switch, Popover, Typography, Box } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search'; // Import the Search icon
import './FlightSearchBar.css'; // Import the CSS file

const FlightSearchBar = () => {
  const [departureLocation, setDepartureLocation] = useState('');
  const [arrivalLocation, setArrivalLocation] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Define state for selected dates (you can customize this according to your date selection component)
  const [selectedDates, setSelectedDates] = useState(null);

  const handleDepartureChange = (event) => {
    setDepartureLocation(event.target.value);
  };

  const handleArrivalChange = (event) => {
    setArrivalLocation(event.target.value);
  };

  const handleToggleChange = () => {
    setIsRoundTrip((prevValue) => !prevValue);
  };

  const handleCalendarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCalendar = () => {
    setAnchorEl(null);
  };

  const openCalendar = Boolean(anchorEl);

  const handleSearch = () => {
    // You can access all the input parameters here and perform a search or any other action
    console.log('Departure Location:', departureLocation);
    console.log('Arrival Location:', arrivalLocation);
    console.log('Is Round Trip:', isRoundTrip);
    console.log('Selected Dates:', selectedDates);
    // You can perform your search or any other action here
  };

  return (
    <div className="flight-search-bar">
      <TextField
        className="text-field"
        label="Departure Location"
        variant="outlined"
        value={departureLocation}
        onChange={handleDepartureChange}
      />
      <TextField
        className="text-field"
        label="Arrival Location"
        variant="outlined"
        value={arrivalLocation}
        onChange={handleArrivalChange}
      />
      <FormControlLabel
        control={
          <Switch
            checked={isRoundTrip}
            onChange={handleToggleChange}
            color="primary"
          />
        }
        label={isRoundTrip ? 'Round Trip' : 'One Way'}
      />
      <Button
        className="toggle-button"
        variant="contained"
        color="primary"
        startIcon={<CalendarTodayIcon />}
        onClick={handleCalendarClick}
      >
        Select Dates
      </Button>
      {/* Add the Search button here */}
      <Button
        className="toggle-button"
        variant="contained"
        color="primary"
        startIcon={<SearchIcon />}
        onClick={handleSearch}
      >
        Search
      </Button>
      <Popover
        open={openCalendar}
        anchorEl={anchorEl}
        onClose={handleCloseCalendar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box p={2}>
          <Typography>Select departure and arrival dates here.</Typography>
          {/* You can add your date selection component here and update the selectedDates state */}
        </Box>
      </Popover>
    </div>
  );
};

export default FlightSearchBar;


