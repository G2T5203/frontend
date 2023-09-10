import React, { useState } from 'react';
import { TextField, Button, FormControlLabel, Switch, Popover, Typography, Box } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';
import DatePicker from '@mui/lab/DatePicker'; // Import the DatePicker component
import './FlightSearchBar.css';

const FlightSearchBar = () => {
  const [departureLocation, setDepartureLocation] = useState('');
  const [arrivalLocation, setArrivalLocation] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [departureDate, setDepartureDate] = useState(null); // State for departure date
  const [returnDate, setReturnDate] = useState(null); // State for return date

  const handleDepartureChange = (event) => {
    setDepartureLocation(event.target.value);
  };

  const handleArrivalChange = (event) => {
    setArrivalLocation(event.target.value);
  };

  const handleToggleChange = () => {
    setIsRoundTrip((prevValue) => !prevValue);
    // Reset the return date when switching between round trip and one way
    setReturnDate(null);
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
    console.log('Departure Date:', departureDate);
    console.log('Return Date:', returnDate);
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
        sx={{fontFamily:'Merriweather Sans'}}
      />
      <TextField
        className="text-field"
        label="Arrival Location"
        variant="outlined"
        value={arrivalLocation}
        onChange={handleArrivalChange}
        sx={{fontFamily:'Merriweather Sans'}}
      />
      <FormControlLabel
        labelPlacement="bottom"
        
        control={
          <Switch
            checked={isRoundTrip}
            onChange={handleToggleChange}
            color="primary"
          />
        }
        label={isRoundTrip ? 'Two Way' : 'One Way'}
      />
      <Button sx={{textTransform:'none', fontFamily: 'Merriweather Sans'}}
        className="toggle-button"
        variant="contained"
        color="primary"
        startIcon={<CalendarTodayIcon />}
        onClick={handleCalendarClick}
      >
        Departure Date
      </Button>
      {isRoundTrip ? (
        <Button
          className="toggle-button"
          variant="contained"
          startIcon={<CalendarTodayIcon />}
          onClick={handleCalendarClick}
          sx={{textTransform:'none', fontFamily: 'Merriweather Sans'}}
        >
          Return Date
        </Button>
      ) : (
        <Button
          className="toggle-button"
          variant="contained"
          startIcon={<CalendarTodayIcon />}
          disabled // Disable the button for one-way trips
        >
          <Typography variant='h7' sx={{textTransform:'none', fontFamily: 'Merriweather Sans'}}>
            Return Date
          </Typography>
        </Button>
      )}
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
          <Typography>Select departure and return dates here.</Typography>
          <DatePicker
            label="Departure Date"
            value={departureDate}
            onChange={(date) => setDepartureDate(date)}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
          />
          {isRoundTrip && (
            <DatePicker
              label="Return Date"
              value={returnDate}
              onChange={(date) => setReturnDate(date)}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
          )}
        </Box>
      </Popover>
      <Button
        className="toggle-button"
        variant="contained"
        color="primary"
        startIcon={<SearchIcon />}
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default FlightSearchBar;




